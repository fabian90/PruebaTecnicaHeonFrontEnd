// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserAuthResponseDTO } from '../../models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response) => {
          if (response.success && response.data) {
            // Guardar el token y redirigir
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.idRole.toString());
            this.router.navigate(['/employees']); // Redirigir al dashboard u otra ruta
          } else {
            this.errorMessage = response.message; // Usar el mensaje de la respuesta
          }
        },
        (error) => {
          this.errorMessage = 'Usuario o contraseña incorrecta'; // Manejar error
        }
      );
    }
  }
}
