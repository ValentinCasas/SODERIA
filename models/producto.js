'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precioCompra: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL,
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    imagenUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'Producto',
    timestamps: false,
  });
  return Producto;
};