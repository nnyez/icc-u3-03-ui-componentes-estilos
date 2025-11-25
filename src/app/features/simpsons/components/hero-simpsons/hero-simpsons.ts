import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-simpsons',
  imports: [],
  templateUrl: './hero-simpsons.html',
  styleUrl: './hero-simpsons.css',
})
export class HeroSimpsons {
  simpsonsCount = input.required<number>();
  totalPages = input.required<number>();
}
