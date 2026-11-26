import { Cliente } from "../models/Clientes";
import { Turno } from "../models/Turno";

const columnas = ["idCliente", "nombre", "apellido", "email", "telefono"];

export class ClientesRepository {
  async findAll() {
    return await Cliente.findAll({
      attributes: columnas,
      order: [
        ["apellido", "ASC"],
        ["nombre", "ASC"],
      ],
      raw: true,
    });
  }

  async findById(id: number) {
    return await Cliente.findByPk(id, { attributes: columnas, raw: true });
  }

  async findParaLogin(email: string) {
    const cliente = await Cliente.findOne({ where: { email }, raw: true });
    return cliente as any;
  }

  async crear(
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    hash: string,
  ) {
    await Cliente.create({
      nombre,
      apellido,
      email,
      telefono,
      contraseña: hash,
    });
  }

  async modificar(
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
  ) {
    await Cliente.update(
      { nombre, apellido, email, telefono },
      { where: { idCliente: id } },
    );
  }

  async tieneTurnos(id: number) {
    const cantidad = await Turno.count({ where: { idCliente: id } });
    return cantidad > 0;
  }

  async borrar(id: number) {
    await Cliente.destroy({ where: { idCliente: id } });
  }
}
