import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"; // Import Router
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Alumno } from "../../models/alumno.model";

@Component({
  selector: "app-ver-alumnos",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Lista de Estudiantes</h2>
    <input
      type="text"
      [(ngModel)]="searchTerm"
      (input)="filterAlumnos()"
      placeholder="Buscar por nombre"
    />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha de Nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let alumno of filteredAlumnos">
          <td>{{ alumno.id }}</td>
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.fechaNacimiento | date: "dd/MM/yyyy" }}</td>
          <td>
            <button
              *ngIf="alumno.id !== undefined"
              (click)="editAlumno(alumno.id!)"
            >
              Editar
            </button>
            <button
              *ngIf="alumno.id !== undefined"
              (click)="deleteAlumno(alumno.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class componenteVerAlumnos implements OnInit {
  alumnos: Alumno[] = [];
  filteredAlumnos: Alumno[] = []; // Para almacenar los estudiantes filtrados
  searchTerm: string = ""; // Almacena el término de búsqueda

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadAlumnos();
  }

  loadAlumnos() {
    this.apiService.getAlumnos().subscribe(
      (alumnos) => {
        this.alumnos = alumnos;
        this.filteredAlumnos = alumnos; 
      },
      (error) => console.error("Error cargando alumnos", error),
    );
  }

  filterAlumnos() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAlumnos = this.alumnos.filter((alumno) =>
      alumno.nombre?.toLowerCase().includes(term),
    );
  }

  editAlumno(id: number) {
    this.router.navigate(["/edit-alumno", id]); 
  }

  deleteAlumno(id?: number) {
    if (id === undefined) {
      console.error("Alumno ID es undefined");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este estudiante?")) {
      this.apiService.deleteAlumno(id).subscribe(
        () => this.loadAlumnos(),
        (error) => console.error("Error eleminando alumno", error),
      );
    }
  }
}
