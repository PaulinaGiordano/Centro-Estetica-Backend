import { Router } from 'express';
import { ProfesionalRepository } from '../repositories/ProfesionalRepository';

const router = Router();
const repo = new ProfesionalRepository();

router.get('/', async (req, res) => {
  const profesionales = await repo.findAll();
  res.json(profesionales);
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await repo.borrar(id);
    res.json({ mensaje: 'Profesional eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'No se pudo eliminar el profesional' });
  }
});

router.post('/', async (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const imagen = req.body.imagen;
  const idEspecialidad = req.body.idEspecialidad;

  if (!nombre || !apellido || !idEspecialidad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  await repo.crear(nombre, apellido, imagen || null, idEspecialidad);

  res.status(201).json({ mensaje: 'Profesional creado' });
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const profesional = await repo.findById(id);

  if (!profesional) {
    return res.status(404).json({ mensaje: 'Profesional no encontrado' });
  }

  res.json(profesional);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const imagen = req.body.imagen;
  const idEspecialidad = req.body.idEspecialidad;

  if (!nombre || !apellido || !idEspecialidad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }

  await repo.modificar(id, nombre, apellido, imagen || null, idEspecialidad);

  res.json({ mensaje: 'Profesional modificado' });
});

export default router;