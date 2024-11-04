import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Tema } from "../../models/tema.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-añadir-tema",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>{{ isEditMode ? "Editar Tema" : "Agregar Tema" }}</h2>
    <form #temaForm="ngForm" (ngSubmit)="onSubmit(temaForm)" novalidate>
      <input
        [(ngModel)]="tema.nombre"
        name="nombre"
        placeholder="Nombre del tema"
        required
      />
      <div *ngIf="temaForm.submitted && !tema.nombre" class="error">
        El nombre es requerido.
      </div>
      <textarea
        [(ngModel)]="tema.descripcion"
        name="descripcion"
        placeholder="Descripción del tema"
        required
      ></textarea>
      <div *ngIf="temaForm.submitted && !tema.descripcion" class="error">
        La descripción es requerida.
      </div>
      <button type="submit" [disabled]="temaForm.invalid">
        {{ isEditMode ? "Actualizar Tema" : "Agregar Tema" }}
      </button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `,
})
export class componenteAñadirTema implements OnInit {
  @Input() tema: Tema = { nombre: "", descripcion: "" };
  isEditMode = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.loadTopic(id);
    }
  }

  loadTopic(id: string) {
    this.apiService.getTemaPorId(+id).subscribe(
      (tema) => {
        this.tema = tema;
      },
      (error) => console.error("Error loading topic", error),
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isEditMode) {
        this.apiService.updateTema(this.tema).subscribe(
          (response) => {
            console.log("Tema actualizado", response);
            this.router.navigate(["/view-temas"]);
          },
          (error) => console.error("Error updating topic", error),
        );
      } else {
        this.apiService.addTema(this.tema).subscribe(
          (response) => {
            console.log("Tema añadido", response);
            this.tema = { nombre: "", descripcion: "" };
            this.router.navigate(["/view-temas"]);
          },
          (error) => console.error("Error adding topic", error),
        );
      }
    }
  }

  cancel() {
    this.router.navigate(["/view-temas"]);
  }
}
