import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HttpClientModule],
  template: `
    <app-menu></app-menu>
    <div id="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      #content {
        margin: 20px;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class AppComponent {
  title = "Administración de Cursos";
}
