import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Curso } from "../../models/curso.model";

@Component({
  selector: "app-buscar-cursos-por-fecha",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Buscar Cursos por Fecha de Fin</h2>
    <form (ngSubmit)="buscarCursos()">
      <div>
        <label for="fechaFin">Fecha de Fin:</label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          [(ngModel)]="fechaFin"
          required
        />
      </div>
      <button type="submit">Buscar</button>
    </form>

    <div *ngIf="cursos.length > 0">
      <h3>Resultados de la Búsqueda</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tema</th>
            <th>Docente</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let curso of cursos">
            <td>{{ curso.id }}</td>
            <td>{{ curso.tema.nombre }}</td>
            <td>{{ curso.docente.nombre }}</td>
            <td>{{ curso.fechaInicio | date: "dd/MM/yyyy" }}</td>
            <td>{{ curso.fechaFin | date: "dd/MM/yyyy" }}</td>
            <td>{{ curso.precio | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p *ngIf="searched && cursos.length === 0">
      No se encontraron cursos para la fecha especificada.
    </p>
  `,
})
export class componenteBuscarCursoPorFecha {
  fechaFin: string = "";
  cursos: Curso[] = [];
  searched: boolean = false;

  constructor(private apiService: ApiService) {}

  buscarCursos() {
    this.apiService.buscarCursoPorFecha(this.fechaFin).subscribe(
      (cursos) => {
        this.cursos = cursos;
        this.searched = true;
      },
      (error) => {
        console.error("Error searching courses", error);
        this.cursos = [];
        this.searched = true;
      },
    );
  }
}
