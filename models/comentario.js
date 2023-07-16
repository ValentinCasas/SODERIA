'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Publicacion, { foreignKey: 'idPublicacion' })
    }
  }
  Comentario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.STRING,
    fechaEnvio: DataTypes.DATE,
    idPublicacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comentario',
    tableName: 'Comentario',
    timestamps: false,
  });
  return Comentario;
};