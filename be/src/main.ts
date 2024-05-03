import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('swagger')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://accounts.google.com/o/oauth2/v2/auth',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'],
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
