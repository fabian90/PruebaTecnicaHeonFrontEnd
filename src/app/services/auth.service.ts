import { ErrorHandlerService } from './ErrorHandlerService';
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserAuthResponseDTO,ApiResponse } from '../models/auth'; 
import { catchError } from 'rxjs/operators'; // Importar catchError
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Authenticate`; 
 

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}


  login(username: string, password: string): Observable<ApiResponse<UserAuthResponseDTO>> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    
    return this.http.get<ApiResponse<UserAuthResponseDTO>>(`${this.apiUrl}/Authenticate`, { params }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User`, { username, password }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para verificar si el usuario tiene rol de admin
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === '1';
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token
    localStorage.removeItem('role'); // Elimina el rol, si es necesario
  }   
}
