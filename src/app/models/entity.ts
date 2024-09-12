export interface EntityRequestDTOCreate {
    name: string; // Nombre de la entidad
    isActive?: boolean; // Estado de la entidad, por defecto true
  }
  export interface EntityRequestDTOUpdate {
    id: number; // ID de la entidad
    name: string; // Nombre de la entidad
    isActive?: boolean; // Estado de la entidad, por defecto true
  }
  
  export interface EntityResponseDTO {
    id: number; // ID de la entidad
    name: string; // Nombre de la entidad
    isActive: boolean; // Estado de la entidad
  }