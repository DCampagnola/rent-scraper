
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParariusService } from './pararius/pararius.service';
import * as fs from 'fs';
import { OpenAiService } from './gpt3/openapi-wrapper/openapi-wrapper.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const openAiService = app.get(OpenAiService);
  console.log("Sending completion");
  const completion = await openAiService.complete({
    prompt: 'Say an hello world',
    engine: 'davinci',
    
  });
  console.log(completion.data.choices[0].text)
}
bootstrap();
