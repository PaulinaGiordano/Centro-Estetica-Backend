import { Router } from 'express';
import { ProfesionalRepository } from '../repositories/ProfesionalRepository';
import { TurnosRepository } from '../repositories/TurnosRepository';

const router = Router();
const repo = new ProfesionalRepository();
const repoTurnos = new TurnosRepository();

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

router.get('/tratamiento/:id', async (req, res) => {
  const profesionales = await repo.findByTratamiento(Number(req.params.id));
  res.json(profesionales);
});

router.get('/:id/horarios/:fecha', async (req, res) => {
  const idProfesional = Number(req.params.id);
  const fecha = req.params.fecha;

  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const diaSemana = dias[new Date(fecha + 'T00:00:00').getDay()];

  const horarios = await repo.findHorarios(idProfesional, diaSemana);
  const ocupadas = await repoTurnos.findHorasOcupadas(idProfesional, fecha);

  const disponibles = [];

  for (const horario of horarios) {
    const inicio = Number(horario.hora_inicio.substring(0, 2));
    const fin = Number(horario.hora_fin.substring(0, 2));

    for (let hora = inicio; hora < fin; hora++) {
      const texto = String(hora).padStart(2, '0') + ':00';
      const tomada = ocupadas.some(t => t.hora.substring(0, 5) === texto);

      if (!tomada) {
        disponibles.push(texto);
      }
    }
  }

  res.json(disponibles);
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