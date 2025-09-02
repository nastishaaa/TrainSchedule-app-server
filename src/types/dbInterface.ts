export interface Train {
    id: number;
    number: string;
    name?: string;
    departure_station: string;
    arrival_station: string;
    departure_time: string;
    arrival_time: string;
    travel_duration?: string;
    seats_available: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface Session {
    id: number;
    user_id: number;
    access_token: string;
    refresh_token: string;
    created_at: Date;
    expires_at: Date;
}
