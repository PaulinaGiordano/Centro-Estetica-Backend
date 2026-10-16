export interface Turno {
  idTurno: number;
  estado: string;
  fecha: string;
  hora: string;
  observaciones: string | null;
  idProfesional: number;
  idTratamiento: number;
  idCliente: number;
}