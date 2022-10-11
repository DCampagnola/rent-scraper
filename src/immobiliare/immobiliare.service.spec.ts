import { Test, TestingModule } from '@nestjs/testing';
import { ImmobiliareService } from './immobiliare.service';

describe('ImmobiliareService', () => {
  let service: ImmobiliareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImmobiliareService],
    }).compile();

    service = module.get<ImmobiliareService>(ImmobiliareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
