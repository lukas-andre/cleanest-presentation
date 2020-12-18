import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: 'us-east-1',
  accessKey: process.env.AWS_ACCESS_KEY,
  secretKey: process.env.AWS_ACCESS_SECRET,
}));
