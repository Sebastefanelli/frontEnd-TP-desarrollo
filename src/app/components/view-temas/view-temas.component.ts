import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Tema } from "../../models/tema.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-ver-temas",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Lista de Temas</h2>
    <input
      type="text"
      [(ngModel)]="terminoBsqueda"
      (input)="filterTemas()"
      placeholder="Buscar por nombre"
    />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let tema of temasFiltrados">
          <td>{{ tema.id }}</td>
          <td>{{ tema.nombre }}</td>
          <td>{{ tema.descripcion }}</td>
          <td>
            <button (click)="editTema(tema)">Editar</button>
            <button
              *ngIf="tema.id !== undefined"
              (click)="deleteTema(tema.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
})
export class componenteVerTemas implements OnInit {
  temas: Tema[] = [];
  temasFiltrados: Tema[] = []; 
  terminoBsqueda: string = ""; 

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTemas();
  }

  loadTemas() {
    this.apiService.getTemas().subscribe(
      (temas) => {
        this.temas = temas;
        this.temasFiltrados = temas; 
      },
      (error) => console.error("Error loading topics", error),
    );
  }

  filterTemas() {
    const term = this.terminoBsqueda.toLowerCase();
    this.temasFiltrados = this.temas.filter((tema) =>
      tema.nombre?.toLowerCase().includes(term),
    );
  }

  editTema(tema: Tema) {
    this.router.navigate(["/edit-tema", tema.id]); 
  }

  deleteTema(id?: number) {
    if (id === undefined) {
      console.error("Tema ID es undefined");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este tema?")) {
      this.apiService.deleteTema(id).subscribe(
        () => this.loadTemas(),
        (error) => console.error("Error deleting topic", error),
      );
    }
  }
}
