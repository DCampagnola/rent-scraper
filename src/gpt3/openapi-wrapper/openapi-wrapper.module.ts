import {  ConfigurableModuleBuilder, DynamicModule, Inject, Module } from '@nestjs/common';
import {default as OpenAITs} from 'openai-api';
const OpenAI = require('openai-api') as typeof OpenAITs;

class OpenAiConfigOptions {
  apiKey: string;
}

export const OPEN_API_CONFIG_OPTIONS = OpenAiConfigOptions;

export class OpenAiService extends OpenAI {
    constructor(apiKey: string) {
        super(apiKey);
    }
}


export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<OpenAiConfigOptions>().build();


@Module({
  providers: [
    {
      provide: OpenAiService,
      useFactory: (options: OpenAiConfigOptions) => {
        return new OpenAiService(options.apiKey);
      },
      inject: [MODULE_OPTIONS_TOKEN],
    }
  ],
  exports: [OpenAiService]
})
export class OpenAiWrapperModule extends ConfigurableModuleClass {

}