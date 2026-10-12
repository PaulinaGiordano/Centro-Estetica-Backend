import { Router } from 'express';
import { TratamientosRepository } from '../repositories/TratamientosRepository';

const router = Router();
const repo = new TratamientosRepository();

router.get('/', async (req, res) => {
  const tratamientos = await repo.findAll();
  res.json(tratamientos);
});

export default router;