import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { formatCPF, formatPhone, formatCEP } from "@/utils/formatters";

interface MaskedInputProps extends React.ComponentProps<typeof Input> {
  mask: "cpf" | "phone" | "cep" | "currency";
  onValueChange?: (value: string) => void;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      
      switch (mask) {
        case "cpf":
          value = formatCPF(value);
          break;
        case "phone":
          value = formatPhone(value);
          break;
        case "cep":
          value = formatCEP(value);
          break;
        case "currency":
          // Remove tudo exceto números e vírgula
          value = value.replace(/[^\d,]/g, "");
          break;
      }
      
      // Atualiza o valor do input
      e.target.value = value;
      
      if (onValueChange) {
        onValueChange(value);
      }
      
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <Input
        ref={ref}
        {...props}
        onChange={handleChange}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";