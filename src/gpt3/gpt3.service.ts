import { Injectable } from '@nestjs/common';
import { Apartment } from 'src/pararius/apartment.interface';
import { OpenAiService } from './openapi-wrapper/openapi-wrapper.module';

@Injectable()
export class Gpt3Service {
  constructor(private readonly openAiService: OpenAiService) {}
  async generateEmail(request: string) {
    const maxChars = 256;
    const completion = await this.openAiService.complete({
      prompt: `==Request==\n${request}\n==End of Request==\nPlease generate an email for the request:\n`,
      engine: 'text-davinci-002',
      temperature: 0.7,
      maxTokens: maxChars / 4,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      bestOf: 1,
    });
    return completion.data.choices[0].text;
  }

  generateEmailForApartmentViewings(apartment: Apartment) {
    const request = `
    I'm Davide Campagnola and we are a couple that we are interested in renting the apartment ${apartment.title} (${apartment.url}).
    We want to book a viewing
    `;
    return this.generateEmail(request);
  }
}
