import { Module } from '@nestjs/common';
import { ParariusService } from './pararius.service';

@Module({
  providers: [ParariusService],
  exports: [ParariusService]
})
export class ParariusModule {}
