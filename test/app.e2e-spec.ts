import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Gpt3Service } from '../src/gpt3/gpt3.service';
import { Apartment } from 'src/pararius/apartment.interface';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let gpt3: Gpt3Service;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    gpt3 = moduleFixture.get(Gpt3Service);
  });

  it('should generate an email for booking a viewing in amsterdam', async () => {
    const response = await gpt3.generateEmail(
      "I'm Davide Campagnola, we are a couple and we want to book a viewings for the house for rent in Amsterdam",
    );
    console.log(response);
  });

  it('should generate an email for a viewing given an apartment object', async () => {
    const apartment: Apartment = {
      title: 'Apartment Weteringschans',
      url: 'https://www.pararius.com/apartment-for-rent/amsterdam/2e41a9fd/weteringschans',
      id: '2e41a9fd',
      price: 2200,
      rooms: 3,
      sqm: 70,
      address: '1017 RW Amsterdam (De Weteringschans)',
      city: 'amsterdam',
      bedrooms: 1,
      bathrooms: 1,
      contactUrl: '',
      hasBalcony: true,
      description: '',
      floor: 1,
      lat: 52.36183,
      lng: 4.88552,
      phoneNumber: null,
      isInterior: false,
      viewingUrl:
        'https://www.pararius.com/contact/01d4bf8b/abcoude/great-expatation/plan-a-viewing',
    };
    const response = await gpt3.generateEmailForApartmentViewings(apartment);
    console.log(response);
  });
});
