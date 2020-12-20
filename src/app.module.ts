import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';
import { BeersModule } from './beers/beers.module';
import { QueueModule } from './queue/queue.module';
import { ConsumersModule } from './consumers/consumers.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'example-user-db',
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('userDb'));
        return configService.get('userDb');
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'example-order-db',
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('orderDb'));
        return configService.get('orderDb');
      },
      inject: [ConfigService],
    }),
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
