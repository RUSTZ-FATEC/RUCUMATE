import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
const verificaToken = require('./middleware/verifyAuth');
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const morgan = require('morgan');
const espRoute = require('./routes/esp_data_route');
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(verificaToken);
app.use(morgan('dev'));

app.use('/esp', espRoute);

app.use((_: Request, res: Response, next: NextFunction) => {

    const error = new Error('Not Found!');
    res.status(404);
    next(error);

});

app.use((error: any, _: Request, res: Response, next: NextFunction) => {

    res.status(500);
    res.json({
        message: error.message
    });

})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
