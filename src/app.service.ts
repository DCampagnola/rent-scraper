import { Injectable } from '@nestjs/common';
import type { Browser } from 'puppeteer';
import { InjectBrowser } from 'nest-puppeteer';

@Injectable()
export class AppService {
  constructor(@InjectBrowser() private readonly browser: Browser) {}

  async scrape(searchUrl: string): Promise<any> {
    const page = await this.browser.newPage();
    await page.goto(searchUrl);
    console.info("Page loaded");
    await page.waitForSelector('ul[data-cy="result-list"]');
    console.info("Results loaded");
    // scroll to bottom of page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    const results = await page.$$eval('ul[data-cy="result-list"] li.in-realEstateResults__item', (list) => 
      list.map((item) => {
        // title is in class .in-card__title
        const title = item.querySelector('.in-card__title')?.textContent;
        if(!title) return null;
        const url = item.querySelector('.in-card__title').getAttribute('href');
        const id = url?.match(/https\:\/\/www\.immobiliare\.it\/annunci\/(\d+)\//)?.[1];
        const featuresDiv = item.querySelector('.in-realEstateListCard__features');

        const priceText = featuresDiv.querySelector('.in-realEstateListCard__features--main')?.textContent;
        const price = priceText ? parseInt(priceText.replace(/\D/g, '')) : null;
        const roomsText = featuresDiv.querySelector('*[aria-label="locali"]')?.textContent || featuresDiv.querySelector('*[aria-label="locale"]')?.textContent;
        const rooms = roomsText ? parseInt(roomsText.replace(/\D/g, '')) : null;
        const sqmText = featuresDiv.querySelector('*[aria-label="superficie"]')?.textContent;
        const sqm = sqmText ? parseInt(sqmText.replace(/\D/g, '')) : null;
        const floorText = featuresDiv.querySelector('*[aria-label="piano"]')?.textContent;
        const floor = floorText ? parseInt(floorText.replace(/\D/g, '')) : null;
        const bathroomsText = featuresDiv.querySelector('*[aria-label="bagno"]')?.textContent || featuresDiv.querySelector('*[aria-label="bagni"]')?.textContent;
        const bathrooms = bathroomsText ? parseInt(bathroomsText.replace(/\D/g, '')) : null;
        return {
          title,
          url,
          price,
          rooms,
          sqm,
          floor,
          bathrooms,
          id
        }
      })
    );
    console.info("Results scraped");
    const resultsWithoutDetail = results.filter((result) => result !== null);
    return resultsWithoutDetail;
  }

  async scrapeDetailPage(url: string): Promise<any> {
    const page = await this.browser.newPage();
    await page.goto(url);
    console.info("Page loaded");
    await page.waitForSelector('nd-map.nd-ratio');
    console.info("Detail loaded");
    const mapText = await page.$eval('nd-map.nd-ratio', (el) => el.innerHTML);
    // get coordinates from {"lat":42.742978000000001,"lng":12.601317999999999} in innerHtml
    const coordinates = mapText.match(/{"lat":(\d+\.\d+),"lng":(\d+\.\d+)}/);
    const lat = coordinates ? parseFloat(coordinates[1]) : null;
    const lng = coordinates ? parseFloat(coordinates[2]) : null;
    console.info("Detail scraped");
    return {
      coordinates: {
        lat,
        lng
      },
    };
  }
}
