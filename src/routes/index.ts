import { Router } from "express";

import authRouter from './auth.js';
import trainsRouter from "./trains.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/trains', trainsRouter);

export default router;