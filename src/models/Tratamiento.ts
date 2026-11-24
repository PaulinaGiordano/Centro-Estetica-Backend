import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import { Especialidad } from "./Especialidad";

export const Tratamiento = sequelize.define(
  "Tratamiento",
  {
    idTratamiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.STRING(300), allowNull: false },
    duracion: { type: DataTypes.INTEGER, allowNull: false },
    idEspecialidad: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "tratamiento",
    timestamps: false,
  },
);

Tratamiento.belongsTo(Especialidad, { foreignKey: "idEspecialidad" });
