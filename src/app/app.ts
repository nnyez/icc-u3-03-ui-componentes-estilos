import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from "./features/daisyui-page/components/footer/footer";
import { NavbarDrawer } from './shared/components/navbar-drawer/navbar-drawer';
import { AuthService } from './core/services/firebase/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarDrawer, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('03-ui-componentes-estilos');
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;

  logout(): void {
    this.authService.logout().subscribe({
      error: (error) => console.error('Error cerrando sesión', error)
    });
  }
}
