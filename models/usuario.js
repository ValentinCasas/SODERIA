'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Publicacion, { foreignKey: 'idAdmin' })
      this.belongsTo(models.Comercio, { foreignKey: 'idComercio' })
      this.hasMany(models.Foro, { foreignKey: 'idAdmin' })
    }
  }
  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCompleto: DataTypes.STRING,
    mail: DataTypes.STRING,
    clave: DataTypes.STRING,
    telefono: DataTypes.BIGINT,
    correoContacto: DataTypes.STRING,
    imagenUrl: DataTypes.STRING,
    fechaRegistro: DataTypes.DATE,
    rol: DataTypes.INTEGER,
    idComercio: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuario',
    timestamps: false,
  });
  return Usuario;
};