import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { fastify, FastifyInstance } from 'fastify';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();