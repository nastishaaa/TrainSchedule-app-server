import { Router } from "express";

import { getTrainsController, getTrainByIdController, createTrainController } from '../controllers/trains.js';

const trainsRouter = Router();

trainsRouter.get('/', getTrainsController);
trainsRouter.get('/:id', getTrainByIdController);
trainsRouter.post('/', createTrainController);

export default trainsRouter;