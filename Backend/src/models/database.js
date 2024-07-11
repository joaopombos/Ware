const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "warebd",
  username: "postgres",
  password: "Atuamaede5",
  port: 5432,
  dialect: "postgres",
});

module.exports = sequelize;
