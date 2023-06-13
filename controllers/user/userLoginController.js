const express = require("express");
const app = express();
const database = require("../../db");
const User = require("../../models/userModel");

app.post("/", async (req, res) => {
    const { email, passwd } = req.body;

    if (!email || !passwd) {
        return res.status(400).json({
            msg: "Bad Request: email, password are required!",
        });
    }

    try {

        database.sync();
        
        const user = await User.findOne({
            where: {
                email: email,
                passwd: passwd
            }
        });
        
        if (!user) {
            
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        
        res.status(200).json({
            message: "Authentication successful",
            user: user
        });

    } catch (error) {
        res.status(500).json(error);
    }

});

module.exports = app;