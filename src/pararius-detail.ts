
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParariusService } from './pararius/pararius.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(ParariusService);
    const result = await service.scrapeDetail('https://www.pararius.com/apartment-for-rent/amsterdam/37bc0ba1/hoofdweg');        console.log(result);
    console.log(result);
}
bootstrap();
