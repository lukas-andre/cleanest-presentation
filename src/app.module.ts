import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';
import { BeersModule } from './beers/beers.module';
import { QueueModule } from './queue/queue.module';
import { ConsumersModule } from './consumers/consumers.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    GlobalModule,
    UsersModule,
    AuthModule,
    BeersModule,
    QueueModule,
    ConsumersModule,
    BeersModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
