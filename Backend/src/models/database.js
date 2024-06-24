const { Sequelize } = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize(
  'WareBD', // nome do banco de dados
  'postgres', // usuário do PostgreSQL
  'dzG851VQu', // senha do PostgreSQL
  {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    logging:  console.log// Desativar o logging por padrão, pode ser ativado para debug
  }
);

module.exports = sequelize;

  