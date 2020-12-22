import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQS } from 'aws-sdk';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { ProcessOrderQueueName } from '../global/constants/topicsNames';
import { ConsumerService } from '../queue/services/consumer.service';
import { QueueService } from '../queue/services/queue.service';
import { TopicService } from '../queue/services/topic.service';

@Injectable()
export class ProcessOrderConsumer {
  name = ProcessOrderConsumer.name;
  topic = ProcessOrderQueueName;
  topicArn: string;
  queueUrl: string;
  logger = new Logger(`Consumer-${this.topic}`);

  constructor(
    private readonly configService: ConfigService,
    private readonly topicService: TopicService,
    private readonly queueService: QueueService,
    private readonly consumerService: ConsumerService,
    private readonly ordersService: OrdersService,
  ) {}

  async start() {
    if (!this.topicArn) {
      this.topicArn = await this.topicService.createTopic(this.topic);
    }

    if (!this.queueUrl) {
      this.queueUrl = await this.queueService.createQueue(
        this.topic,
        this.topicArn,
      );
    }

    await this.consumerService.startConsumer(
      this.topic,
      this.queueUrl,
      this.handleMessage.bind(this),
    );
  }

  async handleMessage(message: SQS.Message) {
    this.logger.log(ProcessOrderConsumer.name);
    const payload = JSON.parse(JSON.parse(message.Body).Message);
    this.logger.log(`OrderPayload:  ${JSON.stringify(payload)}`);
    const order: Order = payload;

    const exists = await this.ordersService.findAll({
      where: { beerId: order.beerId },
    });
    this.logger.log(`exists: ${JSON.stringify(exists)}`);

    if (exists.length > 0) {
      this.logger.log('order already exists');
      return false;
    }

    return await this.ordersService.create(order);
  }
}
