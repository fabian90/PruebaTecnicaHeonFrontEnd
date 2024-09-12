import { ApiResponse,RecordsResponse,QueryFilter} from './../models/response';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'; // Importar catchError
import { HttpClient,  HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import {EmployeeRequestDTOCreate, EmployeeRequestDTOUpdate,EmployeeResponseDTO } from '../models/employee';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './ErrorHandlerService';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/employee`;
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluir el token Bearer
    });
  }


  // Método para obtener un empleado por ID
  getById(id: number): Observable<EmployeeResponseDTO> {
    return this.http.get<EmployeeResponseDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para crear un nuevo empleado
  create(entity: EmployeeRequestDTOCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, entity, { headers: this.getHeaders() }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para actualizar un empleado existente
  update(entity: EmployeeRequestDTOUpdate): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, entity, { headers: this.getHeaders() }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para eliminar un empleado (marcar como inactivo)
  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para obtener una lista de empleados con paginación o filtrado
  getAll(search: QueryFilter): Observable<RecordsResponse<EmployeeResponseDTO>> {
    let params = new HttpParams()
      .set('page', search.page.toString()) // Asegurarse de convertir a string
      .set('take', search.take.toString());

    if (search.ids) {
      params = params.set('ids', search.ids);
    }
    if (search.filter) {
      params = params.set('filter', search.filter.toString());
    }
    if (search.type) {
      params = params.set('type', search.type);
    }

    console.log("Parámetros enviados:", params.toString()); // Depuración

    return this.http.get<RecordsResponse<EmployeeResponseDTO>>(this.apiUrl, { params }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }
}
