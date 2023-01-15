const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '1998', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;