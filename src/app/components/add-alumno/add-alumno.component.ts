import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Alumno } from "../../models/alumno.model";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-añadir-alumno",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 *ngIf="!editingStudent">Agregar Estudiante</h2>
    <h2 *ngIf="editingStudent">Editar Estudiante</h2>
    <form #alumnoForm="ngForm" (ngSubmit)="onSubmit(alumnoForm)" novalidate>
      <div>
        <label for="nombre">Nombre:</label>
        <input [(ngModel)]="alumno.nombre" name="nombre" required />
        <div *ngIf="alumnoForm.submitted && !alumno.nombre" class="error">
          El nombre es requerido.
        </div>
      </div>
      <div>
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          [(ngModel)]="alumno.fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          required
        />
        <div *ngIf="alumnoForm.submitted && !alumno.fechaNacimiento" class="error">
          La fecha de nacimiento es requerida.
        </div>
      </div>
      <button type="submit" [disabled]="alumnoForm.invalid">
        {{ editingStudent ? "Actualizar" : "Agregar" }}
      </button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `,
})
export class componenteAñadirAlumno implements OnInit {
  alumno: Alumno = { nombre: "", fechaNacimiento: "" };
  editingStudent: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.editingStudent = true;
      this.apiService.getAlumnoPorId(+id).subscribe(
        (alumno: Alumno) => {
          this.alumno = alumno;
        },
        (error: any) => {
          console.error("Error fetching student", error);
        },
      );
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.editingStudent) {
        this.apiService.updateAlumno(this.alumno).subscribe(
          () => this.router.navigate(["/view-alumnos"]),
          (error) => console.error("Error updating student", error),
        );
      } else {
        this.apiService.addAlumno(this.alumno).subscribe(
          () => this.router.navigate(["/view-alumnos"]),
          (error) => console.error("Error adding student", error),
        );
      }
    }
  }

  cancel() {
    this.router.navigate(["/view-alumnos"]);
  }
}
