import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { AuthService } from '../../../../core/services/firebase/auth.service';
import { FormUtils } from '../../../../shared/utils/form-utils';


@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;

  private registerTrigger = signal<{ email: string; password: string } | null>(null);

  registerResource = rxResource({
    params: () => this.registerTrigger(),
    stream: ({ params }) => {
      if (!params) {
        return of(null);
      }
      return this.authService.register(params.email, params.password);
    }
  });

  loading = this.registerResource.isLoading;
  formUtils = FormUtils;

  constructor() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );

    effect(() => {
      if (this.registerResource.hasValue() && this.registerResource.value()) {
        this.router.navigate(['/home']);
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.registerForm.value;
    this.registerTrigger.set({ email, password });
  }

  errorMessage = (): string => {
    const error = this.registerResource.error();
    if (!error) {
      return '';
    }

    const code = (error as any).code || '';
    const map: Record<string, string> = {
      'auth/email-already-in-use': 'Este correo ya esta registrado',
      'auth/invalid-email': 'El correo no es valido',
      'auth/operation-not-allowed': 'Operacion no permitida',
      'auth/weak-password': 'La contrasena es debil'
    };

    return map[code] ?? 'No pudimos crear la cuenta';
  };

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
