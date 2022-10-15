import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Gpt3Service } from '../src/gpt3/gpt3.service';
import { ParariusService } from '../src/pararius/pararius.service';
import { ConfigModule } from '@nestjs/config';

describe('Pararius (e2e)', () => {
  let app: INestApplication;
  let pararius: ParariusService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    pararius = moduleFixture.get(ParariusService);
  });

  it('should book a viewing for an apartment', async () => {
    const response = await pararius.requestViewing(
      'https://www.pararius.com/contact/01d4bf8b/abcoude/great-expatation/plan-a-viewing',
      'Example message',
      'Davide',
      'Campagnola',
      'example@mail.com',
      '123456789',
    );
    console.log(response);
  });
});
