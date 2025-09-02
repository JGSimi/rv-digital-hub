import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cliente } from "@/types";
import { Search, Plus, Edit, Mail, Phone, MapPin } from "lucide-react";

interface ClientesListProps {
  clientes: Cliente[];
  onClienteSelect: (cliente: Cliente) => void;
  onNovoCliente: () => void;
}

export function ClientesList({ clientes, onClienteSelect, onNovoCliente }: ClientesListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm) ||
    cliente.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Clientes</h2>
          <p className="text-muted-foreground">
            Gerencie todos os clientes da RV Digital
          </p>
        </div>
        <Button onClick={onNovoCliente} className="shadow-elegant">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome, CPF ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredClientes.map((cliente) => (
          <Card 
            key={cliente.id} 
            className="hover:shadow-elegant transition-all duration-300 cursor-pointer group"
            onClick={() => onClienteSelect(cliente)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {cliente.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    CPF: {cliente.cpf}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={cliente.ativo ? "default" : "secondary"}>
                    {cliente.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                  {cliente.categoria && (
                    <Badge variant="outline">{cliente.categoria.nome}</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {cliente.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {cliente.email}
                  </div>
                )}
                {cliente.telefone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {cliente.telefone}
                  </div>
                )}
                {cliente.enderecos && cliente.enderecos.length > 0 && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {cliente.enderecos[0].cidade}, {cliente.enderecos[0].estado}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-muted-foreground">
                  Nascimento: {new Date(cliente.dataNascimento).toLocaleDateString('pt-BR')}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClienteSelect(cliente);
                  }}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm ? "Nenhum cliente encontrado com os critérios de busca." : "Nenhum cliente cadastrado ainda."}
            </p>
            <Button 
              variant="outline" 
              onClick={onNovoCliente}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeiro Cliente
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}