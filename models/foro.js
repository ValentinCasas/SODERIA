'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, { foreignKey: 'idAdmin' })
    }
  }
  Foro.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pregunta: DataTypes.STRING,
    fecha: DataTypes.DATE,
    respuesta: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idAdmin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    aceptado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Foro',
    tableName: 'Foro',
    timestamps: false,
  });

  return Foro;
};