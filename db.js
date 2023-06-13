require('dotenv').config();
const Sequelize = require('sequelize');
const sequelzie = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
);

module.exports = sequelzie;