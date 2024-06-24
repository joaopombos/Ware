const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "ai2",
  username: "postgres",
  password: "dzG851VQu",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;
