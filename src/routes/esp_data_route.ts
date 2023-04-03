import express from 'express';

const app = express();

const espPostDataController = require('../controllers/post_data_from_esp');

app.use('', espPostDataController);

module.exports = app;