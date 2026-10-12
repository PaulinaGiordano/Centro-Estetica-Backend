import pool from '../db';

export class EspecialidadRepository {

  async findAll() {
    const [especialidades] = await pool.query('SELECT * FROM especialidad');
    return especialidades;
  }
}