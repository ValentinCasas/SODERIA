'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Direccion, {through: models.ZonaDireccion, foreignKey: 'idZona'});
      this.hasMany(models.ZonaDireccion, {foreignKey: 'idZona'});
    }
  }
  Zona.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Zona',
    tableName: 'Zona',
    timestamps: false,
  });
  return Zona;
};