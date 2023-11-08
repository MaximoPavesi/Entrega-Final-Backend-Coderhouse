export const errorMiddleware = (err, req, res, next) => {
    res.send({
        status: err.name,
        cause: err.cause,
        message: err.message,
    });
}