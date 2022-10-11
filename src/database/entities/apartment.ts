import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export class ApartmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    services_id: string;

    @Column({
        enum: ['pararius'],
        type: 'enum',
    })
    service: 'pararius';

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    price: number;

    @Column()
    rooms: number;

    @Column()
    sqm: number;

    @Column()
    lat: number;

    @Column()
    lng: number;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    floor: number;

    @Column()
    hasBalcony: boolean;

    @Column()
    isInterior: boolean;

    @Column()
    description: string;

    @Column()
    phoneNumber: string;

    @Column()
    contactUrl: string;

    @Column()
    firstSeen: Date;

    @Column()
    lastSeen: Date;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
