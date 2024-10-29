import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Curso } from "../models/curso.model";
import { Alumno } from "../models/alumno.model";
import { Docente } from "../models/docente.model";
import { Tema } from "../models/tema.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:8082/api";

  constructor(private http: HttpClient) {}

  // Cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.apiUrl}/cursos`);
  }

  añadirCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.apiUrl}/cursos`, curso);
  }

  getCursoPorId(cursoId: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/cursos/${cursoId}`);
  }

  deleteCurso(cursoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cursos/${cursoId}`);
  }

  updateCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/cursos/${curso.id}`, curso);
  }
  // Estudiantes
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/alumnos`);
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.apiUrl}/alumnos`, alumno);
  }

  getAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/alumnos/${id}`);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/alumnos/${alumno.id}`, alumno);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/alumnos/${id}`);
  }

  // Docentes
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.apiUrl}/docentes`);
  }

  addDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${this.apiUrl}/docentes`, docente);
  }

  getDocentePorId(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.apiUrl}/docentes/${id}`);
  }

  updateDocente(docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(
      `${this.apiUrl}/docentes/${docente.id}`,
      docente,
    );
  }

  deleteDocente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/docentes/${id}`);
  }

  // Temas
  getTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.apiUrl}/temas`);
  }

  addTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${this.apiUrl}/temas`, tema);
  }

  getTemaPorId(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.apiUrl}/temas/${id}`);
  }

  updateTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.apiUrl}/temas/${tema.id}`, tema);
  }

  deleteTema(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/temas/${id}`);
  }

  // Búsqueda de cursos por fecha
  buscarCursoPorFecha(fechaFin: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(
      `${this.apiUrl}/cursos/fecha-fin?fecha=${fechaFin}`,
    );
  }

  // Método para obtener estudiantes por legajo de docente
  getAlumnosPorLegajoDocente(legajo: string): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(
      `${this.apiUrl}/cursos/docente/legajo/${legajo}/alumnos`,
    );
  }

  getAlumnosPorDocente(docenteId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(
      `${this.apiUrl}/cursos/docente/${docenteId}/alumnos`,
    );
  }
}
