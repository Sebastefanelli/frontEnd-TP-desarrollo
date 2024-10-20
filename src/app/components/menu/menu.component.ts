import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

type Section = "cursos" | "alumnos" | "docentes" | "temas" | "especifico";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="menu">
      <ul>
        <li>
          <button (click)="toggleSection('cursos')">Cursos</button>
          <div *ngIf="sections.cursos" class="dropdown">
            <a routerLink="/view-cursos">Ver Cursos</a>
            <a routerLink="/add-curso">Agregar Cursos</a>
          </div>
        </li>

        <li>
          <button (click)="toggleSection('alumnos')">Estudiantes</button>
          <div *ngIf="sections.alumnos" class="dropdown">
            <a routerLink="/view-alumnos">Ver Estudiantes</a>
            <a routerLink="/add-alumno">Agregar Estudiantes</a>
          </div>
        </li>

        <li>
          <button (click)="toggleSection('docentes')">Docentes</button>
          <div *ngIf="sections.docentes" class="dropdown">
            <a routerLink="/view-docentes">Ver Docentes</a>
            <a routerLink="/add-docente">Agregar Docente</a>
          </div>
        </li>

        <li>
          <button (click)="toggleSection('temas')">Temas</button>
          <div *ngIf="sections.temas" class="dropdown">
            <a routerLink="/view-temas">Ver Temas</a>
            <a routerLink="/add-tema">Agregar Tema</a>
          </div>
        </li>

        <li>
          <button (click)="toggleSection('especifico')">Específicas</button>
          <div *ngIf="sections.especifico" class="dropdown">
            <a routerLink="/buscar-cursos-por-fecha" class="large-button"
              >Buscar cursos por fecha de fin</a
            >
            <a routerLink="/ver-alumnos-por-docente" class="large-button"
              >Ver alumnos por docentes</a
            >
          </div>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .menu {
        text-align: center; 
      }

      .menu ul {
        list-style-type: none;
        padding: 0;
        display: inline-block; 
      }

      .menu li {
        display: inline-block;
        margin: 0 10px; 
        position: relative; 
      }
      .menu button {
        background-color: #3066be;
        border: none;
        color: white;
        padding: 12px 24px; 
        font-size: 16px; 
        cursor: pointer;
        border-radius: 5px;
      }

      .menu div.dropdown {
        display: block; 
        position: absolute; 
        left: 50%; 
        transform: translateX(-50%); 
        background-color: #f8f8f8; 
        border: 1px solid #ddd; 
        border-radius: 5px;
        z-index: 1; 
        margin-top: 5px; 
      }

      .menu div.dropdown a {
        display: block;
        background-color: #28c2ff;
        color: white;
        padding: 5px 12px;
        margin: 5px 0; 
        text-decoration: none;
        border-radius: 5px;
      }

      .menu div.dropdown a.large-button {
        padding: 10px 10px; 
        width: 220px; 
        text-align: center; 
      }

      .menu div.dropdown a:hover {
        background-color: #1a9ad6;
      }
    `,
  ],
})
export class MenuComponent {
  sections: Record<Section, boolean> = {
    cursos: false,
    alumnos: false,
    docentes: false,
    temas: false,
    especifico: false,
  };

  toggleSection(section: Section) {
    for (const key in this.sections) {
      if (key !== section) {
        this.sections[key as Section] = false; 
      }
    }
    this.sections[section] = !this.sections[section];
  }
}
