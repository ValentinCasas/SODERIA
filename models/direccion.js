'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Zona, {through: models.ZonaDireccion, foreignKey: 'idDireccion'});
      this.hasMany(models.ZonaDireccion, {foreignKey: 'idDireccion'});
    }
  }
  Direccion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Direccion',
    tableName: 'Direccion',
    timestamps: false,
  });
  return Direccion;
};