import { Router } from "express";

import { getTrainsController, getTrainByIdController, createTrainController } from '../controllers/trains.js';
import { deleteTrain } from "../services/auth.js";
import { authorization } from "../middlewares/authorization.js";

const trainsRouter = Router();

trainsRouter.get('/', getTrainsController);
trainsRouter.get('/:id', getTrainByIdController);
trainsRouter.post('/', createTrainController);

trainsRouter.use(authorization)

trainsRouter.post('/:id', deleteTrain)

export default trainsRouter;