export interface UserAuthResponseDTO {
    idRole: number;
    username: string;
    fullName: string;
    token: string;
  }

  export interface ApiResponse<T> {
    message: string;
    success: boolean;
    data?: T; // Puede ser opcional si no siempre hay datos
  }