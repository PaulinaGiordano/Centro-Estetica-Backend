import sequelize from "../sequelize";
import { Tratamiento } from "../models/Tratamiento";
import { Especialidad } from "../models/Especialidad";

export class TratamientosRepository {
  async findAll() {
    return await Tratamiento.findAll({
      include: [{ model: Especialidad, attributes: [] }],
      attributes: {
        include: [[sequelize.col("Especialidad.nombre"), "especialidad"]],
      },
      raw: true,
    });
  }

  async borrar(id: number) {
    return await Tratamiento.destroy({ where: { idTratamiento: id } });
  }

  async crear(
    nombre: string,
    descripcion: string,
    duracion: number,
    idEspecialidad: number,
  ) {
    await Tratamiento.create({ nombre, descripcion, duracion, idEspecialidad });
  }

  async findById(id: number) {
    return await Tratamiento.findByPk(id);
  }

  async modificar(
    id: number,
    nombre: string,
    descripcion: string,
    duracion: number,
    idEspecialidad: number,
  ) {
    await Tratamiento.update(
      { nombre, descripcion, duracion, idEspecialidad },
      { where: { idTratamiento: id } },
    );
  }
}
