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

  async borrar (id:number) {
    const [resultado] = await pool.query(
      'DELETE FROM tratamiento WHERE idTratamiento =?'
      [id]
    );
    return resultado;
  }

  async crear(nombre: string, descripcion:string, duracion: number, idEspecialidad: number) {
    await pool.query(
      'INSERT INTO tratamiento (nombre, descripcion, duracion, idEspecialidad) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, duracion, idEspecialidad]
    );
  }

  async findById(id: number) {
    const [tratamientos] = await pool.query(
      'SELECT * FROM tratamiento WHERE idTratamiento = ?',
      [id]
    );
    const lista = tratamientos as Tratamiento [];
    return lista [0];
  }

  async modificar(id: number, nombre: string, descripcion: string, duracion: number, idEspecialidad: number) {
    await pool.query(
      'UPDATE tratamiento SET nombre = ?, descripcion = ?, duracion = ?, idEspecialidad = ? WHERE idTratamiento = ?',
      [nombre, descripcion, duracion, idEspecialidad, id]
    );
  }
}