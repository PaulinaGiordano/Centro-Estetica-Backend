import { Router } from "express";
import { HorariosRepository } from "../repositories/HorariosRepository";
import { verificarToken, soloAdmin } from "../middlewares/auth";

const router = Router();
const repo = new HorariosRepository();

router.get("/profesional/:id", verificarToken, soloAdmin, async (req, res) => {
  const horarios = await repo.findByProfesional(Number(req.params.id));
  res.json(horarios);
});

router.get("/:id", verificarToken, soloAdmin, async (req, res) => {
  const horario = await repo.findById(Number(req.params.id));
  if (!horario) {
    return res.status(404).json({ mensaje: "Horario no encontrado" });
  }
  res.json(horario);
});

router.post("/", verificarToken, soloAdmin, async (req, res) => {
  const idProfesional = Number(req.body.idProfesional);
  const dia_semana = req.body.dia_semana;
  const hora_inicio = req.body.hora_inicio;
  const hora_fin = req.body.hora_fin;

  if (!idProfesional || !dia_semana || !hora_inicio || !hora_fin) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }
  if (hora_inicio >= hora_fin) {
    return res.status(400).json({
      mensaje: "La hora de inicio tiene que ser anterior a la de fin",
    });
  }

  await repo.crear(idProfesional, dia_semana, hora_inicio, hora_fin);
  res.status(201).json({ mensaje: "Horario creado" });
});

router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const dia_semana = req.body.dia_semana;
  const hora_inicio = req.body.hora_inicio;
  const hora_fin = req.body.hora_fin;

  if (!dia_semana || !hora_inicio || !hora_fin) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }
  if (hora_inicio >= hora_fin) {
    return res.status(400).json({
      mensaje: "La hora de inicio tiene que ser anterior a la de fin",
    });
  }

  await repo.modificar(id, dia_semana, hora_inicio, hora_fin);
  res.json({ mensaje: "Horario modificado" });
});

router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    await repo.borrar(Number(req.params.id));
    res.json({ mensaje: "Horario eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar el horario" });
  }
});

export default router;
