import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
  imports: [
    PuppeteerModule.forRoot(
      { pipe: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
 // optional, can be useful for using Chrome and Firefox in the same project
    ),
  ],
  providers: [AppService],
})
export class AppModule {}
