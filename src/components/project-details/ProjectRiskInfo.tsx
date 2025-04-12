
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Calendar, CheckCircle2, Hammer, FileWarning } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { AlertItem, DelayRiskInfo, MaintenanceItem } from "@/types/project";
import { cn } from "@/lib/utils";
import { Bar } from "recharts";

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
  
  return (
    <Card className={cn("shadow-md hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <AlertCircle size={16} className="text-primary mr-2" />
          Falhas e Retrabalhos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="grid grid-cols-1 gap-3">
          {/* Gráfico de falhas por área - versão compacta */}
          <div>
            <h3 className="text-xs font-semibold mb-1">Falhas por Área</h3>
            <div className="h-32">
              <ChartContainer 
                config={{}}
                className="h-full w-full"
              >
                <Bar 
                  data={Object.entries(failureCategories).map(([name, value]) => ({
                    name,
                    value
                  }))}
                  dataKey="value"
                  fill="#8884d8"
                />
              </ChartContainer>
            </div>
          </div>
          
          {/* Risco de Atraso - versão compacta */}
          <div>
            <h3 className="text-xs font-semibold mb-1">Risco de Atraso</h3>
            <Alert className={`py-2 px-3 bg-opacity-20 ${delayRisk.percentage > 60 ? 'bg-red-900 border-red-800' : delayRisk.percentage > 30 ? 'bg-yellow-900 border-yellow-800' : 'bg-green-900 border-green-800'}`}>
              <div className="flex items-center gap-2">
                <AlertCircle className={`h-4 w-4 ${delayRisk.percentage > 60 ? 'text-red-500' : delayRisk.percentage > 30 ? 'text-yellow-500' : 'text-green-500'}`} />
                <div>
                  <AlertTitle className="text-xs">
                    {delayRisk.percentage > 60 ? 'Risco Alto' : delayRisk.percentage > 30 ? 'Risco Moderado' : 'Risco Baixo'}
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    {delayRisk.reason} ({delayRisk.days} dias)
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </div>
          
          {/* Produtividade da Equipe - versão compacta */}
          <div>
            <h3 className="text-xs font-semibold mb-1">Produtividade</h3>
            <div className="bg-secondary/50 p-2 rounded-md">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Equipe</span>
                <span className="text-xs font-medium">{teamProductivity}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    teamProductivity >= 75 ? 'bg-green-500' : 
                    teamProductivity >= 50 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${teamProductivity}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Seções colapsáveis - versão compacta */}
          <div className="space-y-2">
            {/* Alertas de Segurança */}
            <Collapsible open={openSafety} onOpenChange={setOpenSafety} className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold">Alertas de Segurança</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <span className="sr-only">Toggle</span>
                    <FileWarning size={14} className={openSafety ? 'text-primary' : 'text-muted-foreground'} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-1">
                {safetyAlerts.length > 0 ? (
                  <ul className="space-y-1">
                    {safetyAlerts.map((alert, index) => (
                      <li key={index} className="bg-red-900/20 border border-red-800/40 p-1 text-xs rounded-md">
                        {alert.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">Nenhum alerta</p>
                )}
              </CollapsibleContent>
            </Collapsible>
            
            {/* Problemas de Qualidade */}
            <Collapsible open={openQuality} onOpenChange={setOpenQuality} className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold">Problemas de Qualidade</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <span className="sr-only">Toggle</span>
                    <Hammer size={14} className={openQuality ? 'text-primary' : 'text-muted-foreground'} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-1">
                {qualityIssues.length > 0 ? (
                  <ul className="space-y-1">
                    {qualityIssues.map((issue, index) => (
                      <li key={index} className="bg-amber-900/20 border border-amber-800/40 p-1 text-xs rounded-md">
                        {issue.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">Nenhum problema</p>
                )}
              </CollapsibleContent>
            </Collapsible>
            
            {/* Manutenção Pós-construção */}
            {isCompleted && (
              <Collapsible open={openMaintenance} onOpenChange={setOpenMaintenance} className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold">Manutenção Pós-construção</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <span className="sr-only">Toggle</span>
                      <Calendar size={14} className={openMaintenance ? 'text-primary' : 'text-muted-foreground'} />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="mt-1">
                  {postConstructionMaintenance.length > 0 ? (
                    <ul className="space-y-1">
                      {postConstructionMaintenance.map((maintenance, index) => (
                        <li 
                          key={index} 
                          className={`p-1 text-xs rounded-md ${
                            maintenance.isCompleted 
                              ? 'bg-green-900/20 border border-green-800/40' 
                              : 'bg-blue-900/20 border border-blue-800/40'
                          }`}
                        >
                          {maintenance.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">Nenhuma manutenção</p>
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
