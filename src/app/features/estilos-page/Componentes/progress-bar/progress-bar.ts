import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  valueP = signal<number>(50);
  onHadle(event: Event) {
    const input = event.target as HTMLInputElement;
    const nuevoValor = Number(input.value);
    this.valueP.set(nuevoValor);
  }
}
