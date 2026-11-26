import { Op } from "sequelize";
import sequelize from "../sequelize";
import { Turno } from "../models/Turno";
import { Cliente } from "../models/Clientes";
import { Profesional } from "../models/Profesional";
import { Tratamiento } from "../models/Tratamiento";

export class TurnosRepository {
  async findAll(estado?: string, fecha?: string) {
    const where: any = {};
    if (estado) {
      where.estado = estado;
    }
    if (fecha) {
      where.fecha = fecha;
    }

    return await Turno.findAll({
      where,
      attributes: [
        "idTurno",
        "fecha",
        "hora",
        "estado",
        "observaciones",
        [sequelize.col("Cliente.nombre"), "cliente"],
        [sequelize.col("Cliente.telefono"), "telefono"],
        [sequelize.col("Profesional.nombre"), "profesional"],
        [sequelize.col("Tratamiento.nombre"), "tratamiento"],
      ],
      include: [
        { model: Cliente, attributes: [], required: true },
        { model: Profesional, attributes: [], required: true },
        { model: Tratamiento, attributes: [], required: true },
      ],
      order: [
        ["fecha", "ASC"],
        ["hora", "ASC"],
      ],
      raw: true,
    });
  }

  async crear(
    fecha: string,
    hora: string,
    observaciones: string,
    idProfesional: number,
    idTratamiento: number,
    idCliente: number,
  ) {
    await Turno.create({
      estado: "Pendiente",
      fecha,
      hora,
      observaciones,
      idProfesional,
      idTratamiento,
      idCliente,
    });
  }

  async findHorasOcupadas(idProfesional: number, fecha: string) {
    const turnos = await Turno.findAll({
      attributes: ["hora"],
      where: { idProfesional, fecha, estado: { [Op.ne]: "Cancelado" } },
      raw: true,
    });
    return turnos as any[];
  }

  async borrar(id: number) {
    return await Turno.destroy({ where: { idTurno: id } });
  }

  async cambiarEstado(id: number, estado: string) {
    await Turno.update({ estado }, { where: { idTurno: id } });
  }

  async findByCliente(idCliente: number) {
    return await Turno.findAll({
      where: { idCliente },
      attributes: [
        "idTurno",
        "fecha",
        "hora",
        "estado",
        "observaciones",
        [sequelize.col("Profesional.nombre"), "profesional"],
        [sequelize.col("Profesional.apellido"), "profesionalApellido"],
        [sequelize.col("Tratamiento.nombre"), "tratamiento"],
      ],
      include: [
        { model: Profesional, attributes: [] },
        { model: Tratamiento, attributes: [] },
      ],
      order: [
        ["fecha", "DESC"],
        ["hora", "DESC"],
      ],
      raw: true,
    });
  }

  async findById(id: number) {
    const turno = await Turno.findByPk(id, { raw: true });
    return turno as any;
  }
}
