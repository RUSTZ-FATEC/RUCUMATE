const express = require("express");
const app = express();
const database = require("../../db");
const ClimateData = require("../../models/climateDataModel");

app.get("/id/sensor/:sensor_id", async (req, res) => {

    const sensor_id = req.params.sensor_id;

    try {

        if (!sensor_id) {

            res.status(400).json({
                message: "sensor_id is required"
            });

        } else {

            const data = await ClimateData.findAll({
                where: {
                    sensor_id: sensor_id,
                },
            });

            if (data.length === 0 || data === "undefined") {
                res.status(404).json({ message: "No data found" });
            } else {
                res.status(200).json(data);
            }
        }

    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = app;