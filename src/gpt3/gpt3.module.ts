import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Gpt3Service } from './gpt3.service';
import { OpenAiWrapperModule } from './openapi-wrapper/openapi-wrapper.module';
import * as joi from 'joi';

@Module({
  providers: [Gpt3Service],
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        OPENAI_API_KEY: joi.string().required(),
      })
    }),
    OpenAiWrapperModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.getOrThrow('OPENAI_API_KEY'),
      }),
      imports: [ConfigModule],
    })
  ]
})
export class Gpt3Module {}
