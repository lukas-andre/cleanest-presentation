import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { ConsumerService } from './services/consumer.service';
import { QueueService } from './services/queue.service';
import { TopicService } from './services/topic.service';

@Module({
  controllers: [QueueController],
  providers: [ConsumerService, TopicService, QueueService],
  exports: [ConsumerService, TopicService, QueueService],
})
export class QueueModule {}
