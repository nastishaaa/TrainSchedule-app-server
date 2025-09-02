import { Request, Response, NextFunction } from 'express'

import { getTrains, getTrainById, createTrain, deleteTrain } from '../services/trains.js';
import createHttpError from 'http-errors';
import { Train } from '../types/dbInterface.js';

export const getTrainsController = async (req: Request, res: Response) => {
    try {
        const result = await getTrains();
        res.status(200).json({
            status: 200,
            message: "Trains fetched successfully",
            data: result
        });
    } catch (error: unknown) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        });
    }
}

export const getTrainByIdController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            throw createHttpError(400, 'Invalid train id');
        }


        const train: Train = await getTrainById(id);
        

        res.status(200).json({
            status: 200,
            message: "Train fetched successfully",
            data: train
        });
    } catch (error: unknown) {
        res.status(404).json({
            status: 404,
            message: 'Something went wrong!',
        });
    }
}

export const createTrainController = async (req: Request, res: Response) => {
    try {
        const train = await createTrain(req.body);
        res.status(201).json({
            status: 201,
            message: "Train created successfully",
            data: train
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        });
    }
}

export const deleteTrainController = async (req: Request<{ id: string }>, res: Response) => {
    try {
        await deleteTrain(+req.params.id);
        res.status(204).send();
    } catch (err: any) {
        res.status(err.status || 500).json({ status: err.status || 500, message: err.message });
    }
}