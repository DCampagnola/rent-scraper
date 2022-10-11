import { Module } from '@nestjs/common';
import { ImmobiliareService } from './immobiliare.service';

@Module({
  providers: [ImmobiliareService]
})
export class ImmobiliareModule {}
