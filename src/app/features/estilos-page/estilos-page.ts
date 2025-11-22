import { Component } from '@angular/core';
import { SignalBox } from "./Componentes/signal-box/signal-box";
import { ProgressBar } from "./Componentes/progress-bar/progress-bar";

@Component({
  selector: 'app-estilos-page',
  imports: [SignalBox, ProgressBar],
  templateUrl: './estilos-page.html',
  styleUrl: './estilos-page.css',
})
export class EstilosPage {

}
