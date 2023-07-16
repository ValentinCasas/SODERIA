'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comercio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Usuario, {foreignKey: 'idComercio'})
    }
  }
  Comercio.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    latitud: DataTypes.STRING,
    longitud: DataTypes.STRING,
    imagenUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comercio',
    tableName: 'Comercio',
    timestamps: false,
  });
  return Comercio;
};