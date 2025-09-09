import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/types";
import { TrendingUp, Users, FileText, DollarSign, Calendar } from "lucide-react";
import { MobileCard } from "@/components/ui/mobile-card";

interface MobileDashboardProps {
  metrics: DashboardMetrics;
}

export function MobileDashboard({ metrics }: MobileDashboardProps) {
  const metricsCards = [
    {
      title: "Clientes",
      value: metrics.totalClientes,
      icon: Users,
      subtitle: `${metrics.clientesAtivos} ativos`,
      color: "text-primary",
    },
    {
      title: "Contratos",
      value: metrics.contratosAtivos,
      icon: FileText,
      subtitle: "Contratos ativos",
      color: "text-primary-glow",
    },
    {
      title: "Faturamento",
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        notation: 'compact'
      }).format(metrics.faturamentoMensal),
      icon: DollarSign,
      subtitle: "Este mês",
      color: "text-success",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      description: "Novo cliente: Ana Paula Ferreira",
      time: "2h",
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      description: "Contrato #003 pendente",
      time: "5h",
      icon: FileText,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 3,
      description: "Reunião com João Silva",
      time: "1d",
      icon: Calendar,
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="pb-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Visão geral do sistema
        </p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 gap-4">
        {metricsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold">
                      {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-primary/10`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance resumida */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Retenção</span>
            <span className="font-semibold text-success">94%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Renovações</span>
            <span className="font-semibold">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Satisfação</span>
            <span className="font-semibold text-success">4.8/5</span>
          </div>
        </CardContent>
      </Card>

      {/* Atividade recente */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time} atrás
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}