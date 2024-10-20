import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Docente } from "../../models/docente.model";

@Component({
  selector: "app-ver-docentes",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Lista de Docentes</h2>
    <input
      type="text"
      [(ngModel)]="terminoBusqueda"
      (input)="filterDocentes()"
      placeholder="Buscar por nombre"
    />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Legajo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let docente of docentesFiltrados">
          <td>{{ docente.id }}</td>
          <td>{{ docente.nombre }}</td>
          <td>{{ docente.legajo }}</td>
          <td>
            <button (click)="editDocente(docente.id!)">Editar</button>
            <button
              *ngIf="docente.id !== undefined"
              (click)="deleteDocente(docente.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="editingDocente">
      <h3>Editar Docente</h3>
      <form (ngSubmit)="updateDocente()">
        <div>
          <label for="editNombre">Nombre:</label>
          <input
            [(ngModel)]="editingDocente.nombre"
            name="editNombre"
            id="editNombre"
            required
          />
        </div>
        <div>
          <label for="editLegajo">Legajo:</label>
          <input
            [(ngModel)]="editingDocente.legajo"
            name="editLegajo"
            id="editLegajo"
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" (click)="cancelEdit()">Cancelar</button>
      </form>
    </div>
  `,
})
export class componenteVerDocentes implements OnInit {
  docentes: Docente[] = [];
  docentesFiltrados: Docente[] = []; 
  terminoBusqueda: string = ""; 
  editingDocente: Docente | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadDocentes();
  }

  loadDocentes() {
    this.apiService.getDocentes().subscribe(
      (docentes) => {
        this.docentes = docentes;
        this.docentesFiltrados = docentes; 
      },
      (error: any) => console.error("Error loading teachers", error),
    );
  }

  filterDocentes() {
    const term = this.terminoBusqueda.toLowerCase();
    this.docentesFiltrados = this.docentes.filter((docente) =>
      docente.nombre?.toLowerCase().includes(term),
    );
  }

  editDocente(id: number) {
    this.router.navigate(["/edit-docente", id]); 
  }

  updateDocente() {
    if (this.editingDocente) {
      this.apiService.updateDocente(this.editingDocente).subscribe(
        () => {
          this.loadDocentes(); 
          this.cancelEdit(); 
        },
        (error: any) => console.error("Error updating teacher", error),
      );
    }
  }

  deleteDocente(id?: number) {
    if (id === undefined) {
      console.error("Teacher ID is undefined");
      return;
    }
    if (confirm("¿Estás seguro de que quieres eliminar este docente?")) {
      this.apiService.deleteDocente(id).subscribe(
        () => this.loadDocentes(),
        (error: any) => console.error("Error borrando docente", error),
      );
    }
  }

  cancelEdit() {
    this.editingDocente = null;
  }
}
