const express = require("express");
const app = express();
const database = require("../../db");
const ClimateData = require("../../models/climateDataModel");

app.post("/", async (req, res, next) => {
    const {
        sensor_id,
        temperature,
        humidity,
        user_id,
    } = req.body;

    if (
        !sensor_id ||
        !temperature ||
        !humidity ||
        !user_id
    ) {
        return res.status(400).json({
            msg: "Bad Request: sensor_id, temperature, humidity, user_id are required!",
        });
    }

    try {

        ClimateData.sync();        
        
        const data = await ClimateData.create({
            sensor_id,
            temperature,
            humidity,
            user_id,
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = app;