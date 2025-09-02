import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
const app = express();
export default function SetupServer() {
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use('/', router);
    app.use(pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }));
    app.use('/', router);
    app.use(notFoundHandler);
    app.use(errorHandler);
    app.listen(PORT, () => console.log(`Serverr is running on PORT ${PORT}`));
}
