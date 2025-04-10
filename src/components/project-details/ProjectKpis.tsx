
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock, FileText, Search, PieChart, AlertTriangle, XOctagon, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface KpiData {
  activitiesPlanned: number;
  activitiesCompleted: number;
  inspectionsCount: number;
  inspectionAvgResult: number;
  wastePercentage: number;
  failuresCount: number;
  failuresByArea: {
    area: string;
    count: number;
  }[];
  reworkTimeAvg: number;
  reworkTimeGoal: number;
}

interface ProjectKpisProps {
  data: KpiData;
}

export default function ProjectKpis({ data }: ProjectKpisProps) {
  const completedPercentage = Math.round((data.activitiesCompleted / data.activitiesPlanned) * 100);
  const isWasteOverLimit = data.wastePercentage > 5;
  const isReworkTimeOverLimit = data.reworkTimeAvg > data.reworkTimeGoal;
  
  const getStatusColor = (value: number, threshold: number, inverse = false) => {
    if (inverse) {
      return value <= threshold ? "text-green-500" : "text-red-500";
    }
    return value >= threshold ? "text-green-500" : "text-red-500";
  };
  
  const getStatusIcon = (value: number, threshold: number, inverse = false) => {
    if (inverse) {
      return value <= threshold ? "✅" : "⚠️";
    }
    return value >= threshold ? "✅" : "⚠️";
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2 text-primary">
          <BarChart size={20} />
        </span>
        Indicadores-Chave (KPIs)
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI 1 - Atividades Planejadas X Concluídas */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <PieChart size={18} className="text-primary mr-2" />
              Atividades Planejadas X Concluídas
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              A administração eficiente da obra é essencial para que as atividades planejadas sejam concluídas em tempo. Este indicador mostra o andamento real versus planejado do projeto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Planejadas: {data.activitiesPlanned}</span>
                <span>Concluídas: {data.activitiesCompleted} ({completedPercentage}% ✅)</span>
              </div>
              <div className="w-full bg-[#222222] rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${completedPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 - Inspeções */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <Search size={18} className="text-primary mr-2" />
              Inspeções
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              As inspeções regulares garantem a qualidade do projeto. Monitore quantas foram realizadas e seus resultados técnicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Realizadas: {data.inspectionsCount} inspeções</span>
                <span>
                  Resultado médio: {data.inspectionAvgResult}% {getStatusIcon(data.inspectionAvgResult, 80)} 
                </span>
              </div>
              <div className="w-full bg-[#222222] rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${data.inspectionAvgResult >= 90 ? 'bg-green-500' : data.inspectionAvgResult >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${data.inspectionAvgResult}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI 3 - Desperdício de Matéria-Prima */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <FileText size={18} className="text-primary mr-2" />
              Desperdício de Matéria-Prima
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              Matéria-prima desperdiçada impacta diretamente no custo e lucratividade. Controle este indicador para eficiência financeira.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Desperdício atual: {data.wastePercentage}%</span>
                <span className={isWasteOverLimit ? "text-red-500" : "text-green-500"}>
                  {isWasteOverLimit ? "⚠️" : "✅"} (ideal {"<"} 5%)
                </span>
              </div>
              <Progress 
                value={Math.min(data.wastePercentage * 10, 100)} 
                className="h-2 bg-[#222222]"
                indicatorClassName={isWasteOverLimit ? "bg-red-500" : "bg-green-500"}
              />
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 - Falhas e Retrabalhos */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <XOctagon size={18} className="text-primary mr-2" />
              Falhas e Retrabalhos
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              Mapeie quais tarefas levam mais tempo e onde ocorrem mais falhas, buscando melhoria contínua e metas realistas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">🔴</span>
                <span>Falhas identificadas: {data.failuresCount}</span>
              </div>
              <div className="space-y-1.5">
                {data.failuresByArea.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span>{item.area}</span>
                    <div className="flex items-center">
                      <span className="mr-2">({item.count})</span>
                      <div className="w-16 h-1.5 bg-[#222222] rounded-full">
                        <div 
                          className="h-1.5 bg-primary rounded-full"
                          style={{ width: `${(item.count / data.failuresCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI 5 - Tempo para Correção dos Retrabalhos */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <Clock size={18} className="text-primary mr-2" />
              Tempo para Correção dos Retrabalhos
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              Retrabalhos são inevitáveis; o foco é resolvê-los rápido. Calcule e acompanhe o tempo médio de correção para ajustar planejamentos futuros.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Tempo médio atual: {data.reworkTimeAvg} dias</span>
                <span className={isReworkTimeOverLimit ? "text-red-500" : "text-green-500"}>
                  {isReworkTimeOverLimit ? "⚠️" : "✅"} (meta ≤ {data.reworkTimeGoal} dia)
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#222222] rounded-full">
                <div 
                  className={`h-2.5 rounded-full ${
                    data.reworkTimeAvg <= data.reworkTimeGoal ? 'bg-green-500' : 
                    data.reworkTimeAvg <= data.reworkTimeGoal * 1.5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(data.reworkTimeAvg / (data.reworkTimeGoal * 2) * 100, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
