import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  error = this.authService.error;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = form.value;

    if (password !== confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    this.authService.register(form.value);
    form.resetForm();
  }
}
