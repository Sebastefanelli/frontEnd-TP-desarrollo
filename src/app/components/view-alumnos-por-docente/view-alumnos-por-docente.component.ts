import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Alumno } from "../../models/alumno.model";

@Component({
  selector: "app-ver-alumnos-por-docente",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Estudiantes por Legajo del Docente</h2>
    <form (ngSubmit)="cargarAlumnosPorDocente()">
      <label for="teacherLegajo">Legajo del Docente:</label>
      <input
        type="text"
        id="docenteLegajo"
        [(ngModel)]="docenteLegajo"
        name="docenteLegajo"
        required
      />
      <button type="submit">Ver Alumnos</button>
    </form>

    <table *ngIf="alumnos.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha de Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let alumno of alumnos">
          <td>{{ alumno.id }}</td>
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.fechaNacimiento | date: "dd/MM/yyyy" }}</td>
        </tr>
      </tbody>
    </table>

    <p *ngIf="alumnos.length === 0 && docenteLegajo">
      No se encontraron estudiantes para este docente.
    </p>
  `,
})
export class componenteVerAlumnosPorDocente implements OnInit {
  alumnos: Alumno[] = [];
  docenteLegajo: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // No es necesario cargar profesores aquí, ya que ahora usaremos el legajo
  }

  cargarAlumnosPorDocente() {
    if (this.docenteLegajo) {
      this.apiService.getAlumnosPorLegajoDocente(Number(this.docenteLegajo)).subscribe(
        (alumnos) => (this.alumnos = alumnos),
        (error) =>
          console.error("Error cargando alumnos por legajo del docente", error),
      );
    } else {
      this.alumnos = [];
    }
  }
}
