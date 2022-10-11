import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParariusModule } from '../pararius/pararius.module';
import { ScraperService } from './scraper.service';

@Module({
  providers: [ScraperService],
  exports: [ScraperService],
  imports: [DatabaseModule, ParariusModule]
})
export class ScraperModule {}
