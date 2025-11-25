import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ThemeRepository } from '../../../services/theme-repository';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  constructor() {
    effect(() => {
      this.setTheme(this.currentTheme());
    });
  }

  // Temas disponibles
  themes = ['light', 'dark', 'coffee'];
  readonly themeRepository = inject(ThemeRepository);

  // Tema actual reactivo
  currentTheme = signal<string>(this.getCurrentTheme());

  // Obtiene el tema actual desde el atributo HTML
  private getCurrentTheme(): string {
    const theme = this.themeRepository.getTheme();
    return theme;
  }

  // Cambia el tema y actualiza el atributo global
  setTheme(theme: string): void {
    this.currentTheme.set(theme);
    this.themeRepository.setTheme(theme);
  }
}
