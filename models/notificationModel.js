require('dotenv').config();
const Sequelize = require('sequelize');
const database = require('../db');

const notification = database.define('notification', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    
    content: {
        type: Sequelize.STRING(255),
        allowNull: false,
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

notification.sync();

module.exports = notification;