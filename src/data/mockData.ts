import { Cliente, Contrato, Categoria, Servico, DashboardMetrics } from "@/types";

// Mock categories
export const mockCategorias: Categoria[] = [
  {
    id: 1,
    nome: "Premium",
    descricao: "Categoria premium com todos os benefícios",
    beneficios: "Atendimento prioritário, desconto de 15%, suporte 24/7",
    ativo: true,
  },
  {
    id: 2,
    nome: "Standard",
    descricao: "Categoria padrão para clientes regulares",
    beneficios: "Atendimento regular, desconto de 5%",
    ativo: true,
  },
  {
    id: 3,
    nome: "Basic",
    descricao: "Categoria básica para novos clientes",
    beneficios: "Atendimento padrão",
    ativo: true,
  },
];

// Mock services
export const mockServicos: Servico[] = [
  {
    id: 1,
    nome: "Desenvolvimento Web",
    descricao: "Criação de sites e aplicações web personalizadas",
    valor: 2500.00,
    categoria: "Desenvolvimento",
    ativo: true,
  },
  {
    id: 2,
    nome: "Marketing Digital",
    descricao: "Estratégias completas de marketing online",
    valor: 1800.00,
    categoria: "Marketing",
    ativo: true,
  },
  {
    id: 3,
    nome: "Consultoria em TI",
    descricao: "Consultoria especializada em tecnologia da informação",
    valor: 800.00,
    categoria: "Consultoria",
    ativo: true,
  },
  {
    id: 4,
    nome: "Design Gráfico",
    descricao: "Criação de identidade visual e materiais gráficos",
    valor: 1200.00,
    categoria: "Design",
    ativo: true,
  },
];

// Mock clients
export const mockClientes: Cliente[] = [
  {
    id: 1,
    nome: "João Silva Santos",
    cpf: "123.456.789-00",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-1234",
    dataNascimento: "1985-06-15",
    ativo: true,
    statusCadastro: "completo",
    categoria: mockCategorias[0],
    enderecos: [
      {
        id: 1,
        rua: "Rua das Flores, 123",
        numero: "123",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567",
        principal: true,
        cliente: { id: 1 },
      },
    ],
  },
  {
    id: 2,
    nome: "Maria Oliveira Costa",
    cpf: "987.654.321-00",
    email: "maria.costa@empresa.com",
    telefone: "(11) 98888-5678",
    dataNascimento: "1990-08-22",
    ativo: true,
    statusCadastro: "completo",
    categoria: mockCategorias[1],
    enderecos: [
      {
        id: 2,
        rua: "Av. Paulista, 1000",
        numero: "1000",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-100",
        principal: true,
        cliente: { id: 2 },
      },
    ],
  },
  {
    id: 3,
    nome: "Pedro Almeida Rocha",
    cpf: "456.789.123-00",
    email: "pedro.rocha@gmail.com",
    telefone: "(21) 97777-9999",
    dataNascimento: "1988-03-10",
    ativo: false,
    statusCadastro: "pendente",
    categoria: mockCategorias[2],
    enderecos: [
      {
        id: 3,
        rua: "Rua Copacabana, 456",
        numero: "456",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "22070-011",
        principal: true,
        cliente: { id: 3 },
      },
    ],
  },
  {
    id: 4,
    nome: "Ana Paula Ferreira",
    cpf: "789.123.456-00",
    email: "ana.ferreira@outlook.com",
    telefone: "(31) 96666-7777",
    dataNascimento: "1992-11-05",
    ativo: true,
    statusCadastro: "completo",
    categoria: mockCategorias[0],
    enderecos: [
      {
        id: 4,
        rua: "Rua da Bahia, 789",
        numero: "789",
        cidade: "Belo Horizonte",
        estado: "MG",
        cep: "30160-012",
        principal: true,
        cliente: { id: 4 },
      },
    ],
  },
];

// Mock contracts
export const mockContratos: Contrato[] = [
  {
    id: 1,
    dataInicio: "2024-01-15",
    dataFim: "2024-12-15",
    status: "ativo",
    valorTotal: 5000.00,
    observacoes: "Contrato para desenvolvimento de sistema web completo com manutenção inclusa.",
    cliente: mockClientes[0],
    itens: [
      {
        id: 1,
        quantidade: 1,
        valor: 2500.00,
        desconto: 0,
        valorFinal: 2500.00,
        contrato: { id: 1 },
        servico: mockServicos[0],
      },
      {
        id: 2,
        quantidade: 1,
        valor: 1800.00,
        desconto: 300.00,
        valorFinal: 1500.00,
        contrato: { id: 1 },
        servico: mockServicos[1],
      },
    ],
  },
  {
    id: 2,
    dataInicio: "2024-02-01",
    dataFim: "2024-08-01",
    status: "ativo",
    valorTotal: 3200.00,
    observacoes: "Projeto de identidade visual e campanhas de marketing digital.",
    cliente: mockClientes[1],
    itens: [
      {
        id: 3,
        quantidade: 1,
        valor: 1200.00,
        desconto: 0,
        valorFinal: 1200.00,
        contrato: { id: 2 },
        servico: mockServicos[3],
      },
      {
        id: 4,
        quantidade: 1,
        valor: 1800.00,
        desconto: 0,
        valorFinal: 1800.00,
        contrato: { id: 2 },
        servico: mockServicos[1],
      },
    ],
  },
  {
    id: 3,
    dataInicio: "2024-03-10",
    status: "pendente",
    valorTotal: 800.00,
    observacoes: "Consultoria em infraestrutura de TI para modernização do ambiente corporativo.",
    cliente: mockClientes[3],
    itens: [
      {
        id: 5,
        quantidade: 1,
        valor: 800.00,
        desconto: 0,
        valorFinal: 800.00,
        contrato: { id: 3 },
        servico: mockServicos[2],
      },
    ],
  },
];

// Dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalClientes: mockClientes.length,
  clientesAtivos: mockClientes.filter(c => c.ativo).length,
  contratosAtivos: mockContratos.filter(c => c.status === "ativo").length,
  faturamentoMensal: mockContratos
    .filter(c => c.status === "ativo")
    .reduce((total, contrato) => total + (contrato.valorTotal || 0), 0),
};