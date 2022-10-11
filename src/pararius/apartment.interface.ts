export interface Apartment {
    title: string;
    url: string;
    id: string;
    price: number;
    rooms: number;
    sqm: number;
    lat: number;
    lng: number;
    address: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    floor: number;
    hasBalcony: boolean;
    isInterior: boolean;
    description: string;
    phoneNumber: string;
    contactUrl: string;
}

export interface ListApartment extends Omit<Apartment, 'lat' | 'lng' | 'bedrooms' | 'bathrooms' | 'floor' | 'hasBalcony' | 'description' | 'phoneNumber' | 'contactUrl'> {
    isNew: boolean;
}