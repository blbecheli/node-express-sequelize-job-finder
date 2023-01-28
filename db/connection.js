const Sequelize = require('sequelize');

const sequelize = new Sequelize({ //a conexão com o banco se dá com a criação de uma nova instancia
  dialect: 'sqlite', //dialect é qual o tipo de banco criado
  storage: './db/app.db' //storage é onde o banco vai ser criado
});

module.exports = sequelize