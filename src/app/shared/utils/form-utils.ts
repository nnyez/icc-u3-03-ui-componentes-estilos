import { FormGroup } from '@angular/forms';

export class FormUtils {
  static getFieldError(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (control.hasError('email')) {
      return 'Ingresa un correo valido';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Minimo ${requiredLength} caracteres`;
    }

    if (control.hasError('passwordMismatch')) {
      return 'Las contrasenas no coinciden';
    }

    return 'Dato invalido';
  }
}
