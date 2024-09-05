import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      forbidUnknownValues: false,
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('@osrs-market/api')
    .addServer(
      (() => {
        switch (process?.env?.NODE_ENV) {
          case 'production':
            return 'https://api.osrs-market.com/';
          default:
            return `http://localhost:${5000}`;
        }
      })(),
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
    extraModels: [],
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
}
bootstrap();
