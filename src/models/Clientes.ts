import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

export const Cliente = sequelize.define(
  "Cliente",
  {
    idCliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING(100), allowNull: false },
    telefono: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  {
    tableName: "cliente",
    timestamps: false,
  },
);
