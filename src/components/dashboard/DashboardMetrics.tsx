import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, DollarSign, TrendingUp } from "lucide-react";
import { DashboardMetrics } from "@/types";

interface DashboardMetricsProps {
  metrics: DashboardMetrics;
}

export function DashboardMetricsCards({ metrics }: DashboardMetricsProps) {
  const cards = [
    {
      title: "Total de Clientes",
      value: metrics.totalClientes,
      icon: Users,
      trend: "+12% em relação ao mês anterior",
      color: "text-primary",
    },
    {
      title: "Clientes Ativos",
      value: metrics.clientesAtivos,
      icon: TrendingUp,
      trend: `${Math.round((metrics.clientesAtivos / metrics.totalClientes) * 100)}% do total`,
      color: "text-success",
    },
    {
      title: "Contratos Ativos",
      value: metrics.contratosAtivos,
      icon: FileText,
      trend: "+8% em relação ao mês anterior",
      color: "text-primary-glow",
    },
    {
      title: "Faturamento Mensal",
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(metrics.faturamentoMensal),
      icon: DollarSign,
      trend: "+15% em relação ao mês anterior",
      color: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {card.trend}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}