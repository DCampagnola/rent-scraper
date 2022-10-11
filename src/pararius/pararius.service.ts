import { Injectable } from '@nestjs/common';
import { InjectBrowser } from 'nest-puppeteer';
import { Browser } from 'puppeteer';
import { Apartment, ListApartment } from './apartment.interface';



@Injectable()
export class ParariusService {
    constructor(
        @InjectBrowser() private readonly browser: Browser,
    ) {}


    async scrapeList(url: string): Promise<{list: ListApartment[], page: number, total: number}> {
        const page = await this.browser.newPage();
        await page.goto(url);
        console.info("Page loaded");
        const searchResultDiv = await page.waitForSelector('ul.search-list');
        console.log("Search result div loaded");
        const paginationDiv = await page.waitForSelector('div.pagination__summary');
        console.log("Pagination div loaded");
        const paginationText = await paginationDiv.evaluate((div) => div.textContent);
        const paginationMatch = paginationText.match(/(\d+) - (\d+) of (\d+) results/);
        if(!paginationMatch) {
            throw new Error("Could not parse pagination text");
        }
        const [_, from, to, total] = paginationMatch;
        const pageNumber = (parseInt(from) - 1) / 30;
        const results = await page.$$eval('ul.search-list li.search-list__item', (list) =>
            list.map((item) => {
                const title = item.querySelector('h2.listing-search-item__title')?.textContent.trim();
                if(!title) return null;
                const url = item.querySelector('h2.listing-search-item__title a')?.getAttribute('href');
                const matchedSubPath = url?.match(/\/apartment-for-rent\/(\w+)\/(\w+)\/\w+/) || null;
                const id = matchedSubPath ? matchedSubPath[2] : null;
                const city = matchedSubPath ? matchedSubPath[1] : null;
                const priceText = item.querySelector('.listing-search-item__price')?.textContent;
                const price = priceText ? parseInt(priceText.replace(/\D/g, '')) : null;
                const roomsText = item.querySelector('.illustrated-features__item--number-of-rooms')?.textContent;
                const rooms = roomsText ? parseInt(roomsText.replace(/\D/g, '')) : null;
                const sqmText = item.querySelector('.illustrated-features__item--surface-area')?.textContent;
                const sqm = sqmText ? parseInt(sqmText.replace(/\D/g, '')) : null;
                const addressText = item.querySelector('.listing-search-item__sub-title')?.textContent.trim();
                const address = addressText ? addressText : null;
                const isNew = item.querySelector('.listing-label--new') ? true : false;
                const isInteriorText = item.querySelector('.illustrated-features__item--interior')?.textContent;
                const isInterior = isInteriorText ? isInteriorText.trim() === 'Furnished' : false;
                return {
                    title,
                    url,
                    id,
                    price,
                    rooms,
                    sqm,
                    address,
                    city,
                    isNew,
                    isInterior
                }
            })
        );
        return {
            list: results.filter((a) => a),
            page: pageNumber,
            total: parseInt(total)
        };
    }

    async scrapeDetail(url: string): Promise<Apartment> {
        const page = await this.browser.newPage();
        await page.goto(url);
        console.info("Page loaded");
        const id = url.match(/\/apartment-for-rent\/(\w+)\/(\w+)\/\w+/)?.[2];
        const result: Omit<Apartment, 'url' | 'id'> = await page.$eval('.page__main', (div) => {
            const title = div.querySelector('h1.listing-detail-summary__title')?.textContent.trim();
            const address = div.querySelector('div.listing-detail-summary__location')?.textContent.trim();
            const priceText = div.querySelector('div.listing-detail-summary__price')?.textContent;
            const price = priceText ? parseInt(priceText.replace(/\D/g, '')) : null;
            const sqmText = div.querySelector('li.illustrated-features__item--surface-area')?.textContent;
            const sqm = sqmText ? parseInt(sqmText.replace(/\D/g, '')) : null;
            const roomsText = div.querySelector('dd.listing-features__description--number_of_rooms')?.textContent;
            const rooms = roomsText ? parseInt(roomsText.replace(/\D/g, '')) : null;
            const bedroomsText = div.querySelector('dd.listing-features__description--number_of_bedrooms')?.textContent;
            const bedrooms = bedroomsText ? parseInt(bedroomsText.replace(/\D/g, '')) : null;
            const bathroomsText = div.querySelector('dd.listing-features__description--number_of_bathrooms')?.textContent;
            const bathrooms = bathroomsText ? parseInt(bathroomsText.replace(/\D/g, '')) : null;
            const floorText = div.querySelector('dd.listing-features__description--number_of_floors')?.textContent;
            const floor = floorText ? parseInt(floorText.replace(/\D/g, '')) : null;
            const hasBalconyText = div.querySelector('dd.listing-features__description--balcony')?.textContent;
            const hasBalcony = hasBalconyText ? hasBalconyText.trim() === 'Present' : false;
            const city = title?.match(/in (\w+)/)?.[1];
            const isInteriorText = div.querySelector('dd.listing-features__description--interior')?.textContent;
            const isInterior = isInteriorText ? isInteriorText.trim() === 'Furnished' : false;
            const map = div.querySelector('div.detail-map');
            const latText = map?.getAttribute('data-detail-map-latitude');
            const lngText = map?.getAttribute('data-detail-map-longitude');
            const lat = latText ? parseFloat(latText) : null;
            const lng = lngText ? parseFloat(lngText) : null;
            const descriptionText = div.querySelector('div.listing-detail-description__additional')?.textContent;
            const description = descriptionText ? descriptionText.trim() : null;
            const phoneNumberText = div.querySelector('.agent-summary__link--call-agent')?.textContent;
            const phoneNumber = phoneNumberText ? phoneNumberText.trim() : null;
            const contactUrl = div.querySelector('.agent-summary__agent-contact-request')?.getAttribute('href') || null;
            return {
                title,
                address,
                price,
                sqm,
                rooms,
                bedrooms,
                bathrooms,
                floor,
                hasBalcony,
                city,
                isInterior,
                lat,
                lng,
                description,
                phoneNumber, 
                contactUrl
            };
        });
        return {...result, id, url};
    }
}
