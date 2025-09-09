import { z } from "zod";

// Schema para Cliente
export const clienteSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato XXX.XXX.XXX-XX"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefone: z.string().optional(),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  ativo: z.boolean().default(true),
  statusCadastro: z.string().optional(),
  categoria: z.object({
    id: z.number(),
    nome: z.string(),
  }).optional(),
});

// Schema para Endereco
export const enderecoSchema = z.object({
  rua: z.string().min(1, "Rua é obrigatória"),
  numero: z.string().min(1, "Número é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado deve ter pelo menos 2 caracteres"),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX"),
  principal: z.boolean().default(false),
});

// Schema para Categoria
export const categoriaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  beneficios: z.string().optional(),
  ativo: z.boolean().default(true),
});

// Schema para Serviço
export const servicoSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().min(0, "Valor deve ser maior que zero"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  ativo: z.boolean().default(true),
});

// Schema para Item de Contrato
export const itemContratoSchema = z.object({
  quantidade: z.number().min(1, "Quantidade deve ser maior que zero"),
  valor: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  desconto: z.number().min(0).max(100).optional(),
  servico: z.object({
    id: z.number(),
    nome: z.string(),
    valor: z.number(),
  }),
});

// Schema para Contrato
export const contratoSchema = z.object({
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  dataFim: z.string().optional(),
  status: z.string().optional(),
  observacoes: z.string().optional(),
  cliente: z.object({
    id: z.number(),
    nome: z.string(),
  }),
  itens: z.array(itemContratoSchema).min(1, "Contrato deve ter pelo menos um item"),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;
export type EnderecoFormData = z.infer<typeof enderecoSchema>;
export type CategoriaFormData = z.infer<typeof categoriaSchema>;
export type ServicoFormData = z.infer<typeof servicoSchema>;
export type ContratoFormData = z.infer<typeof contratoSchema>;
export type ItemContratoFormData = z.infer<typeof itemContratoSchema>;