import createHttpError from "http-errors";
import { dbPool } from "../db-init.js"

import { Train } from "../types/dbInterface.js";
import { QueryResult } from "pg";

interface CreateTrainDTO {
    number: string;
    name?: string;
    departure_station: string;
    arrival_station: string;
    departure_time: string;
    arrival_time: string;
    travel_duration?: string | null;
    seats_available?: number;
    price?: number | null;
}

export const getTrains = async (): Promise<{ count: number | null; trains: Train[] }> => {
    try {
        const data: QueryResult<Train> = await dbPool.query(`SELECT * FROM trains ORDER BY departure_time`);
        return {
            count: data.rowCount,
            trains: data.rows
        };
    } catch (error: unknown) {
        console.error(error);
        throw createHttpError(500, 'Something went wrong!');
    }
}

export const getTrainById = async (id: number) : Promise<Train> => {
    try {
        const data: QueryResult<Train> = await dbPool.query(`SELECT * FROM trains WHERE id = $1`, [id]);

        if (data.rows.length === 0) {
            throw createHttpError(404, `Train with id ${id} not found`);
        }
        return data.rows[0];
    } catch (error: unknown) {
        console.log();
        throw createHttpError(500, 'Something went wrong!');
    }
}

export const createTrain = async (payload: CreateTrainDTO) => {
    const {
        number,
        name,
        departure_station,
        arrival_station,
        departure_time,
        arrival_time,
        travel_duration,
        seats_available = 0,
        price
    } = payload;

    try {
        const res = await dbPool.query(
            `INSERT INTO trains 
            (number, name, departure_station, arrival_station, departure_time, arrival_time, travel_duration, seats_available, price)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *`,
            [number, name, departure_station, arrival_station, departure_time, arrival_time, travel_duration, seats_available, price]
        );

        return res.rows[0];
    } catch (error) {
        console.log(error);
        throw createHttpError(500, 'Something went wrong!');
    }
}

export const deleteTrain = async (id: number): Promise<void> => {
    const result = await dbPool.query(`DELETE FROM trains WHERE id=$1 RETURNING id`, [id]);
    if (result.rows.length === 0) throw createHttpError(404, `Train with id ${id} not found`);
}