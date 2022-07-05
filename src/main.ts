import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { sequelize } from './config/sequelize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  sequelize;
  setupSwagger(app);
  await app.listen(3000);
}

bootstrap();
