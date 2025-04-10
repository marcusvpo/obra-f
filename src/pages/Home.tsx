
import { useMemo } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, getDelayedProjects, getTotalActiveAlerts, getProjectUpdatesForToday } from "@/data/mockData";
import { Construction, AlertTriangle, BarChart, Bell, ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Home = () => {
  const resumoGeral = useMemo(() => {
    const totalObras = projects.length;
    const totalAtrasos = getDelayedProjects().length;
    const somaPercentuais = projects.reduce((total, project) => total + project.progress, 0);
    const percentualMedio = Math.round(somaPercentuais / totalObras);
    const alerts = getTotalActiveAlerts();
    const todayUpdates = getProjectUpdatesForToday();
    const totalTodayUpdates = Object.values(todayUpdates).reduce((sum, count) => sum + count, 0);
    
    return {
      totalObras,
      totalAtrasos,
      percentualMedio,
      alerts,
      totalTodayUpdates
    };
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <Card className="bg-[#444444] border-none shadow-md rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <Construction className="h-4 w-4 text-[#FF6200]" />
                <span>Obras em andamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.totalObras}</p>
              <p className="text-sm text-gray-400 mt-1">projetos ativos</p>
            </CardContent>
          </Card>

          <Card className="bg-[#444444] border-none shadow-md rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <BarChart className="h-4 w-4 text-[#FF6200]" />
                <span>Percentual médio de conclusão</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.percentualMedio}%</p>
              <p className="text-sm text-gray-400 mt-1">média geral</p>
            </CardContent>
          </Card>

          <Card className="bg-[#444444] border-none shadow-md rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-[#FF6200]" />
                <span>Obras atrasadas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.totalAtrasos}</p>
              <div className="text-sm text-gray-400 mt-1">projetos com atrasos</div>
              <Link to="/projetos?filter=delayed">
                <Button variant="link" className="text-sm text-primary p-0 h-auto mt-2 flex items-center gap-1 hover:underline">
                  Em Atraso
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="bg-[#444444] border-none shadow-md rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#FF6200]" />
                <span>Total de alertas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.alerts.total}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm text-gray-400 mt-1 cursor-help">
                      Alertas ativos que requerem atenção
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alertas ativos em todos os projetos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
          
          <Card className="bg-[#444444] border-none shadow-md rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-400 text-sm flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-[#FF6200]" />
                <span>Atualizações hoje</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#FF6200]">{resumoGeral.totalTodayUpdates}</p>
              <p className="text-sm text-gray-400 mt-1">mensagens hoje</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-[#444444] rounded-lg p-6 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Visão Geral dos Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-3">Distribuição por Status</h3>
              <div className="bg-[#333333] p-4 rounded-md">
                <div className="space-y-3">
                  <TooltipProvider>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fundações</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-white cursor-help">2 obras</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Casa 1, Edifício Solaris</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="w-full bg-[#222222] rounded-full h-2">
                        <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Estrutura</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-white cursor-help">1 obra</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Vila Premium</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="w-full bg-[#222222] rounded-full h-2">
                        <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Acabamento</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-white cursor-help">2 obras</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Condomínio Villa Verde, Hospital Regional</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="w-full bg-[#222222] rounded-full h-2">
                        <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </TooltipProvider>
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
        
        <div className="bg-[#444444] rounded-lg p-6 shadow-md rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Bell className="h-5 w-5 text-[#FF6200] mr-2" />
            Últimos Alertas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-3">Segurança</h3>
              <div className="bg-[#333333] p-4 rounded-md">
                <div className="space-y-3">
                  <div className="p-3 border-l-2 border-red-500 bg-[#3A3A3A] rounded-r-md">
                    <p className="font-medium">Edifício Solaris</p>
                    <p className="text-sm text-gray-400">Equipe sem proteção adequada para altura</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">10/04/2025</p>
                    </div>
                  </div>
                  <div className="p-3 border-l-2 border-red-500 bg-[#3A3A3A] rounded-r-md">
                    <p className="font-medium">Condomínio Villa Verde</p>
                    <p className="text-sm text-gray-400">Trabalhador sem capacete detectado</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">11/04/2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-[#BBBBBB] font-medium mb-3">Qualidade</h3>
              <div className="bg-[#333333] p-4 rounded-md">
                <div className="space-y-3">
                  <div className="p-3 border-l-2 border-yellow-500 bg-[#3A3A3A] rounded-r-md">
                    <p className="font-medium">Condomínio Villa Verde</p>
                    <p className="text-sm text-gray-400">Rachadura na fundação</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">11/04/2025</p>
                    </div>
                  </div>
                  <div className="p-3 border-l-2 border-yellow-500 bg-[#3A3A3A] rounded-r-md">
                    <p className="font-medium">Edifício Solaris</p>
                    <p className="text-sm text-gray-400">Coluna com alinhamento incorreto</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">07/04/2025</p>
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
