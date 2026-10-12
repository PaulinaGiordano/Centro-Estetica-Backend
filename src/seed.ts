import mysql from 'mysql2/promise';
import fs from 'fs';
import 'dotenv/config';

async function main() {
  const sql = fs.readFileSync('dump-lumina.sql', 'utf8');
  
  const conexion = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    multipleStatements: true
  });

  console.log('Conectado. Ejecutando el script...');
  await conexion.query(sql);
  console.log('Script ejecutado.');

  const [tablas] = await conexion.query('SHOW TABLES');
  console.log('Tablas:', tablas);

  await conexion.end();
}

main().catch((error) => {
  console.error('FALLO:', error.message);
  process.exit(1);
});