import {Router} from 'express';
import { TurnosRepository } from '../repositories/TurnosRepository';

const router = Router ();
const repo = new TurnosRepository();

router.get ('/', async (req, res) => {
   const turnos = await repo.findAll();
        res.json(turnos);
});

router.post ('/', async (req, res) => {
    const fecha= req.body.fecha;
    const hora = req.body.hora;
    const observaciones = req.body.observaciones;
    const idProfesional = req.body.idProfesional;
    const idTratamiento = req.body.idTratamiento;
    const mailCliente = req.body.mailCliente;
    const nombreCliente = req.body.nombreCliente;
    const apellidoCliente = req.body.apellidoCliente;
    const telefonoCliente = req.body.telefonoCliente;

    if (!fecha || !hora || !idProfesional || !idTratamiento || !mailCliente || !nombreCliente) {
        return res.status (400).json ( { mensaje: 'Faltan datos obligatorios'});
    }
    await repo.crear(fecha, hora, observaciones || null, Number(idProfesional), Number(idTratamiento), mailCliente, nombreCliente, apellidoCliente ||'', telefonoCliente || '');
    res.status(201).json({ mensaje: 'Turno creado'});
}); 

export default router;