/**
 * Import Sequelize.
 */
const {  DataTypes } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
const Sequelize = require("../database");
const Image = require('./image');
const Video = require('./video');

/**
 * Define a model that can be managed by Sequelize.
 */
const Url = Sequelize.define(
    "url",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
);

Url.hasMany(Image);
Url.hasMany(Video);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = Url;
