import pool from '../db';
import { Turno } from '../models/Turno';

export class TurnosRepository {

  async findAll() {
    const [turnos] = await pool.query(
      `SELECT t.idTurno, t.fecha, t.hora, t.estado, t.observaciones,
              c.nombre AS cliente, c.telefono,
              p.nombre AS profesional,
              tr.nombre AS tratamiento
       FROM turno t, cliente c, profesional p, tratamiento tr
       WHERE t.idCliente = c.idCliente
         AND t.idProfesional = p.idProfesional
         AND t.idTratamiento = tr.idTratamiento
       ORDER BY t.fecha, t.hora`
    );
    return turnos as Turno[];
  }

  async crear(fecha: string, hora: string, observaciones: string, idProfesional: number, idTratamiento: number, idCliente: number) {
    await pool.query(
      'INSERT INTO turno (estado, fecha, hora, observaciones, idProfesional, idTratamiento, idCliente) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['Pendiente', fecha, hora, observaciones, idProfesional, idTratamiento, idCliente]
    );
  }

    async findHorasOcupadas(idProfesional: number, fecha: string) {
    const [turnos] = await pool.query(
      'SELECT hora FROM turno WHERE idProfesional = ? AND fecha = ?',
      [idProfesional, fecha]
    );
    return turnos as any[];
  }
    async borrar(id: number) {
    const [resultado] = await pool.query(
      'DELETE FROM turno WHERE idTurno = ?',
      [id]
    );
    return resultado;
  }

  async cambiarEstado(id: number, estado: string) {
    await pool.query(
      'UPDATE turno SET estado = ? WHERE idTurno = ?',
      [estado, id]
    );
  }
}