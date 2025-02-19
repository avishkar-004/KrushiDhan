const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

const notFound = (req, res, next) => {
    const error = new Error('Not Found - ' + req.originalUrl);
    error.status = 404;
    next(error);
};

module.exports = { errorHandler, notFound };
