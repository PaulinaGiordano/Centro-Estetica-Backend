import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

export const Horario = sequelize.define(
  "Horario",
  {
    idHorario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProfesional: { type: DataTypes.INTEGER, allowNull: false },
    dia_semana: {
      type: DataTypes.ENUM("Lunes", "Martes", "Miércoles", "Jueves", "Viernes"),
      allowNull: false,
    },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_fin: { type: DataTypes.TIME, allowNull: false },
  },
  {
    tableName: "horarios",
    timestamps: false,
  },
);
