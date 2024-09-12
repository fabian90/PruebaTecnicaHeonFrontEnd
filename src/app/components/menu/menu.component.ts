import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  isLoggedIn(): boolean {
    return this.authService.getToken() !== null; // Verificar si el usuario está autenticado
  }
}