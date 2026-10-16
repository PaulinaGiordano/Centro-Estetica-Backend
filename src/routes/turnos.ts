import { Router } from 'express';
import { TurnosRepository } from '../repositories/TurnosRepository';
import { ClientesRepository } from '../repositories/ClientesRepository';

const router = Router();
const repo = new TurnosRepository();
const repoCliente = new ClientesRepository();

router.get('/', async (req, res) => {
  const turnos = await repo.findAll();
  res.json(turnos);
});

router.delete('/:id', async (req, res) => {
  try {
    await repo.borrar(Number(req.params.id));
    res.json({ mensaje: 'Turno eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'No se pudo eliminar el turno' });
  }
});

router.put('/:id', async (req, res) => {
  const estado = req.body.estado;

  if (!estado) {
    return res.status(400).json({ mensaje: 'Falta el estado' });
  }

  await repo.cambiarEstado(Number(req.params.id), estado);
  res.json({ mensaje: 'Turno actualizado' });
});

router.post('/', async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const observaciones = req.body.observaciones || '';
    const idProfesional = req.body.idProfesional;
    const idTratamiento = req.body.idTratamiento;

    if (!nombre || !apellido || !email || !telefono || !fecha || !hora || !idProfesional || !idTratamiento) {
      return res.status(400).json({ mensaje: 'Faltan datos del turno' });
    }

    let cliente = await repoCliente.findByEmail(email);

    if (!cliente) {
      await repoCliente.crear(nombre, apellido, email, telefono);
      cliente = await repoCliente.findByEmail(email);
    }

    await repo.crear(fecha, hora, observaciones, idProfesional, idTratamiento, cliente.idCliente);

    res.status(201).json({ mensaje: 'Turno reservado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'No se pudo reservar el turno' });
  }
});

export default router;