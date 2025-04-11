
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, CheckCircle2, Hammer, FileWarning } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/ui/chart";
import { AlertItem, DelayRiskInfo, MaintenanceItem } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectRiskInfoProps {
  delayRisk: DelayRiskInfo;
  teamProductivity: number;
  safetyAlerts: AlertItem[];
  qualityIssues: AlertItem[];
  postConstructionMaintenance: MaintenanceItem[];
  isCompleted?: boolean;
  onHandleRiskUpdated?: () => void;
  className?: string;
}

export default function ProjectRiskInfo({
  delayRisk,
  teamProductivity,
  safetyAlerts = [],
  qualityIssues = [],
  postConstructionMaintenance = [],
  isCompleted = false,
  onHandleRiskUpdated,
  className
}: ProjectRiskInfoProps) {
  const [openSafety, setOpenSafety] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  const [openMaintenance, setOpenMaintenance] = useState(false);
  
  // Categorias de falha para o gráfico
  const failureCategories = {
    "Estrutural": 35,
    "Elétrica": 25,
    "Hidráulica": 20,
    "Acabamento": 15,
    "Outros": 5
  };
  
  // Dados do gráfico de barras
  const chartData = {
    labels: Object.keys(failureCategories),
    datasets: [
      {
        data: Object.values(failureCategories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF"
        ]
      }
    ]
  };
  
  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <AlertCircle size={18} className="text-primary mr-2" />
          Falhas e Retrabalhos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico de falhas por área */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold mb-2">Distribuição de Falhas por Área</h3>
            <div className="h-56">
              <BarChart 
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      enabled: true
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        display: false
                      },
                      ticks: {
                        font: {
                          size: 10
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      },
                      ticks: {
                        font: {
                          size: 10
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          
          {/* Lista de alertas e problemas */}
          <div className="space-y-6">
            {/* Risco de Atraso */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Risco de Atraso</h3>
              <Alert className={`bg-opacity-20 ${delayRisk.percentage > 60 ? 'bg-red-900 border-red-800' : delayRisk.percentage > 30 ? 'bg-yellow-900 border-yellow-800' : 'bg-green-900 border-green-800'}`}>
                <AlertIcon className={delayRisk.percentage > 60 ? 'text-red-500' : delayRisk.percentage > 30 ? 'text-yellow-500' : 'text-green-500'} />
                <AlertTitle className="text-sm">
                  {delayRisk.percentage > 60 ? 'Risco Alto' : delayRisk.percentage > 30 ? 'Risco Moderado' : 'Risco Baixo'}
                </AlertTitle>
                <AlertDescription className="text-xs">
                  {delayRisk.reason} ({delayRisk.days} dias)
                </AlertDescription>
              </Alert>
            </div>
            
            {/* Produtividade da Equipe */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Produtividade da Equipe</h3>
              <div className="bg-secondary/50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">Produtividade</span>
                  <span className="text-xs font-medium">{teamProductivity}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      teamProductivity >= 75 ? 'bg-green-500' : 
                      teamProductivity >= 50 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${teamProductivity}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-2 text-muted-foreground">
                  {teamProductivity >= 75 ? 'Excelente rendimento da equipe' : 
                   teamProductivity >= 50 ? 'Bom rendimento, com espaço para melhorias' : 
                   'Rendimento abaixo do esperado, necessita atenção'}
                </p>
              </div>
            </div>
            
            {/* Seção de Alertas de Segurança */}
            <Collapsible open={openSafety} onOpenChange={setOpenSafety} className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Alertas de Segurança</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <span className="sr-only">Toggle</span>
                    <FileWarning size={16} className={openSafety ? 'text-primary' : 'text-muted-foreground'} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-2">
                {safetyAlerts.length > 0 ? (
                  <ul className="space-y-2">
                    {safetyAlerts.map((alert, index) => (
                      <li key={index} className="bg-red-900/20 border border-red-800/40 p-2 rounded-md">
                        <div className="flex items-start">
                          <AlertCircle className="text-red-500 mr-2 mt-1" size={14} />
                          <div>
                            <p className="text-xs font-medium">{alert.title}</p>
                            <p className="text-xs text-muted-foreground">{alert.date}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">Nenhum alerta de segurança registrado</p>
                )}
              </CollapsibleContent>
            </Collapsible>
            
            {/* Seção de Problemas de Qualidade */}
            <Collapsible open={openQuality} onOpenChange={setOpenQuality} className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Problemas de Qualidade</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <span className="sr-only">Toggle</span>
                    <Hammer size={16} className={openQuality ? 'text-primary' : 'text-muted-foreground'} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-2">
                {qualityIssues.length > 0 ? (
                  <ul className="space-y-2">
                    {qualityIssues.map((issue, index) => (
                      <li key={index} className="bg-amber-900/20 border border-amber-800/40 p-2 rounded-md">
                        <div className="flex items-start">
                          <AlertCircle className="text-amber-500 mr-2 mt-1" size={14} />
                          <div>
                            <p className="text-xs font-medium">{issue.title}</p>
                            <p className="text-xs text-muted-foreground">{issue.date}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">Nenhum problema de qualidade registrado</p>
                )}
              </CollapsibleContent>
            </Collapsible>
            
            {/* Manutenção Pós-construção */}
            {isCompleted && (
              <Collapsible open={openMaintenance} onOpenChange={setOpenMaintenance} className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Manutenção Pós-construção</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <span className="sr-only">Toggle</span>
                      <Calendar size={16} className={openMaintenance ? 'text-primary' : 'text-muted-foreground'} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="mt-2">
                  {postConstructionMaintenance.length > 0 ? (
                    <ul className="space-y-2">
                      {postConstructionMaintenance.map((maintenance, index) => (
                        <li 
                          key={index} 
                          className={`p-2 rounded-md flex items-start ${
                            maintenance.isCompleted 
                              ? 'bg-green-900/20 border border-green-800/40' 
                              : 'bg-blue-900/20 border border-blue-800/40'
                          }`}
                        >
                          <CheckCircle2 
                            className={maintenance.isCompleted ? 'text-green-500 mr-2 mt-1' : 'text-blue-500 mr-2 mt-1'} 
                            size={14} 
                          />
                          <div>
                            <p className="text-xs font-medium">{maintenance.title}</p>
                            <p className="text-xs text-muted-foreground">Previsto: {maintenance.date}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">Nenhuma manutenção programada</p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
