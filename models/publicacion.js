'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, { foreignKey: 'idAdmin' })
      this.hasMany(models.Comentario, {foreignKey: 'idPublicacion'})
    }
  }
  Publicacion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.STRING,
    imagenUrl: DataTypes.STRING,
    idAdmin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publicacion',
    tableName: 'Publicacion',
    timestamps: false,
  });
  return Publicacion;
};