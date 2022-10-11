import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ApartmentEntity } from '../database/entities/apartment';
import { ParariusService } from '../pararius/pararius.service';

@Injectable()
export class ScraperService {
    constructor(
        private readonly parariusService: ParariusService,
        private readonly databaseService: DatabaseService
        ) {

    }

    BASE_URL = 'https://www.pararius.com';
    LIST_PATH = '/apartments/amsterdam';
    async scrapeAll() {
        let page = 1;
        let total = 0;
        let totalPage = 1;
        const apartments = [];
        for(let i = 0; i<totalPage; i++) {
            const result = await this.parariusService.scrapeList(this.BASE_URL + this.LIST_PATH + '/page-' + page);
            total = result.total;
            totalPage = result.total / 30;
            page++;
            apartments.push(...result.list)
        }
        for(const apartment of apartments) {
            const detail = await this.parariusService.scrapeDetail(this.BASE_URL + apartment.url);
            await this.databaseService.upsertApartment(detail);
        }
    }
}
