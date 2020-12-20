import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { QueueModule } from 'src/queue/queue.module';
import { ProcessOrderConsumer } from './process-order.consumer';

@Module({
  imports: [QueueModule, OrdersModule],
  providers: [ProcessOrderConsumer],
})
export class ConsumersModule {}
