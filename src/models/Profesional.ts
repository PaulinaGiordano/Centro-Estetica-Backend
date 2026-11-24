import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import { Especialidad } from "./Especialidad";
import { Horario } from "./Horario";

export const Profesional = sequelize.define(
  "Profesional",
  {
    idProfesional: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellido: { type: DataTypes.STRING(100), allowNull: false },
    imagen: { type: DataTypes.STRING(300), allowNull: true },
    idEspecialidad: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "profesional",
    timestamps: false,
  },
);

Profesional.belongsTo(Especialidad, { foreignKey: "idEspecialidad" });
Profesional.hasMany(Horario, { foreignKey: "idProfesional" });
Horario.belongsTo(Profesional, { foreignKey: "idProfesional" });
