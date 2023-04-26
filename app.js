const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const authMiddleware = require("./middleware/authMiddleware");

// Logger

app.use(morgan("dev"));

// Middleware

app.use(authMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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