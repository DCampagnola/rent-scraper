
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParariusService } from './pararius/pararius.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(ParariusService);
    let page = 1;
    let total = 0;
    let maxPage = 1;
    const apartments = [];
    for(let i = 0; i < maxPage; i++) {
        const result = await service.scrapeList('https://www.pararius.com/apartments/amsterdam/page-' + page);
        console.log(result);
        total = result.total;
        maxPage = Math.ceil(total / 30);
        page++;
        apartments.push(...result.list);
    }
    console.log(apartments);
    fs.writeFileSync('apartments.json', JSON.stringify(apartments));
}
bootstrap();
