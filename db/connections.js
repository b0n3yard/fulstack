const { Sequelize } = require('sequelize');
require('dotenv').config()
const is_prod = process.env.PORT
const sequelize = is_prod ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USRNME,
    process.env.DB_PASS,{
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    });

module.exports = sequelize;