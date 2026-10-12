import pool from '../db';
import { Tratamiento } from '../models/Tratamiento';

export class TratamientosRepository {

  async findAll() {
    const [tratamientos] = await pool.query(
        `SELECT t.*, e.nombre AS especialidad
        FROM tratamiento t, especialidad e
        WHERE t.idEspecialidad = e.idEspecialidad`
    );
    return tratamientos as Tratamiento[];
  }
}