import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

export const Especialidad = sequelize.define(
  "Especialidad",
  {
    idEspecialidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
  },
  {
    tableName: "especialidad",
    timestamps: false,
  },
);
