const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    passwd: {
        type: Sequelize.STRING(120),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true
    },
    token: {
        type: Sequelize.STRING(120),
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

User.sync();

module.exports = User;