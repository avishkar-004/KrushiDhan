const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
module.exports = corsOptions;
