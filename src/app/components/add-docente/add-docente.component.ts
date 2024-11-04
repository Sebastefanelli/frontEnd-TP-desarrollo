import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Docente } from "../../models/docente.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-añadir-docente",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form #docenteForm="ngForm" (ngSubmit)="onSubmit()" novalidate>
      <div>
        <label for="nombre">Nombre:</label>
        <input [(ngModel)]="docente.nombre" name="nombre" required />
        <div *ngIf="docenteForm.submitted && !docente.nombre" class="error">
          El nombre es requerido.
        </div>
      </div>
      <div>
        <label for="legajo">Legajo:</label>
        <input [(ngModel)]="docente.legajo" name="legajo" type="number" min="0" required />
        <div *ngIf="docenteForm.submitted && (docente.legajo === undefined || docente.legajo < 0)" class="error">
          El legajo es requerido y no puede ser negativo.
        </div>
      </div>
      <button type="submit" [disabled]="docenteForm.invalid || docente.legajo === undefined || docente.legajo < 0">Guardar Cambios</button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `,
})
export class componenteAñadirDocente implements OnInit {
  docente: Docente = { id: 0, nombre: "", legajo: 0 }; // Default legajo to 0
  isEditMode = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.apiService.getDocentePorId(+id).subscribe(
        (docente) => {
          this.docente = docente;
        },
        (error) => console.error("Error fetching docente", error),
      );
    }
  }

  onSubmit() {
    if (this.docente.legajo !== undefined && this.docente.legajo < 0) {
      console.error("El legajo no puede ser negativo");
      return;
    }

    if (this.isEditMode) {
      this.apiService.updateDocente(this.docente).subscribe(
        () => {
          this.router.navigate(["/view-docentes"]);
        },
        (error) => console.error("Error actualizando docente", error),
      );
    } else {
      this.apiService.addDocente(this.docente).subscribe(
        () => {
          this.router.navigate(["/view-docentes"]);
        },
        (error) => console.error("Error agregando docente", error),
      );
    }
  }

  cancel() {
    this.router.navigate(["/view-docentes"]);
  }
}
