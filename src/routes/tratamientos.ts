import { Router } from 'express';
import { TratamientosRepository } from '../repositories/TratamientosRepository';

const router = Router();
const repo = new TratamientosRepository();

router.get('/', async (req, res) => {
  const tratamientos = await repo.findAll();
  res.json(tratamientos);
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await repo.borrar(id);
    res.json({ mensaje: 'Tratamiento eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'No se pudo eliminar el tratamiento'});
  }
});

router.post('/', async (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const duracion = Number(req.body.duracion);
  const idEspecialidad = Number(req.body.idEspecialidad);

  if (!nombre || !descripcion || !duracion || !idEspecialidad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }
  await repo.crear(nombre, descripcion, duracion, idEspecialidad);
  res.status(201).json({ mensaje: 'Tratamiento creado' });
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const tratamiento = await repo.findById(id);
  if (!tratamiento) {
    return res.status(404).json({ mensaje: 'Tratamiento no encontrado' });    
  }
  res.json(tratamiento);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const duracion = Number(req.body.duracion);
  const idEspecialidad = Number(req.body.idEspecialidad);
  if (!nombre || !descripcion || !duracion || !idEspecialidad) {
    return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
  }
  await repo.modificar(id, nombre, descripcion, duracion, idEspecialidad);
  res.json({ mensaje: 'Tratamiento modificado' });
}); 

export default router;