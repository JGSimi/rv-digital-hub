import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ClientesList } from "@/components/clientes/ClientesList";
import { ContratosListWithCRUD } from "@/components/contratos/ContratosListWithCRUD";
import { ServicosListWithCRUD } from "@/components/servicos/ServicosListWithCRUD";
import { CategoriasListWithCRUD } from "@/components/categorias/CategoriasListWithCRUD";
import { 
  mockClientes, 
  mockContratos, 
  mockServicos, 
  mockCategorias, 
  mockDashboardMetrics 
} from "@/data/mockData";
import { Cliente, Contrato, Servico, Categoria } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { toast } = useToast();

  const handleClienteSelect = (cliente: Cliente) => {
    toast({
      title: "Cliente selecionado",
      description: `Visualizando dados de ${cliente.nome}`,
    });
  };

  const handleNovoCliente = () => {
    toast({
      title: "Novo Cliente",
      description: "Funcionalidade de cadastro será implementada em breve",
    });
  };

  const handleContratoSelect = (contrato: Contrato) => {
    toast({
      title: "Contrato selecionado",
      description: `Visualizando contrato #${contrato.id}`,
    });
  };

  const handleNovoContrato = () => {
    toast({
      title: "Novo Contrato",
      description: "Funcionalidade de criação será implementada em breve",
    });
  };

  const handleServicoSelect = (servico: Servico) => {
    toast({
      title: "Serviço selecionado",
      description: `Visualizando ${servico.nome}`,
    });
  };

  const handleNovoServico = () => {
    toast({
      title: "Novo Serviço",
      description: "Funcionalidade de cadastro será implementada em breve",
    });
  };

  const handleCategoriaSelect = (categoria: Categoria) => {
    toast({
      title: "Categoria selecionada",
      description: `Visualizando categoria ${categoria.nome}`,
    });
  };

  const handleNovaCategoria = () => {
    toast({
      title: "Nova Categoria",
      description: "Funcionalidade de criação será implementada em breve",
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard metrics={mockDashboardMetrics} />;
      case "clientes":
        return (
          <ClientesList
            clientes={mockClientes}
            onClienteSelect={handleClienteSelect}
            onNovoCliente={handleNovoCliente}
          />
        );
      case "contratos":
        return (
          <ContratosListWithCRUD
            contratos={mockContratos}
            onContratoSelect={handleContratoSelect}
            onNovoContrato={handleNovoContrato}
          />
        );
      case "servicos":
        return (
          <ServicosListWithCRUD
            servicos={mockServicos}
            onServicoSelect={handleServicoSelect}
            onNovoServico={handleNovoServico}
          />
        );
      case "categorias":
        return (
          <CategoriasListWithCRUD
            categorias={mockCategorias}
            onCategoriaSelect={handleCategoriaSelect}
            onNovaCategoria={handleNovaCategoria}
          />
        );
      case "configuracoes":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Configurações</h2>
              <p className="text-muted-foreground">
                Configurações do sistema serão implementadas em breve
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard metrics={mockDashboardMetrics} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;