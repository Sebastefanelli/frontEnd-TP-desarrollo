import { Alumno } from "./alumno.model"; 
import { Tema } from "./tema.model"; 
import { Docente } from "./docente.model"; 

export interface Curso {
  id?: number;
  alumnos: Alumno[];
  docente: Docente; 
  fechaFin: string; 
  fechaInicio: string; 
  precio: number;
  tema: Tema; 
}
