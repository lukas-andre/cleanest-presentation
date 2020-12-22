import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
  });

  const configService: ConfigService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle('NestJS With Beers')
    .setDescription('Example Backend for NestJS with beers !')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('app.port', 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
