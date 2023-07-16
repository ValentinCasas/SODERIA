'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ZonaDireccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Zona, {foreignKey: 'idZona'}); 
      this.belongsTo(models.Direccion, {foreignKey: 'idDireccion'}); 
    }
  }
  ZonaDireccion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idZona: DataTypes.INTEGER,
    idDireccion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ZonaDireccion',
    tableName: 'ZonaDireccion',
    timestamps: false,
  });
  return ZonaDireccion;
};