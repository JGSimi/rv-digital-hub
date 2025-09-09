// Utilitários para formatação de dados

export const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatCEP = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const parseCurrency = (value: string): number => {
  const numbers = value.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(numbers) || 0;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("pt-BR");
};

export const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, "");
  
  if (numbers.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numbers)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  if (parseInt(numbers[9]) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;
  
  return parseInt(numbers[10]) === digit;
};