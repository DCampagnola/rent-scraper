import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerModule } from 'nest-puppeteer';
import { ImmobiliareModule } from './immobiliare/immobiliare.module';
import { ParariusModule } from './pararius/pararius.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    PuppeteerModule.forRoot(
      { pipe: true, isGlobal: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
 // optional, can be useful for using Chrome and Firefox in the same project
    ),
    ImmobiliareModule,
    ParariusModule,
    DatabaseModule,
  ],
  providers: [AppService],
})
export class AppModule {}
