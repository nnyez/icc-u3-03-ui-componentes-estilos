import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signal-box',
  imports: [],
  templateUrl: './signal-box.html',
  styleUrl: './signal-box.css',
})
export class SignalBox {
  valor = signal<number>(0);

  cambiarValor(event: Event) {
    const input = event.target as HTMLInputElement;
    const nuevoValor = Number(input.value);
    this.valor.set(nuevoValor);
  }
}
