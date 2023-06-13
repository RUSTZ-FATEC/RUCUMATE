const express = require("express");
const app = express();
const database = require("../../db");
const ClimateData = require("../../models/climateDataModel");

app.get("/id/user/:user_id", async (req, res) => {

    const user_id = req.params.user_id;

    try {

        if (!user_id) {
            res.status(400).json({
                message: "user_id is required"
            });
        } else {

            database.sync();

            const data = await ClimateData.findAll({
                where: {
                    user_id: user_id,
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