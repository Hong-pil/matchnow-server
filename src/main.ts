import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import * as hpp from 'hpp';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  if (configService.get('appEnv') !== 'production') {
    const swaggerConfig = new DocumentBuilder().setTitle(configService.get('appName')!).build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('document', app, swaggerDocument, {
      jsonDocumentUrl: 'document/json',
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(compression());

  if (configService.get('appEnv') !== 'development') {
    app.use(hpp());
    app.use(helmet());
  }

  await app.listen(configService.get<number>('port') ?? 4011, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
