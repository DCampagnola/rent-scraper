import { Injectable } from '@nestjs/common';
import { ApartmentEntity } from './entities/apartment';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Apartment } from 'src/pararius/apartment.interface';

@Injectable()
export class DatabaseService {

    constructor(
        @InjectRepository(ApartmentEntity) private readonly apartmentEntityRepository: Repository<ApartmentEntity>,
    ) {}

    async addApartment(apartment: Apartment): Promise<ApartmentEntity> {
        const apartmentEntity = new ApartmentEntity();
        return this.updateApartment(apartmentEntity, apartment);
    }

    async updateApartment(apartmentEntity: ApartmentEntity, apartment: Apartment): Promise<ApartmentEntity> {
        apartmentEntity.service = 'pararius';
        apartmentEntity.title = apartment.title;
        apartmentEntity.url = apartment.url;
        apartmentEntity.price = apartment.price;
        apartmentEntity.rooms = apartment.rooms;
        apartmentEntity.sqm = apartment.sqm;
        apartmentEntity.lat = apartment.lat;
        apartmentEntity.lng = apartment.lng;
        apartmentEntity.address = apartment.address;
        apartmentEntity.city = apartment.city;
        apartmentEntity.bedrooms = apartment.bedrooms;
        apartmentEntity.bathrooms = apartment.bathrooms;
        apartmentEntity.floor = apartment.floor;
        apartmentEntity.hasBalcony = apartment.hasBalcony;
        apartmentEntity.isInterior = apartment.isInterior;
        apartmentEntity.description = apartment.description;
        apartmentEntity.phoneNumber = apartment.phoneNumber;
        apartmentEntity.contactUrl = apartment.contactUrl;
        const inserted = await this.apartmentEntityRepository.save(apartmentEntity, {reload: true});
        return inserted;
    }

    async upsertApartment(apartment: Apartment): Promise<ApartmentEntity> {
        const apartmentEntity = await this.apartmentEntityRepository.findOneBy({
            services_id: apartment.id
        });
        if(apartmentEntity) {
            return this.updateApartment(apartmentEntity, apartment);
        } else {
            return this.addApartment(apartment);
        }
    }
}
