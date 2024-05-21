const express = require('express');
const app = express();
const sequelize = require('./models/database'); 
//Configurações
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());
//Rotas
const rotas = require('./src/routes/WareRoutes');
app.use(rotas);

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allows', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o modelo:', err);
  });

// Rotas
app.use(rotas);



// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor iniciado na porta " + PORT);
});

