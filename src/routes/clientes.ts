import { Router } from "express";
import bcrypt from "bcryptjs";
import { ClientesRepository } from "../repositories/ClientesRepository";
import { verificarToken, soloAdmin } from "../middlewares/auth";

const router = Router();
const repo = new ClientesRepository();

router.get("/", verificarToken, soloAdmin, async (req, res) => {
  const clientes = await repo.findAll();
  res.json(clientes);
});

router.get("/:id", verificarToken, soloAdmin, async (req, res) => {
  const cliente = await repo.findById(Number(req.params.id));
  if (!cliente) {
    return res.status(404).json({ mensaje: "Cliente no encontrado" });
  }
  res.json(cliente);
});

router.post("/", verificarToken, soloAdmin, async (req, res) => {
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
    await repo.crear(nombre, apellido, email, telefono, hash);
    res.status(201).json({ mensaje: "Cliente creado" });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ mensaje: "Ya existe un cliente con ese email o teléfono" });
    }
    res.status(500).json({ mensaje: "No se pudo crear el cliente" });
  }
});

router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, apellido, email, telefono } = req.body;

  if (!nombre || !apellido || !email || !telefono) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  try {
    await repo.modificar(id, nombre, apellido, email, telefono);
    res.json({ mensaje: "Cliente modificado" });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ mensaje: "Ya existe un cliente con ese email o teléfono" });
    }
    res.status(500).json({ mensaje: "No se pudo modificar el cliente" });
  }
});

router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  const id = Number(req.params.id);

  if (await repo.tieneTurnos(id)) {
    return res
      .status(409)
      .json({ mensaje: "No se puede borrar: el cliente tiene turnos" });
  }

  await repo.borrar(id);
  res.json({ mensaje: "Cliente eliminado" });
});

export default router;
