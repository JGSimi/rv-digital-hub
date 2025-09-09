import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetricsCards } from "./DashboardMetrics";
import { DashboardMetrics } from "@/types";
import { TrendingUp, Users, FileText, Calendar } from "lucide-react";
interface DashboardProps {
  metrics: DashboardMetrics;
}
export function Dashboard({
  metrics
}: DashboardProps) {
  const recentActivity = [{
    id: 1,
    type: "cliente",
    description: "Novo cliente cadastrado: Ana Paula Ferreira",
    time: "2 horas atrás",
    icon: Users
  }, {
    id: 2,
    type: "contrato",
    description: "Contrato #003 marcado como pendente",
    time: "5 horas atrás",
    icon: FileText
  }, {
    id: 3,
    type: "reunion",
    description: "Reunião agendada com João Silva Santos",
    time: "1 dia atrás",
    icon: Calendar
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema RV Digital
        </p>
      </div>

      <DashboardMetricsCards metrics={metrics} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Resumo de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Taxa de retenção de clientes</span>
                <span className="font-semibold text-success">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contratos renovados este mês</span>
                <span className="font-semibold text-primary">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tempo médio de resposta</span>
                <span className="font-semibold">2.3h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Satisfação do cliente</span>
                <span className="font-semibold text-success">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => {
              const Icon = activity.icon;
              return <div key={activity.id} className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon className="h-3 w-3 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>;
            })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        
        
      </Card>
    </div>;
}