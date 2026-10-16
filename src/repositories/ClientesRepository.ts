import pool from '../db';
import { Cliente } from '../models/Clientes';

export class ClientesRepository {

  async findByEmail(email: string) {
    const [clientes] = await pool.query(
      'SELECT idCliente, nombre, apellido, email, telefono FROM cliente WHERE email = ?',
      [email]
    );
    const lista = clientes as Cliente[];
    return lista[0];
  }

  async crear(nombre: string, apellido: string, email: string, telefono: string) {
    await pool.query(
      'INSERT INTO cliente (nombre, apellido, email, contraseña, telefono) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, email, 'sin-clave', telefono]
    );
  }
}