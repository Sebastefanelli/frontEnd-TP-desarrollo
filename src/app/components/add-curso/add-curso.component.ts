import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Curso } from "../../models/curso.model";
import { Tema } from "../../models/tema.model";
import { Docente } from "../../models/docente.model";
import { Alumno } from "../../models/alumno.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-añadir-curso",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>{{ isEdit ? "Editar Curso" : "Agregar Curso" }}</h2>
    <form #cursoForm="ngForm" (ngSubmit)="onSubmit()" novalidate>
      <div>
        <label for="tema">Tema:</label>
        <select [(ngModel)]="curso.tema.id" name="tema" required>
          <option *ngFor="let tema of temas" [value]="tema.id">
            {{ tema.nombre }}
          </option>
        </select>
        <div *ngIf="cursoForm.submitted && !curso.tema.id" class="error">Tema es obligatorio.</div>
      </div>

      <div>
        <label for="docente">Docente:</label>
        <select [(ngModel)]="curso.docente.id" name="docente" required>
          <option *ngFor="let docente of docentes" [value]="docente.id">
            {{ docente.nombre }}
          </option>
        </select>
        <div *ngIf="cursoForm.submitted && !curso.docente.id" class="error">Docente es obligatorio.</div>
      </div>

      <div>
        <label for="fechaInicio">Fecha de inicio:</label>
        <input
          [(ngModel)]="curso.fechaInicio"
          name="fechaInicio"
          type="date"
          required
        />
        <div *ngIf="cursoForm.submitted && !curso.fechaInicio" class="error">Fecha de inicio es obligatoria.</div>
      </div>

      <div>
        <label for="fechaFin">Fecha de fin:</label>
        <input
          [(ngModel)]="curso.fechaFin"
          name="fechaFin"
          type="date"
          required
        />
        <div *ngIf="cursoForm.submitted && !curso.fechaFin" class="error">Fecha de fin es obligatoria.</div>
      </div>

      <div>
        <label for="precio">Precio:</label>
        <input
          [(ngModel)]="curso.precio"
          name="precio"
          type="number"
          min="0"
          required
        />
        <div *ngIf="cursoForm.submitted && (!curso.precio || curso.precio < 0)" class="error">Precio debe ser un valor positivo.</div>
      </div>

      <div>
        <label for="alumnos">Alumnos:</label>
        <div *ngFor="let alumno of curso.alumnos; let i = index">
          <select [(ngModel)]="alumno.id" name="alumnos{{ i }}" required>
            <option *ngFor="let alumno of alumnos" [value]="alumno.id">
              {{ alumno.nombre }}
            </option>
          </select>
          <button type="button" (click)="eliminarAlumno(i)">Eliminar Alumno</button>
          <div *ngIf="cursoForm.submitted && !alumno.id" class="error">Cada alumno debe seleccionarse.</div>
        </div>
        <button type="button" (click)="addAlumno()">Agregar Alumno</button>
      </div>

      <button type="submit" [disabled]="!cursoForm.form.valid">
        {{ isEdit ? "Actualizar Curso" : "Agregar Curso" }}
      </button>
      <button type="button" (click)="cancel()">Cancelar</button>
    </form>
  `,
  styles: [`
    .error {
      color: red;
      font-size: 0.8em;
    }
  `]
})
export class componenteAñadirCurso implements OnInit {
  curso: Curso = {
    fechaInicio: "",
    fechaFin: "",
    precio: 0,
    alumnos: [],
    tema: { id: undefined, nombre: "", descripcion: "" },
    docente: { id: undefined, nombre: "", legajo: 0 },
  };

  temas: Tema[] = [];
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  isEdit = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.isEdit = true;
        this.loadCurso(id);
      }
    });

    this.fetchTemas();
    this.fetchDocentes();
    this.fetchAlumnos();
  }

  fetchTemas() {
    this.apiService.getTemas().subscribe(
      (temas) => (this.temas = temas),
      (error) => console.error("Error al cargar los temas", error),
    );
  }

  fetchDocentes() {
    this.apiService.getDocentes().subscribe(
      (docentes) => (this.docentes = docentes),
      (error) => console.error("Error al cargar los docentes", error),
    );
  }

  fetchAlumnos() {
    this.apiService.getAlumnos().subscribe(
      (alumnos) => (this.alumnos = alumnos),
      (error) => console.error("Error al cargar los estudiantes", error),
    );
  }

  loadCurso(id: number) {
    this.apiService.getCursoPorId(id).subscribe(
      (curso) => {
        this.curso = curso;
      },
      (error) => console.error("Error al cargar el curso", error),
    );
  }

  onSubmit() {
    if (!this.curso.tema.id || !this.curso.docente.id || !this.curso.fechaInicio || !this.curso.fechaFin || this.curso.precio <= 0) {
      return; // Detiene el envío si algún campo es inválido
    }

    const courseToSubmit: Curso = {
      ...this.curso,
      tema: { id: Number(this.curso.tema.id) },
      docente: { id: Number(this.curso.docente.id) },
      alumnos: this.curso.alumnos.map((alumno) => ({
        id: Number(alumno.id),
      })),
    };

    if (this.isEdit) {
      this.apiService.updateCurso(courseToSubmit).subscribe(
        () => this.router.navigate(["/view-cursos"]),
        (error) => console.error("Error actualizando curso", error)
      );
    } else {
      this.apiService.añadirCurso(courseToSubmit).subscribe(
        () => this.router.navigate(["/view-cursos"]),
        (error) => console.error("Error agregando curso", error)
      );
    }
  }

  addAlumno() {
    this.curso.alumnos.push({
      id: undefined,
      nombre: "",
      fechaNacimiento: "",
    });
  }

  eliminarAlumno(index: number) {
    this.curso.alumnos.splice(index, 1);
  }

  cancel() {
    this.router.navigate(["/view-cursos"]);
  }
}


/*con existentes
{
	"alumnos": [
		{
			"fechaNacimiento": "",
			"id": 1,
			"nombre": ""
		}
	],
	"docente": {
		"id": 2
	},
	"fechaFin": "2025-04-29",
	"fechaInicio": "2024-10-25",
	"precio": 2500,
	"tema": {
		"id": 2
	}
}
*/

/*nuevos no entiendo porque falla
{
	"alumnos": [
		{
			"fechaNacimiento": "2001-10-24",
			"nombre": "prueba"
		}
	],
	"docente": {
		"legajo": 654321,
		"nombre": "prueba"
	},
	"fechaFin": "2025-04-30",
	"fechaInicio": "2024-10-26",
	"precio": 2000,
	"tema": {
		"descripcion": "prueba",
		"nombre": "prueba"
	}
}
*/
