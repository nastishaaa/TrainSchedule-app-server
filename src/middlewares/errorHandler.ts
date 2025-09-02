import createHttpError from "http-errors";
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    const error = err instanceof createHttpError.HttpError ? err : createHttpError(500, 'Something went wrong!');

    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message,
    });
}
