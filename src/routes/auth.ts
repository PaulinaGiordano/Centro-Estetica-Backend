import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminRepository } from "../repositories/AdminRepository";
import { ClientesRepository } from "../repositories/ClientesRepository";

const router = Router();
const repoAdmin = new AdminRepository();
const repoCliente = new ClientesRepository();

function crearToken(datos: object) {
  return jwt.sign(datos, process.env.JWT_SECRET as string, { expiresIn: "2h" });
}

router.post("/login", async (req, res) => {
  const { email, contra } = req.body;

  if (!email || !contra) {
    return res.status(400).json({ mensaje: "Faltan el email o la contraseña" });
  }

  const admin = await repoAdmin.findByEmail(email);
  if (admin && (await bcrypt.compare(contra, admin.contraseña))) {
    const token = crearToken({ idAdmin: admin.idAdmin, rol: "admin" });
    return res.json({
      token,
      usuario: { rol: "admin", nombre: admin.nombre },
    });
  }

  const cliente = await repoCliente.findParaLogin(email);
  if (cliente && (await bcrypt.compare(contra, cliente.contraseña))) {
    const token = crearToken({ idCliente: cliente.idCliente, rol: "cliente" });
    return res.json({
      token,
      usuario: {
        rol: "cliente",
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        telefono: cliente.telefono,
      },
    });
  }

  res.status(401).json({ mensaje: "Email o contraseña incorrectos" });
});

router.post("/registro", async (req, res) => {
  const { nombre, apellido, email, telefono, contra } = req.body;

  if (!nombre || !apellido || !email || !telefono || !contra) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }
  if (contra.length < 6) {
    return res
      .status(400)
      .json({ mensaje: "La contraseña tiene que tener al menos 6 caracteres" });
  }

  try {
    const hash = await bcrypt.hash(contra, 10);
    await repoCliente.crear(nombre, apellido, email, telefono, hash);
    res
      .status(201)
      .json({ mensaje: "Cuenta creada. Ya podés iniciar sesión." });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ mensaje: "Ya existe una cuenta con ese email o teléfono" });
    }
    res.status(500).json({ mensaje: "No se pudo crear la cuenta" });
  }
});

export default router;
