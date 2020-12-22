import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsumersModule } from './consumers/consumers.module';
import { CONSUMER, CRON } from './global/constants/appTypes';

async function bootstrap() {
  console.log(`Starting cli`, new Date());

  const params: { method?: string; appType?: string } = {};

  process.argv.forEach(val => {
    if (val.indexOf('=') !== -1) {
      const [paramName, paramValue] = val.split('=');
      params[paramName] = paramValue;
    }
  });

  if ([CONSUMER, CRON].includes(params.appType) && !params.appType) {
    throw new InternalServerErrorException(`You must provide a valid app type`);
  }

  if (!params.method) {
    throw new InternalServerErrorException(`You must provide a method`);
  }

  switch (params.appType) {
    case CONSUMER: {
      process.env.TYPEORM_SYNC = null;
      const app = await NestFactory.create(AppModule);
      await app.init();

      try {
        const consumersModule = app.select(ConsumersModule);
        const consumer = consumersModule.get(params.method, { strict: true });
        await consumer.start();
      } catch (error) {
        throw new InternalServerErrorException(`Invald consumer method`);
      }
      break;
    }
    default: {
      const app = await NestFactory.create(AppModule);
      const configService: ConfigService = app.get(ConfigService);
      const port = configService.get('app.port', 3000);
      await app.listen(port);
    }
  }
}
bootstrap();
