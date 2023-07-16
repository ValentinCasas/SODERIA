'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Retroalimentacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Retroalimentacion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.STRING,
    fechaEnvio: DataTypes.DATE,
    aceptado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Retroalimentacion',
    tableName: 'Retroalimentacion',
    timestamps: false,
  });
  return Retroalimentacion;
};