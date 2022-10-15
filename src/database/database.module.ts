import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntitiesModule } from './entities/entities.module';
import * as joi from 'joi';

@Module({
  providers: [DatabaseService],
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        DATABASE_TYPE: joi.string().valid('mysql', 'sqlite'),
        DATABASE_URL: joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        type: configService.get('DATABASE_TYPE'),
        database: configService.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoSave: true,
      }),
      inject: [ConfigService],
    }),
    EntitiesModule
  ],
  exports: [DatabaseService]
})
export class DatabaseModule { }
