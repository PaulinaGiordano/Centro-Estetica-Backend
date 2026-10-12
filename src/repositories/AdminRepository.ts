import pool from '../db';
import { Admin } from '../models/Admin';

export class AdminRepository {

  async findByEmail(email: string) {
    const [admins] = await pool.query(
      'SELECT * FROM admin WHERE email = ?', [email]
    );
    const lista = admins as Admin[];
    return lista[0];
  }
}