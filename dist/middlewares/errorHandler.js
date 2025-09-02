import createHttpError from "http-errors";
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    const error = err instanceof createHttpError.HttpError ? err : createHttpError(500, 'Something went wrong!');
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message,
    });
};
