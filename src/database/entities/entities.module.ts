import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ApartmentEntity } from './apartment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ApartmentEntity
        ])
],
    exports: [TypeOrmModule]
})
export class EntitiesModule {}
