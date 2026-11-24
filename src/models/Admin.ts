import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

export const Admin = sequelize.define(
  "Admin",
  {
    idAdmin: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    tableName: "admin",
    timestamps: false,
  },
);
