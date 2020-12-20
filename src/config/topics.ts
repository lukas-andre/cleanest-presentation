import { registerAs } from '@nestjs/config';

export default registerAs('topics', () => ({
  processOrder: process.env.PROCESS_ORDER_TOPIC,
}));
