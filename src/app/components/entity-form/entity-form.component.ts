import { EntityRequestDTOCreate, EntityRequestDTOUpdate} from './../../models/entity';
import { ApiResponse } from './../../models/response';
import { EntityService } from './../../services/entity.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 
@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css'],
})
export class EntityFormComponent implements OnInit {
  entityForm!: FormGroup;
  isEdit: boolean = false;
  entityId: number | null = null;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id'); // Obtener el parámetro 'id'

    // Comprobar si el idParam no es nulo antes de convertirlo a número
    if (idParam) {
      this.entityId = +idParam; // Convertir a número
      this.isEdit = true;
      this.loadEntity(this.entityId);
    }
  }

  initForm(): void {
    this.entityForm = this.formBuilder.group({
      name: ['', Validators.required], // Campo de nombre requerido
      isActive: [true] // Estado por defecto
    });
  }

  loadEntity(id: number): void {
    this.entityService.getById(id).subscribe(response => {
      this.entityForm.patchValue(response); // Cargar datos en el formulario
    });
  }

  save(): void {
    if (this.entityForm.valid) {
      if (this.isEdit) {
        const updateRequest: EntityRequestDTOUpdate = {
          id: this.entityId!,
          ...this.entityForm.value,
        };

        this.entityService.update(updateRequest).subscribe((response: ApiResponse) => {
          alert(response.message); // Mostrar mensaje de éxito
          this.router.navigate(['/entity']); // Redirigir después de guardar
        });
      } else {
        const createRequest: EntityRequestDTOCreate = {
          ...this.entityForm.value,
        };

        this.entityService.create(createRequest).subscribe((response: ApiResponse) => {
          alert(response.message); // Mostrar mensaje de éxito
          this.router.navigate(['/entity']); // Redirigir después de guardar
        });
      }
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}