import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Docente } from "../../models/docente.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-añadir-docente",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div>
        <label for="nombre">Nombre:</label>
        <input [(ngModel)]="docente.nombre" name="nombre" required />
      </div>
      <div>
        <label for="legajo">Legajo:</label>
        <input [(ngModel)]="docente.legajo" name="legajo" required />
      </div>
      <button type="submit">Guardar Cambios</button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `,
})
export class componenteAñadirDocente implements OnInit {
  docente: Docente = { id: 0, nombre: "", legajo: 0 }; 
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
        (error) => console.error("Error fetching teacher", error),
      );
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.apiService.updateDocente(this.docente).subscribe(
        () => {
          this.router.navigate(["/view-docentes"]); 
        },
        (error) => console.error("Error updating teacher", error),
      );
    } else {
      this.apiService.addDocente(this.docente).subscribe(
        () => {
          this.router.navigate(["/view-docentes"]); 
        },
        (error) => console.error("Error adding teacher", error),
      );
    }
  }

  cancel() {
    this.router.navigate(["/view-docentes"]);
  }
}
