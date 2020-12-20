import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class QueueService {
  private sqs: AWS.SQS;
  private sns: AWS.SNS;
  private readonly logger = new Logger(QueueService.name);

  constructor(private readonly configService: ConfigService) {
    this.sns = new AWS.SNS(this.configService.get('aws').getSnsConfig());
    this.sqs = new AWS.SQS(this.configService.get('aws').getSqsConfig());
  }

  getQueueFullname(queueName: string): string {
    return `${this.configService.get('queue.queuePrefix')}-${queueName}`;
  }

  async createQueue(queueName: string, topicArn: string) {
    try {
      const params: any = { QueueName: queueName };
      const createQueueData = await this.sqs.createQueue(params).promise();

      const queueUrl = createQueueData.QueueUrl;

      const sqs = await this.sqs
        .tagQueue({
          QueueUrl: queueUrl,
          Tags: {
            Name: `sqs-${queueName}`,
            Owner: this.configService.get('aws.tagOwner'),
          },
        })
        .promise();

      const getQueueAttributesData = await this.sqs
        .getQueueAttributes({
          QueueUrl: queueUrl,
          AttributeNames: ['QueueArn'],
        })
        .promise();

      const sns = await this.sns
        .subscribe({
          Protocol: 'sqs',
          TopicArn: topicArn,
          Endpoint: getQueueAttributesData.Attributes.QueueArn,
        })
        .promise();

      const attributes = {
        Version: '2008-10-17',
        Id: getQueueAttributesData.Attributes.QueueArn + '/SQSDefaultPolicy',
        Statement: [
          {
            Sid: 'Sid' + new Date().getTime(),
            Effect: 'Allow',
            Principal: {
              AWS: '*',
            },
            Action: 'SQS:SendMessage',
            Resource: getQueueAttributesData.Attributes.QueueArn,
            Condition: {
              ArnEquals: {
                'aws:SourceArn': topicArn,
              },
            },
          },
        ],
      };

      await this.sqs
        .setQueueAttributes({
          QueueUrl: queueUrl,
          Attributes: {
            Policy: JSON.stringify(attributes),
          },
        })
        .promise();

      this.logger.log(
        `Queue ${queueUrl} subscribed to topic ${topicArn} successfully`,
      );
      return queueUrl;
    } catch (error) {
      this.logger.error(
        `Error subscribing queue ${queueName} to topic ${topicArn}`,
        error.toString(),
      );
    }
  }

  async getQueueUrl(queueName: string) {
    const queueUrl = await this.sqs
      .getQueueUrl({ QueueName: this.getQueueFullname(queueName) })
      .promise();
    this.logger.log(`Queue ${queueName} url is: ${queueUrl}`);
  }

  async listQueues(): Promise<string[]> {
    const result = await this.sqs
      .listQueues({
        QueueNamePrefix: this.configService.get('queue.queuePrefix'),
      })
      .promise();

    return result.QueueUrls as string[];
  }

  async getQueueMessageQuantity(queueUrl: string) {
    const params = {
      QueueUrl: queueUrl,
      AttributeNames: [
        'ApproximateNumberOfMessages',
        'ApproximateNumberOfMessagesNotVisible',
        'ApproximateNumberOfMessagesDelayed',
      ],
    };
    const result = await this.sqs.getQueueAttributes(params).promise();
    const queueName = queueUrl.split('/').pop();
    return { [queueName]: { ...result.Attributes, QueueUrl: queueUrl } };
  }
}
