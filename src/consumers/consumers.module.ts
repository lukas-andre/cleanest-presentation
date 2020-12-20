import { Module } from '@nestjs/common';
import { QueueModule } from 'src/queue/queue.module';
import ProcessOrderConsumer from './process-order.consumer';

@Module({
  imports: [QueueModule],
  providers: [ProcessOrderConsumer],
})
export class ConsumersModule {}
