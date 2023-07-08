'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PruebaModelo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PruebaModelo.init({
    primerAttr: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PruebaModelo',
  });
  return PruebaModelo;
};