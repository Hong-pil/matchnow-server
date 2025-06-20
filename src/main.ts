import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import helmet from 'helmet';
import * as hpp from 'hpp';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 개발 환경에서만 Swagger 활성화
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(process.env.APP_NAME || 'Match Now API')
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('document', app, swaggerDocument, {
      jsonDocumentUrl: 'document/json',
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(compression());

  // 개발 환경이 아닐 때만 보안 미들웨어 적용
  if (process.env.NODE_ENV !== 'development') {
    app.use(hpp());
    app.use(helmet());
  }

  const port = process.env.PORT || 4011;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();