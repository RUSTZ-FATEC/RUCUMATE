const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(80),
        allowNull: false,
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

database.sync({ force: false });

module.exports = User;