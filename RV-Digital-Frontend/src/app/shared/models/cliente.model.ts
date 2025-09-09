export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  ativo: boolean;
  statusCadastro: string;
  categoria?: Categoria;
  enderecos?: Endereco[];
  contratos?: Contrato[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Categoria {
  id?: number;
  nome: string;
  descricao: string;
  beneficios: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Endereco {
  id?: number;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  tipo: string;
  clienteId?: number;
}

export interface Contrato {
  id?: number;
  cliente?: Cliente;
  status: string;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  itens?: Item[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Servico {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  categoria?: Categoria;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Item {
  id?: number;
  contrato?: Contrato;
  servico?: Servico;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}