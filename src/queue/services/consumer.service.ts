import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private consumers: Array<{ name: string; app: Consumer }> = [];

  async startConsumer(
    consumerName: string,
    queueUrl: string,
    handleMessage: (message: any) => Promise<any>,
  ) {
    const logger = new Logger(`Consumer-${consumerName}`);
    const consumerApp = Consumer.create({
      queueUrl,
      handleMessage: async message => {
        await handleMessage(message);
      },
    });

    consumerApp.on('error', err => {
      logger.error(err.message);
    });

    consumerApp.on('processing_error', err => {
      logger.error(err.message);
    });

    this.consumers.push({ name: consumerName, app: consumerApp });
    logger.log(`Consumer ready`);
    await consumerApp.start();
  }

  onApplicationShutdown() {
    this.consumers.forEach(consumer => {
      const logger = new Logger(`Consumer-${consumer.name}`);
      logger.log('Consumer stopped');
      consumer.app.stop();
    });
  }
}
