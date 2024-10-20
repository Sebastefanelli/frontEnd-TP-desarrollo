import { Routes } from "@angular/router";
import { componenteVerCursos } from "./components/view-cursos/view-cursos.component";
import { componenteAñadirCurso} from "./components/add-curso/add-curso.component";
import { componenteVerAlumnos } from "./components/view-alumnos/view-alumnos.component";
import { componenteAñadirAlumno } from "./components/add-alumno/add-alumno.component";
import { componenteVerDocentes } from "./components/view-docentes/view-docentes.component";
import { componenteAñadirDocente } from "./components/add-docente/add-docente.component";
import { componenteVerTemas } from "./components/view-temas/view-temas.component";
import { componenteAñadirTema } from "./components/add-tema/add-tema.component";
import { componenteBuscarCursoPorFecha } from "./components/bucar-cursos-por-fecha/buscar-cursos-por-fecha.component";
import { componenteVerAlumnosPorDocente } from "./components/view-alumnos-por-docente/view-alumnos-por-docente.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

export const routes: Routes = [
  { path: "edit-docente/:id", component: componenteAñadirDocente },
  { path: "edit-tema/:id", component: componenteAñadirTema },
  { path: "add-curso/:id", component: componenteAñadirCurso },
  { path: "view-cursos", component: componenteVerCursos },
  { path: "add-curso", component: componenteAñadirCurso },
  { path: "edit-alumno/:id", component: componenteAñadirAlumno },
  { path: "view-alumnos", component: componenteVerAlumnos },
  { path: "add-alumno", component: componenteAñadirAlumno },
  { path: "view-docentes", component: componenteVerDocentes },
  { path: "add-docente", component: componenteAñadirDocente },
  { path: "view-temas", component: componenteVerTemas },
  { path: "add-tema", component: componenteAñadirTema },
  { path: "buscar-cursos-por-fecha", component: componenteBuscarCursoPorFecha },
  {
    path: "ver-alumnos-por-docente",
    component: componenteVerAlumnosPorDocente,
  },
  { path: "", redirectTo: "/view-cursos", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
