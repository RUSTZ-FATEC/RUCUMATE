import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const secret = process.env.JWT_KEY

function verificaToken(req: Request, res: Response, next: NextFunction) {

    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {

                return res.status(401).json({ message: 'Token inválido' });
            } else {

                next();
            }
        });
    } else {

        return res.status(401).json({ message: 'Token não fornecido' });
    }
}

module.exports = verificaToken;