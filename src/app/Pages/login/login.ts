import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { RouterLink } from '@angular/router';
import { usersService } from '../../services/UsersService';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(usersService);

  error = this.authService.error;

  ngOnInit(): void {
    this.userService.getUsers();
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe();
  }
}
