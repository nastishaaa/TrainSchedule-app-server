import { Router } from "express";

import { getTrainsController, getTrainByIdController, createTrainController, deleteTrainController } from '../controllers/trains.js';
import { authorization } from "../middlewares/authorization.js";

const trainsRouter = Router();

trainsRouter.get('/', getTrainsController);
trainsRouter.get('/:id', getTrainByIdController);
trainsRouter.post('/', createTrainController);

trainsRouter.use(authorization)

trainsRouter.post('/:id', deleteTrainController)

export default trainsRouter;