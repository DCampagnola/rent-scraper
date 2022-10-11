
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParariusService } from './pararius/pararius.service';
import * as fs from 'fs';
import { ScraperService } from './scraper/scraper.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(ScraperService);
    await service.scrapeAll()
}
bootstrap();
