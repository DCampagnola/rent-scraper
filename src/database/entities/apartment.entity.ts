import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, UpdateDateColumn, Index} from 'typeorm'

@Entity()
export class ApartmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    @Index({
        unique: true,
    })
    services_id: string;

    @Column({
        enum: ['pararius'],
        type: 'varchar',
        default: 'pararius'
    })
    @Index()
    service: 'pararius';

    @Column({
        default: 1
    })
    version: '1';

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

    @Column({
        nullable: true
    })
    bedrooms: number | null;

    @Column({
        nullable: true
    })
    bathrooms: number | null;

    @Column({
        nullable: true
    })
    floor: number;

    @Column()
    hasBalcony: boolean;

    @Column()
    isInterior: boolean;

    @Column()
    description: string;

    @Column({
        nullable: true
    })
    phoneNumber: string | null;

    @Column({
        nullable: true
    })
    contactUrl: string | null;

    @Column()
    firstSeen: Date;

    @Column({
        nullable: true
    })
    lastSeen: Date | null;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
