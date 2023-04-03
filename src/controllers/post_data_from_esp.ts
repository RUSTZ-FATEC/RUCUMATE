import express, { Request, Response } from 'express';
const Joi = require('joi');
const app = express();

app.post('', (req: Request, res: Response) => {

    const data = req.body.data;

    res.status(200);
    res.json({

        message: data
    });
});

module.exports = app;