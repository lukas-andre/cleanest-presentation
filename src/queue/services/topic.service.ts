import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class TopicService {
  private readonly logger = new Logger(['Queue', TopicService.name].join('-'));
  private sns: AWS.SNS;

  constructor(private readonly configService: ConfigService) {
    this.sns = new AWS.SNS(this.configService.get('aws').getSnsConfig());
  }

  async createTopic(topicName: string): Promise<string> {
    try {
      const createTopicData = await this.sns
        .createTopic({
          Name: topicName,
          Tags: [
            {
              Key: 'Name',
              Value: ['sns', topicName].join('-'),
            },
          ],
        })
        .promise();

      const topicArn = createTopicData.TopicArn;
      this.logger.log(`Topic ${topicName}: ${topicArn} created successfully`);
      return topicArn;
    } catch (error) {
      this.logger.error(`Fail to create topic ${topicName}`, error.toString());
    }
  }

  async publishMessageToTopic(message: string, topicArn: string) {
    const params = {
      Message: message,
      TopicArn: topicArn,
    };
    return await this.sns.publish(params).promise();
  }
}
