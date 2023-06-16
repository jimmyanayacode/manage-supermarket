import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      //Remove all things not included in the dto
      whitelist: true,
      //Return bad request when the object has properties not required
      forbidNonWhitelisted: true
    }),
  );
  await app.listen(3000);
}
bootstrap();
