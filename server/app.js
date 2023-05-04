const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");

// Middleware

app.use(morgan('dev'));

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(authMiddleware);

// Routers

app.use("/user", require("./routes/userRoutes"));
app.use("/notification", require("./routes/notificationRoutes"));
app.use("/esp", require("./routes/espRouters"));
app.use("/valve", require("./routes/valveRoutes"));

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

module.exports = app;