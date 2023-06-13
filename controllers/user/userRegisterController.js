const express = require("express");
const app = express();
const database = require("../../db");
const User = require("../../models/userModel");

app.post("/", async (req, res) => {

    const { username, passwd, email } = req.body;

    if (!username || !passwd || !email) {
        return res.status(400).json({
            message: "Bad request - username, passwd and email are required"
        });
    }

    try {

        database.sync();
        
        const findEmail = await User.findOne({
            where: {
                email: email
            }
        });

        if (findEmail) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }
        
        const createUser = await User.create({
            username: username,
            passwd: passwd,
            email: email
        });
        
        res.status(201).json({
            message: "User created",
            user: createUser
        });
        
    }

    catch (error) {

        return res.status(500).json({
            message: "Internal server error"
        });

    }

});

module.exports = app;