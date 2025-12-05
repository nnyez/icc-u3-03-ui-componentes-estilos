import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { AuthService } from '../../../core/services/firebase/auth.service';

@Component({
  selector: 'app-navbar-drawer',
  imports: [RouterLink, RouterLinkActive, ThemeSwitcher],
  templateUrl: './navbar-drawer.html',
  styleUrl: './navbar-drawer.css',
})
export class NavbarDrawer {
  private authService = inject(AuthService);
  private router = inject(Router);
  closeDrawer() {
    const drawer = document.getElementById('my-drawer-2') as HTMLInputElement;
    if (drawer) drawer.checked = false;
  }
  currentUser = this.authService.currentUser;

  logout() {
    if (confirm('¿Cerrar sesión?')) {
      this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al cerrar sesión:', error);
        },
      });
    }
  }
}
