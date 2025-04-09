
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, getDelayedProjects } from "@/data/mockData";
import { Construction, AlertTriangle, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  const resumoGeral = {
    totalObras: projects.length,
    totalAtrasos: getDelayedProjects().length,
    percentualMedio: Math.round(projects.reduce((total, project) => total + project.progress, 0) / projects.length)
  };

  return (
    <AppLayout title="Dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#444444] border-none shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-gray-400 text-xs flex items-center gap-2">
                <Construction className="h-4 w-4 text-[#FF6200]" />
                <span>Obras em andamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#FF6200]">{resumoGeral.totalObras}</p>
              <p className="text-xs text-gray-400 mt-1">obras ativas no sistema</p>
            </CardContent>
          </Card>

          <Card className="bg-[#444444] border-none shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-gray-400 text-xs flex items-center gap-2">
                <BarChart className="h-4 w-4 text-[#FF6200]" />
                <span>Percentual médio de conclusão</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#FF6200]">{resumoGeral.percentualMedio}%</p>
              <p className="text-xs text-gray-400 mt-1">média de todos os projetos</p>
            </CardContent>
          </Card>

          <Card className="bg-[#444444] border-none shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-gray-400 text-xs flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#FF6200]" />
                <span>Obras atrasadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <p className="text-3xl font-bold text-[#FF6200]">{resumoGeral.totalAtrasos}</p>
              <div className="text-xs text-gray-400 mt-1">projetos com atrasos relatados</div>
              <Link to="/projetos?filter=delayed">
                <Button variant="link" className="text-xs text-primary p-0 h-auto mt-1">
                  Ver projetos atrasados →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 bg-[#444444] rounded-md p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-white">Visão Geral dos Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-2 text-sm">Distribuição por Status</h3>
              <div className="bg-[#333333] p-3 rounded-md">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Fundações</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-1.5">
                      <div className="bg-[#FF6200] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Estrutura</span>
                      <span>1 obra</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-1.5">
                      <div className="bg-[#FF6200] h-1.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Acabamento</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-1.5">
                      <div className="bg-[#FF6200] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-2 text-sm">Distribuição por Progresso</h3>
              <div className="bg-[#333333] p-3 rounded-md">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>0-33%</span>
                      <span>1 obra</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-1.5">
                      <div className="bg-[#FF6200] h-1.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>34-66%</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-1.5">
                      <div className="bg-[#FF6200] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>67-100%</span>
                      <span>2 obras</span>
                    </div>
                    <div className="w-full bg-[#222222] rounded-full h-1.5">
                      <div className="bg-[#FF6200] h-1.5 rounded-full" style={{ width: '40%' }}></div>
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
