import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../services/api.service";
import type { Curso } from "../../models/curso.model";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-ver-cursos",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Cursos</h2>
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre de curso"
        [(ngModel)]="terminoBusqueda"
        (input)="filterCursos()"
      />
    </div>

    <table>
      <thead>
        <tr>
          <th>Tema</th>
          <th>Docente</th>
          <th>Alumno</th>
          <th>Fecha de inicio</th>
          <th>Fecha de fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let curso of cursosFiltrados">
          <td>{{ curso.tema.nombre }}</td>
          <td>{{ curso.docente.nombre }}</td>
          <td>
            <ul>
              <li *ngFor="let alumno of curso.alumnos">
                {{ alumno.nombre }}
              </li>
            </ul>
          </td>
          <td>{{ curso.fechaInicio | date: "dd/MM/yyyy" }}</td>
          <td>{{ curso.fechaFin | date: "dd/MM/yyyy" }}</td>
          <td>
            <button (click)="editCurso(curso.id)" style="color: white; background-color: green;">Editar</button>
            <button (click)="confirmDeleteCurso(curso.id)" style="color: white; background-color: red;">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class componenteVerCursos implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  terminoBusqueda: string = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadCursos();
  }

  loadCursos() {
    this.apiService.getCursos().subscribe(
      (cursos) => {
        this.cursos = cursos;
        this.cursosFiltrados = cursos;
      },
      (error) => console.error("Error fetching courses", error),
    );
  }

  filterCursos() {
    this.cursosFiltrados = this.cursos.filter(
      (curso) =>
        curso.tema?.nombre
          ?.toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) || false,
    );
  }

  editCurso(cursoId?: number) {
    console.log("Editing course with ID:", cursoId);
    if (cursoId != null) {
      this.router.navigate(["/add-curso", { id: cursoId }]);
    } else {
      console.error("curso ID es undefined");
    }
  }

  confirmDeleteCurso(courseId?: number) {
    if (
      courseId != null &&
      confirm("¿Estás seguro de que deseas eliminar este curso?")
    ) {
      this.deleteCurso(courseId);
    } else {
      console.error("Curso ID es undefined");
    }
  }

  deleteCurso(courseId: number) {
    this.apiService.deleteCurso(courseId).subscribe(
      (response) => {
        alert("Curso eliminado exitosamente.");
        this.loadCursos();
      },
      (error) => {
        alert("Error eliminando el curso.");
        console.error("Error deleting curso", error);
      },
    );
  }
}
