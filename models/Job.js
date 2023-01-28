const Sequelize = require('sequelize');
const db = require('../db/connection');

const Job = db.define('job', { //função do Sequelize que é usada para criar um modelo para uma tabela no banco de dados. job será o nome dele
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  salary: {
    type: Sequelize.STRING,
  },
  company: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  new_job: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Job;



