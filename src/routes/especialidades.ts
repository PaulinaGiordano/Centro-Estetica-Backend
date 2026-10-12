import { Router } from 'express';
import { EspecialidadRepository } from '../repositories/EspecialidadesRepository';

const router = Router();
const repo = new EspecialidadRepository();

router.get('/', async (req, res) => {
  const especialidades = await repo.findAll();
  res.json(especialidades);
});

export default router;