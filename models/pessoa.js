const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Pessoa = sequelize.define('Pessoa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  UF: {
    type: DataTypes.STRING,
    allowNull:false,
  },
});

module.exports = Pessoa;