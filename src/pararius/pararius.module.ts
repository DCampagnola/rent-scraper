import { Module } from '@nestjs/common';
import { ParariusService } from './pararius.service';

@Module({
  providers: [ParariusService]
})
export class ParariusModule {}
