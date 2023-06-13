require('dotenv').config();
const Sequelize = require('sequelize');
const database = require('../db');

const ClimateData = database.define('climate_data', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    sensor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    
    sensor_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    
    temperature: {
        type: Sequelize.FLOAT(5),
        allowNull: false,
    },
    humidity: {
        type: Sequelize.FLOAT(5),
        allowNull: false
    },
    
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
    },
});

database.sync({ force: false });

module.exports = ClimateData;