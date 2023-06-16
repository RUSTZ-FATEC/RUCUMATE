const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const espRoutes = require("./routes/espRouters");
const valveRoutes = require("./routes/valveRoutes");
const app = express();

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

// Server Status

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running"
    });
});

// Routers

app.use("/user", userRoutes);
app.use("/esp", espRoutes);
app.use("/notification", notificationRoutes);

// app.use("/valve", valveRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next();
});

module.exports = app;