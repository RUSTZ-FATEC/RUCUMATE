const express = require("express");
const app = express();
const database = require("../../db");
const Notification = require("../../models/notificationModel");

app.post("/generate", async (req, res) => {
    const { user_id, content } = req.body;

    try {
        if (!user_id || !content) {
            res.status(400).json({
                message: "user_id and content are required"
            });
        } else {
            database.sync();

            const existingNotification = await Notification.findOne({
                where: { content: content }
            });

            if (existingNotification) {
                res.status(200).json({
                    message: "Notification already exists"
                });
            } else {
                const notification = await Notification.create({
                    user_id: user_id,
                    content: content
                });
                res.status(200).json({
                    notification
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});

module.exports = app;
