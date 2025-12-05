import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth.service';
import { map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Espera la primera emisión real de Firebase
    map((user) => !!user),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        console.log('authGuard: Usuario no autenticado → redirigiendo');
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    })
  );
};
