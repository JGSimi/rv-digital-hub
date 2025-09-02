// Core business models for RV Digital management system

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  email?: string;
  telefone?: string;
  dataNascimento: string; // YYYY-MM-DD format
  ativo: boolean;
  statusCadastro?: string;
  categoria?: Categoria;
  enderecos?: Endereco[];
  contratos?: Contrato[];
}

export interface Contrato {
  id?: number;
  dataInicio: string; // YYYY-MM-DD format
  dataFim?: string;
  status?: string;
  valorTotal?: number;
  observacoes?: string;
  cliente: Cliente | { id: number };
  itens?: Item[];
}

export interface Categoria {
  id?: number;
  nome: string;
  descricao: string;
  beneficios?: string;
  ativo: boolean;
}

export interface Endereco {
  id?: number;
  rua: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
  principal: boolean;
  cliente?: { id: number };
}

export interface Item {
  id?: number;
  quantidade: number;
  valor: number;
  desconto?: number;
  valorFinal?: number;
  contrato: Contrato | { id: number };
  servico: Servico | { id: number };
}

export interface Servico {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  categoria: string;
  ativo: boolean;
}

// Dashboard metrics
export interface DashboardMetrics {
  totalClientes: number;
  clientesAtivos: number;
  contratosAtivos: number;
  faturamentoMensal: number;
}