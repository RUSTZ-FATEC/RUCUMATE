const express = require("express");
const app = express();
const database = require("../../db");
const ClimateData = require("../../models/climateDataModel");

app.get("/", async (req, res) => {

    try {
            
        const result = await ClimateData.findAll();
        
        if (result.length === 0 || result === "undefined") {

            res.status(404).json({ message: "No data found" });

        } else {
            
            res.status(200).json(result);

        }
    
    } catch (error) {
        res.status(500).json(error);
    }
    
});

module.exports = app;