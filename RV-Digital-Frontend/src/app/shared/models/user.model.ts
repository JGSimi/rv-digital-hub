export interface User {
  id: number;
  email: string;
  nome: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nome: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  email: string;
  nome: string;
  role: string;
}