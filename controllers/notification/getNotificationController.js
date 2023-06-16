const express = require("express");
const app = express();
const database = require("../../db");
const Notification = require("../../models/notificationModel");

app.get("/", async (req, res) => {

    const { user_id } = req.body;
    
    try {

        if (!user_id) {
            res.status(400).json({
                message: "user_id is required"
            });
        } else {
        
            const notifications = await Notification.findAll({
                where: {
                    user_id: user_id
                }
            });
            res.status(200).json({
                notifications
            });
            
        }
        
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});

module.exports = app;