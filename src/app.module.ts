import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerModule } from 'nest-puppeteer';
import { ImmobiliareModule } from './immobiliare/immobiliare.module';
import { ParariusModule } from './pararius/pararius.module';
import { DatabaseModule } from './database/database.module';
import { ScraperModule } from './scraper/scraper.module';
import { ContactModule } from './contact/contact.module';
import { Gpt3Module } from './gpt3/gpt3.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PuppeteerModule.forRoot(
      { pipe: true, isGlobal: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
      // optional, can be useful for using Chrome and Firefox in the same project
    ),
    ImmobiliareModule,
    ParariusModule,
    DatabaseModule,
    ScraperModule,
    ContactModule,
    Gpt3Module,
  ],
  providers: [AppService],
})
export class AppModule {}
