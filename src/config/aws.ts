import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  tagOwner: 'exampleOwner',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  snsBaseTopic: process.env.AWS_TOPIC_BASE_NAME,
  region: process.env.AWS_REGION,
  sqsApiVersion: '2012-11-05',
  snsApiVersion: '2010-03-31',
  getSqsConfig() {
    return {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
      apiVersion: this.sqsApiVersion,
    };
  },

  getSnsConfig() {
    return {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
      apiVersion: this.snsApiVersion,
    };
  },
}));
