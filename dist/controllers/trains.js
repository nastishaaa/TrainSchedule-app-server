import { getTrains, getTrainById, createTrain } from '../services/trains.js';
import createHttpError from 'http-errors';
export const getTrainsController = async (req, res) => {
    try {
        const result = await getTrains();
        res.status(200).json({
            status: 200,
            message: "Trains fetched successfully",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        });
    }
};
export const getTrainByIdController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw createHttpError(400, 'Invalid train id');
        }
        const train = await getTrainById(id);
        res.status(200).json({
            status: 200,
            message: "Train fetched successfully",
            data: train
        });
    }
    catch (error) {
        res.status(404).json({
            status: 404,
            message: 'Something went wrong!',
        });
    }
};
export const createTrainController = async (req, res) => {
    try {
        const train = await createTrain(req.body);
        res.status(201).json({
            status: 201,
            message: "Train created successfully",
            data: train
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        });
    }
};
