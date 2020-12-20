import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class SNSClient {
  constructor(private readonly configService: ConfigService) {}

  getClient() {
    return new AWS.SNS(this.configService.get('aws').getSnsConfig());
  }

  async publishMessageToTopic(
    request: any,
    topic: string,
  ): Promise<PromiseResult<AWS.SNS.PublishResponse, AWS.AWSError>> {
    const params: AWS.SNS.PublishInput = {
      TopicArn: topic,
      Message: JSON.stringify(request),
    };

    return this.getClient()
      .publish(params)
      .promise();
  }
}
