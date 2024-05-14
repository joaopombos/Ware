var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'WareBD',
    'postgres',
    'dzG851VQu',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
    }
);


module.exports = sequelize;