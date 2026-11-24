import { Router } from "express";
import { AdminRepository } from "../repositories/AdminRepository";
import bcrypt from "bcryptjs";

const router = Router();
const repo = new AdminRepository();

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const contra = req.body.contra;

  if (!email || !contra) {
    return res.status(400).json({ mensaje: "Faltan el email o la contraseña" });
  }

  const admin = await repo.findByEmail(email);

  if (!admin) {
    return res.status(401).json({ mensaje: "Email o contraseña incorrectos" });
  }

  const coincide = await bcrypt.compare(contra, admin.contraseña);
  if (!coincide) {
    return res.status(401).json({ mensaje: "Email o contraseña incorrectos" });
  }

  res.json({ nombre: admin.nombre, email: admin.email });
});

export default router;
