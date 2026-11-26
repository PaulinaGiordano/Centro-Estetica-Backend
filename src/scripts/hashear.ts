import "dotenv/config";
import bcrypt from "bcryptjs";
import sequelize from "../sequelize";
import { Admin } from "../models/Admin";

async function main() {
  const emails = ["ana.torres@lumina.com", "diego.ramirez@lumina.com"];

  for (const email of emails) {
    const hash = await bcrypt.hash("123456", 10);
    await Admin.update({ contraseña: hash }, { where: { email } });
    console.log("Hasheada:", email);
  }

  await sequelize.close();
}

main();