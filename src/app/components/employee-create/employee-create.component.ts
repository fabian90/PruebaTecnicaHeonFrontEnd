import { EntityResponseDTO} from './../../models/entity';
import {EmployeeRequestDTOCreate,EmployeeRequestDTOUpdate } from '../../models/employee';
import { EntityService } from '../../services/entity.service';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { QueryFilter,RecordsResponse} from './../../models/response';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean = false; // Inicializar isEdit
  employeeId: number | null = null;
  entities: EntityResponseDTO[] = []; // Lista de entidades
  filter: QueryFilter = {
    page: 1,
    take: 10,
    filter: '',
    type: '',
    ids: ''
  };

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private entityService: EntityService, // Inyectar el servicio Entity
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required], // Agregar campo para la posición
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Agregar campo para el teléfono
      entityId: [null, Validators.required], // Agregar campo para la entidad
      // Agrega otros campos según sea necesario
    });
  }

  ngOnInit(): void {
    this.loadEntities(); // Cargar entidades al iniciar

    // Comprobar si hay un ID en la ruta para editar
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true; // Establecer isEdit en verdadero
        this.employeeId = +id; // Convertir el ID a número
        this.loadEmployeeData(this.employeeId); // Cargar datos del empleado
      }
    });
  }

  loadEntities(): void {
    this.entityService.getAll(this.filter).subscribe(
      (response: RecordsResponse<EntityResponseDTO>) => {
        this.entities = response.items; // Asumiendo que la respuesta tiene la propiedad 'items'
      },
      (error) => {
        // Manejo de errores al cargar entidades
        console.error('Error al cargar entidades:', error);
      }
    );
  }

  loadEmployeeData(id: number): void {
    this.employeeService.getById(id).subscribe(
      employee => {
        this.employeeForm.patchValue(employee); // Rellenar el formulario con datos del empleado
      },
      (error) => {
        // Manejo de errores al cargar datos del empleado
        console.error('Error al cargar empleado:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEdit) {
        const employeeUpdate: EmployeeRequestDTOUpdate = {
          id: this.employeeId!,
          ...this.employeeForm.value
        };
        this.employeeService.update(employeeUpdate).subscribe(
          () => {
            this.router.navigate(['/employees']); // Redirigir después de la actualización
          },
          (error) => {
            // Manejo de errores al actualizar empleado
            console.error('Error al actualizar empleado:', error);
          }
        );
      } else {
        const employeeCreate: EmployeeRequestDTOCreate = this.employeeForm.value;
        this.employeeService.create(employeeCreate).subscribe(
          () => {
            this.router.navigate(['/employees']); // Redirigir después de la creación
          },
          (error) => {
            // Manejo de errores al crear empleado
            console.error('Error al crear empleado:', error);
          }
        );
      }
    } else {
      // Manejo de errores de validación del formulario
      console.error('Formulario no válido:', this.employeeForm.errors);
    }
  }
}