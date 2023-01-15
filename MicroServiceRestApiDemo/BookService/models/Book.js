const { Sequelize } = require("sequelize");
const sequelize = require("../databaseConfig/db.config");

const Book = sequelize.define("books", {
    book_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    release_date: {
        type: Sequelize.DATEONLY,
    },
    subject: {
        type: Sequelize.INTEGER,
    }
});

sequelize.sync();

module.exports = Book;

