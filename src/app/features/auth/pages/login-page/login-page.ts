import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/services/firebase/auth.service';
import { FormUtils } from '../../../../shared/utils/form-utils';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;

  private loginTrigger = signal<{ email: string; password: string } | null>(null);

  loginResource = rxResource({
    params: () => this.loginTrigger(),
    stream: ({ params }) => {
      if (!params) {
        return of(null);
      }
      return this.authService.login(params.email, params.password);
    }
  });

  loading = this.loginResource.isLoading;
  formUtils = FormUtils;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    effect(() => {
      if (this.loginResource.hasValue() && this.loginResource.value()) {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loginTrigger.set({ email, password });
  }

  errorMessage = (): string => {
    const error = this.loginResource.error();
    if (!error) {
      return '';
    }

    const code = (error as any).code || '';
    const map: Record<string, string> = {
      'auth/invalid-email': 'Correo no valido',
      'auth/user-disabled': 'El usuario esta deshabilitado',
      'auth/user-not-found': 'No existe un usuario con este correo',
      'auth/wrong-password': 'Contrasena incorrecta',
      'auth/invalid-credential': 'Credenciales invalidas'
    };

    return map[code] ?? 'No pudimos iniciar sesion';
  };

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
