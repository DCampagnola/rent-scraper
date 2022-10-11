import { Test, TestingModule } from '@nestjs/testing';
import { ParariusService } from './pararius.service';

describe('ParariusService', () => {
  let service: ParariusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParariusService],
    }).compile();

    service = module.get<ParariusService>(ParariusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
