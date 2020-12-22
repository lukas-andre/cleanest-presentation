import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config';
import { SNSClient } from './clients/sns.client';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('auth.jwtSecretKey'),
        signOptions: {
          expiresIn: config.get('auth.jwtExpiration'),
        },
      }),
    }),
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
  ],
  providers: [SNSClient],
  exports: [ConfigModule, SNSClient],
})
export class GlobalModule {}
