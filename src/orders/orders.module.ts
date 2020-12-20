import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { GlobalModule } from 'src/global/global.module';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forFeature([Order], 'example-order-db'),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
