import { Especialidad } from "../models/Especialidad";

export class EspecialidadRepository {
  async findAll() {
    return await Especialidad.findAll();
  }
}
