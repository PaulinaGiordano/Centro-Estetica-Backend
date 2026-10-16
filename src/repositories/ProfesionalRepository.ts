import pool from '../db';
import { Profesional } from '../models/Profesional';

export class ProfesionalRepository {

  async findAll() {
    const [profesionales] = await pool.query(
      `SELECT p.*, e.nombre AS especialidad
       FROM profesional p
       JOIN especialidad e ON p.idEspecialidad = e.idEspecialidad`
    );
    return profesionales as Profesional[];
  }

  async borrar(id: number) {
    await pool.query('DELETE FROM horarios WHERE idProfesional = ?', [id]);
    await pool.query('DELETE FROM profesional WHERE idProfesional = ?', [id]);
  }

  async crear(nombre: string, apellido: string, imagen: string | null, idEspecialidad: number) {
    await pool.query(
      'INSERT INTO profesional (nombre, apellido, imagen, idEspecialidad) VALUES (?, ?, ?, ?)',
      [nombre, apellido, imagen, idEspecialidad]
    );
  }

  async findById(id: number) {
    const [profesionales] = await pool.query(
      'SELECT * FROM profesional WHERE idProfesional = ?', [id]
    );
    const lista = profesionales as Profesional[];
    return lista[0];
  }

  async modificar(id: number, nombre: string, apellido: string, imagen: string | null, idEspecialidad: number) {
    await pool.query(
      'UPDATE profesional SET nombre = ?, apellido = ?, imagen = ?, idEspecialidad = ? WHERE idProfesional = ?',
      [nombre, apellido, imagen, idEspecialidad, id]
    );
  }

  async findByTratamiento(idTratamiento: number) {
    const [profesionales] = await pool.query(
      `SELECT p.* FROM profesional p, tratamiento t
      WHERE p.idEspecialidad = t.idEspecialidad
      AND t.idTratamiento = ?`,
      [idTratamiento]
    );
    return profesionales as Profesional[];
  }
}


