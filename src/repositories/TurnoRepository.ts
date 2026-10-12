import pool from '../db';

export class TurnoRepository {

  async findAll() {
    const [turnos] = await pool.query(
      `SELECT t.*, p.nombre AS profesional, tr.nombre AS tratamiento, c.nombre AS cliente
       FROM turno t, profesional p, tratamiento tr, cliente c
       WHERE t.idProfesional = p.idProfesional
       AND t.idTratamiento = tr.idTratamiento
       AND t.idCliente = c.idCliente`
    );
    return turnos;
  }
}