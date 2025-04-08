
import { useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/mockData";
import { Construction, AlertTriangle, BarChart } from "lucide-react";

const Home = () => {
  const resumoGeral = useMemo(() => {
    const totalObras = projects.length;
    
    const totalAtrasos = projects.filter(project => project.delay && project.delay > 0).length;
    
    const somaPercentuais = projects.reduce((total, project) => total + project.progress, 0);
    const percentualMedio = Math.round(somaPercentuais / totalObras);
    
    return {
      totalObras,
      totalAtrasos,
      percentualMedio
    };
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#444444] border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <Construction className="h-4 w-4 text-[#FF6200]" />
                <span>Obras em andamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.totalObras}</p>
              <p className="text-sm text-gray-400 mt-1">obras ativas no sistema</p>
            </CardContent>
          </Card>

          <Card className="bg-[#444444] border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <BarChart className="h-4 w-4 text-[#FF6200]" />
                <span>Percentual médio de conclusão</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.percentualMedio}%</p>
              <p className="text-sm text-gray-400 mt-1">média de todos os projetos</p>
            </CardContent>
          </Card>

          <Card className="bg-[#444444] border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#FF6200]" />
                <span>Obras atrasadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.totalAtrasos}</p>
              <p className="text-sm text-gray-400 mt-1">projetos com atrasos relatados</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-[#444444] rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white">Visão Geral dos Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-3">Distribuição por Status</h3>
              <div className="bg-[#333333] p-4 rounded-md">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fundações</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Estrutura</span>
                      <span>1 obra</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Acabamento</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-3">Distribuição por Progresso</h3>
              <div className="bg-[#333333] p-4 rounded-md">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>0-33%</span>
                      <span>1 obra</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>34-66%</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>67-100%</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-2">
                      <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
