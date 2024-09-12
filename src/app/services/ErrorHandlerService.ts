import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Por favor verifica los datos ingresados.';
          break;
        case 401:
          errorMessage = 'Su sesión ha expirado. Por favor inicie sesión de nuevo.';
          this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
          break;
        case 403:
          errorMessage = 'No tiene permiso para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado. Verifique la URL.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Por favor inténtelo más tarde.';
          break;
        default:
          errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
          break;
      }
    }

    // Aquí puedes agregar un manejo adicional, como mostrar un mensaje de alerta
    alert(errorMessage); // O usar un servicio de notificaciones
    return throwError(() => new Error(errorMessage));
  }
}
