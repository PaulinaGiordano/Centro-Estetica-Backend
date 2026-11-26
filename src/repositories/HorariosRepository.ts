import { Horario } from "../models/Horario";

export class HorariosRepository {
  async findByProfesional(idProfesional: number) {
    return await Horario.findAll({
      where: { idProfesional },
      order: [
        ["dia_semana", "ASC"],
        ["hora_inicio", "ASC"],
      ],
      raw: true,
    });
  }

  async findById(id: number) {
    return await Horario.findByPk(id);
  }

  async crear(
    idProfesional: number,
    dia_semana: string,
    hora_inicio: string,
    hora_fin: string,
  ) {
    await Horario.create({ idProfesional, dia_semana, hora_inicio, hora_fin });
  }

  async modificar(
    id: number,
    dia_semana: string,
    hora_inicio: string,
    hora_fin: string,
  ) {
    await Horario.update(
      { dia_semana, hora_inicio, hora_fin },
      { where: { idHorario: id } },
    );
  }

  async borrar(id: number) {
    await Horario.destroy({ where: { idHorario: id } });
  }
}
