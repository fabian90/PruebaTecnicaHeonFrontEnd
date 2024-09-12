// employee-request-dto-create.model.ts
export class EmployeeRequestDTOCreate {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string; // Campo adicional
    position?: string;    // Campo adicional
    entityId!: number;
    isActive!: boolean;    // Clave foránea hacia Entity
  }
  
  // employee-request-dto-update.model.ts
  export class EmployeeRequestDTOUpdate {
    id!: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string; // Campo adicional
    position?: string;    // Campo adicional
    entityId!: number;    // Clave foránea hacia Entity
  }
  
  // employee-response-dto.model.ts
  export class EmployeeResponseDTO {
    id!: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string; // Campo adicional
    position?: string;    // Campo adicional
    isActive!: boolean;
    entityId!: number;    // Clave foránea hacia Entity
    entityName?: string;  // Nombre de la entidad asociada
  }