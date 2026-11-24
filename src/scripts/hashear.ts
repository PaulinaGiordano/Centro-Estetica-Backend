import "dotenv/config";
import bcrypt from "bcryptjs";
import pool from "../db";

async function main() {
  const emails = ["ana.torres@lumina.com", "diego.ramirez@lumina.com"];

  for (const email of emails) {
    const hash = await bcrypt.hash("123456", 10);

    await pool.query("UPDATE admin SET contraseña = ? WHERE email = ?", [
      hash,
      email,
    ]);

    console.log("Hasheada:", email);
  }

  await pool.end();
}

main();
