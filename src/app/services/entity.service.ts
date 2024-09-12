
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importar catchError
import { environment } from '../../environments/environment'; 
import {EntityRequestDTOCreate, EntityRequestDTOUpdate,EntityResponseDTO } from '../models/entity';
import { ApiResponse,RecordsResponse,QueryFilter} from './../models/response';
import { ErrorHandlerService } from './ErrorHandlerService'; 
@Injectable({
  providedIn: 'root',
})
export class EntityService {
  private apiUrl = `${environment.apiUrl}/Entity`; // Ajustar según la configuración del entorno

  constructor(private http: HttpClient,private errorHandler: ErrorHandlerService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluir el token Bearer
    });
  }


  // Método para obtener una entidad por ID
  getById(id: number): Observable<EntityResponseDTO> {
    return this.http.get<EntityResponseDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para crear una nueva entidad
  create(entity: EntityRequestDTOCreate): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, entity, { headers: this.getHeaders() }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para actualizar una entidad existente
  update(entity: EntityRequestDTOUpdate): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}`, entity, { headers: this.getHeaders() }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para eliminar una entidad (marcar como inactiva)
  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }

  // Método para obtener una lista de entidades con paginación o filtrado
  getAll(filter: QueryFilter): Observable<RecordsResponse<EntityResponseDTO>> {
    return this.http.get<RecordsResponse<EntityResponseDTO>>(this.apiUrl, { params: filter as any }).pipe(
      catchError(error => this.errorHandler.handleError(error)) // Captura de errores
    );
  }
}