import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import { Cliente } from "./Clientes";
import { Profesional } from "./Profesional";
import { Tratamiento } from "./Tratamiento";

export const Turno = sequelize.define(
  "Turno",
  {
    idTurno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    estado: { type: DataTypes.STRING(50), allowNull: false },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    hora: { type: DataTypes.TIME, allowNull: false },
    observaciones: { type: DataTypes.STRING(100), allowNull: true },
    idProfesional: { type: DataTypes.INTEGER, allowNull: false },
    idTratamiento: { type: DataTypes.INTEGER, allowNull: false },
    idCliente: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "turno",
    timestamps: false,
  },
);

Turno.belongsTo(Cliente, { foreignKey: "idCliente" });
Turno.belongsTo(Profesional, { foreignKey: "idProfesional" });
Turno.belongsTo(Tratamiento, { foreignKey: "idTratamiento" });
