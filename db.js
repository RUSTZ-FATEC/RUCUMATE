const Sequelize = require('sequelize');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env.dev'});
} else {
    require('dotenv').config({ path: '.env.prod'});
}

const sequelzie = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
);

module.exports = sequelzie;