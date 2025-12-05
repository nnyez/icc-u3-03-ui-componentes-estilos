import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { SimpsonsDetail } from './features/simpsons-page/components/simpsons-detail/simpsons-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'simpson-page',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((m) => m.LoginPage),
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page').then((m) => m.RegisterPage),
    canActivate: [publicGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./features/daisyui-page/daisyui-page').then((m) => m.DaisyuiPage),
    canActivate: [authGuard],
  },
  {
    path: 'estilos-page',
    loadComponent: () => import('./features/estilos-page/estilos-page').then((m) => m.EstilosPage),
    canActivate: [authGuard],
  },
  {
    path: 'simpson-page',
    loadComponent: () =>
      import('./features/simpsons-page/simpsons-page').then((m) => m.SimpsonsPage),
    canActivate: [authGuard],
  },
  {
    path: 'simpson-page/:id',
    loadComponent: () =>
      import('./features/simpsons-page/components/simpsons-detail/simpsons-detail').then(
        (m) => m.SimpsonsDetail
      ),
    canActivate: [authGuard],

  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
