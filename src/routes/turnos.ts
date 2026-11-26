import { Router } from "express";
import { TurnosRepository } from "../repositories/TurnosRepository";
import { verificarToken, soloAdmin, soloCliente } from "../middlewares/auth";

const router = Router();
const repo = new TurnosRepository();

router.get("/mios", verificarToken, soloCliente, async (req, res) => {
  const idCliente = (req as any).usuario.idCliente;
  const turnos = await repo.findByCliente(idCliente);
  res.json(turnos);
});

router.put(
  "/mios/:id/cancelar",
  verificarToken,
  soloCliente,
  async (req, res) => {
    const idCliente = (req as any).usuario.idCliente;
    const turno = await repo.findById(Number(req.params.id));

    if (!turno || turno.idCliente !== idCliente) {
      return res.status(404).json({ mensaje: "Turno no encontrado" });
    }
    if (turno.estado === "Cancelado") {
      return res.status(400).json({ mensaje: "El turno ya está cancelado" });
    }

    await repo.cambiarEstado(turno.idTurno, "Cancelado");
    res.json({ mensaje: "Turno cancelado" });
  },
);

router.get("/", verificarToken, soloAdmin, async (req, res) => {
  const estado = req.query.estado as string | undefined;
  const fecha = req.query.fecha as string | undefined;

  const turnos = await repo.findAll(estado, fecha);
  res.json(turnos);
});

router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  try {
    await repo.borrar(Number(req.params.id));
    res.json({ mensaje: "Turno eliminado" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar el turno" });
  }
});

router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
  const estado = req.body.estado;

  if (!estado) {
    return res.status(400).json({ mensaje: "Falta el estado" });
  }

  await repo.cambiarEstado(Number(req.params.id), estado);
  res.json({ mensaje: "Turno actualizado" });
});

router.post("/", verificarToken, soloCliente, async (req, res) => {
  try {
    const idCliente = (req as any).usuario.idCliente;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const observaciones = req.body.observaciones || "";
    const idProfesional = req.body.idProfesional;
    const idTratamiento = req.body.idTratamiento;

    if (!fecha || !hora || !idProfesional || !idTratamiento) {
      return res.status(400).json({ mensaje: "Faltan datos del turno" });
    }

    const momentoTurno = new Date(fecha + "T" + hora);
    if (momentoTurno < new Date()) {
      return res
        .status(400)
        .json({
          mensaje: "No se puede sacar un turno en una fecha u hora que ya pasó",
        });
    }

    const ocupadas = await repo.findHorasOcupadas(idProfesional, fecha);
    const tomada = ocupadas.some(
      (t) => t.hora.substring(0, 5) === hora.substring(0, 5),
    );
    if (tomada) {
      return res
        .status(409)
        .json({ mensaje: "Ese horario ya fue reservado. Elegí otro." });
    }

    await repo.crear(
      fecha,
      hora,
      observaciones,
      idProfesional,
      idTratamiento,
      idCliente,
    );

    res.status(201).json({ mensaje: "Turno reservado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "No se pudo reservar el turno" });
  }
});

export default router;
