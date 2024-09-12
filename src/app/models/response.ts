export interface QueryFilter {
    page: number; // Número de página actual
    take: number;   // Tamaño de la página (cuántos elementos mostrar por página)
    ids: string; // Término de búsqueda opcional
    filter : string; // Término de búsqueda opcional
    type : string; // Término de búsqueda opcional
  }

  export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
  }

  export interface RecordsResponse<T> {
    hasItems: boolean; // Indica si hay elementos en la respuesta
    items: T[];       // Array de elementos del tipo genérico T
    total: number;    // Total de elementos disponibles
    page: number;     // Número de la página actual
    pages: number;    // Total de páginas disponibles
  }
