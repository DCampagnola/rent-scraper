import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImmobiliareService } from './immobiliare/immobiliare.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(ImmobiliareService);
  let page = 1;
  let results = [];
  for(let i = 0; i < 10; i++) {
    const result = await service.scrape('https://immobiliare.it/affitto-case/milano/?pag=' + page);
    console.log(result);
    for(let j = 0; j < result.length; j++) {
      const detail = await service.scrapeDetailPage(result[j].url);
      results.push({
        ...result[i],
        ...detail
      })
    }
    page++;
  }
  console.log(results);
}
bootstrap();
