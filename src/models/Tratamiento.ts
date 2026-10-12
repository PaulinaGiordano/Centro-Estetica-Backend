export interface Tratamiento {
  idTratamiento: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  idEspecialidad: number | null;
}