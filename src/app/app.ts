import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarDrawer } from "./features/daisyui-page/components/navbar-drawer/navbar-drawer";
import { Footer } from "./features/daisyui-page/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarDrawer, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('03-ui-componentes-estilos');
}
