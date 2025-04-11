
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock, FileText, Search, PieChart, AlertTriangle, XOctagon } from "lucide-react";
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
}

interface ProjectKpisProps {
  data: KpiData;
}

export default function ProjectKpis({ data }: ProjectKpisProps) {
  const completedPercentage = Math.round((data.activitiesCompleted / data.activitiesPlanned) * 100);
  const isWasteOverLimit = data.wastePercentage > 5;
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2 text-primary">
          <BarChart size={20} className="animate-pulse" />
        </span>
        Indicadores-Chave (KPIs)
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI 1 - Atividades Planejadas X Concluídas */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <PieChart size={18} className="text-primary mr-2" />
              Atividades Planejadas X Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Planejadas: {data.activitiesPlanned}</span>
                <span>Concluídas: {data.activitiesCompleted} ({completedPercentage}% ✓)</span>
              </div>
              <div className="w-full bg-[#222222] rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${completedPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 - Inspeções */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <Search size={18} className="text-primary mr-2" />
              Inspeções
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Realizadas: {data.inspectionsCount} inspeções</span>
                <span>
                  Média de qualidade: {data.inspectionAvgResult}%
                </span>
              </div>
              <div className="w-full bg-[#222222] rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ease-out ${data.inspectionAvgResult >= 90 ? 'bg-green-500' : data.inspectionAvgResult >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${data.inspectionAvgResult}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI 3 - Desperdício */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <FileText size={18} className="text-primary mr-2" />
              Desperdício
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Desperdício atual: {data.wastePercentage}%</span>
                <span className={isWasteOverLimit ? "text-red-500" : "text-green-500"}>
                  {isWasteOverLimit ? "⚠" : "✓"} (ideal: menor que 5%)
                </span>
              </div>
              <Progress 
                value={Math.min(data.wastePercentage * 10, 100)} 
                className="h-2 bg-[#222222]"
                indicatorClassName={isWasteOverLimit ? "bg-red-500 transition-all duration-500 ease-out" : "bg-green-500 transition-all duration-500 ease-out"}
              />
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 - Falhas e Retrabalhos */}
        <Card className="bg-[#3A3A3A] border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <XOctagon size={18} className="text-primary mr-2" />
              Falhas e Retrabalhos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-red-500 mr-1">●</span>
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
                          className="h-1.5 bg-primary rounded-full transition-all duration-500 ease-out"
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
      </div>
    </div>
  );
}
