import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // await app.init();

  const config = new DocumentBuilder()
    .setTitle('API - MKS')
    .setDescription('REST API para catálogo de filmes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  };

  SwaggerModule.setup('api', app, document, swaggerCustomOptions);

  await app.listen(3000);
}
bootstrap();
