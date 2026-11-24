import sequelize from "../sequelize";
import { Profesional } from "../models/Profesional";
import { Especialidad } from "../models/Especialidad";
import { Horario } from "../models/Horario";
import { Tratamiento } from "../models/Tratamiento";

export class ProfesionalRepository {
  async findAll() {
    return await Profesional.findAll({
      include: [{ model: Especialidad, attributes: [], required: true }],
      attributes: {
        include: [[sequelize.col("Especialidad.nombre"), "especialidad"]],
      },
      raw: true,
    });
  }

  async borrar(id: number) {
    await Horario.destroy({ where: { idProfesional: id } });
    await Profesional.destroy({ where: { idProfesional: id } });
  }

  async crear(
    nombre: string,
    apellido: string,
    imagen: string | null,
    idEspecialidad: number,
  ) {
    await Profesional.create({ nombre, apellido, imagen, idEspecialidad });
  }

  async findById(id: number) {
    return await Profesional.findByPk(id);
  }

  async modificar(
    id: number,
    nombre: string,
    apellido: string,
    imagen: string | null,
    idEspecialidad: number,
  ) {
    await Profesional.update(
      { nombre, apellido, imagen, idEspecialidad },
      { where: { idProfesional: id } },
    );
  }

  async findByTratamiento(idTratamiento: number) {
    const tratamiento = (await Tratamiento.findByPk(idTratamiento, {
      raw: true,
    })) as any;
    if (!tratamiento) {
      return [];
    }
    return await Profesional.findAll({
      where: { idEspecialidad: tratamiento.idEspecialidad },
    });
  }

  async findHorarios(idProfesional: number, diaSemana: string) {
    const horarios = await Horario.findAll({
      attributes: ["hora_inicio", "hora_fin"],
      where: { idProfesional, dia_semana: diaSemana },
      raw: true,
    });
    return horarios as any[];
  }
}
