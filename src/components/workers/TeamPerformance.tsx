
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Users } from "lucide-react";
import WorkerPerformanceCard from "./WorkerPerformanceCard";
import { TeamMember } from "@/types/worker";
import { getWorkerPerformance } from "@/data/workerPerformanceData";

interface TeamPerformanceProps {
  teamMembers: TeamMember[];
}

const TeamPerformance = ({ teamMembers }: TeamPerformanceProps) => {
  const [activeView, setActiveView] = useState("cards");
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("name");
  
  useEffect(() => {
    // Adicionar dados de performance aos membros da equipe
    const membersWithPerformance = teamMembers.map(member => ({
      ...member,
      performance: getWorkerPerformance(member.id),
      currentProject: ["Residencial Vila Nova", "Edifício Comercial Centro", "Reforma Hospital", "Condomínio Parque Verde"][Math.floor(Math.random() * 4)],
      photoUrl: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${parseInt(member.id) + 10}.jpg`
    }));
    
    let sorted = [...membersWithPerformance];
    
    // Aplicar ordenação
    if (sortOrder === "name") {
      sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (sortOrder === "performance-high") {
      sorted.sort((a, b) => (b.performance?.productivityIndex || 0) - (a.performance?.productivityIndex || 0));
    } else if (sortOrder === "performance-low") {
      sorted.sort((a, b) => (a.performance?.productivityIndex || 0) - (b.performance?.productivityIndex || 0));
    }
    
    // Aplicar filtro de pesquisa
    if (searchQuery) {
      sorted = sorted.filter(member => 
        member.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.currentProject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.numero.includes(searchQuery)
      );
    }
    
    setFilteredMembers(sorted);
  }, [teamMembers, searchQuery, sortOrder]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="flex items-center gap-2">
          <Users size={24} className="text-[#FF6200]" />
          <h2 className="text-xl font-bold">Desempenho da Equipe</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar trabalhador..."
              className="pl-8 bg-[#333333] border-[#555555]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-[180px] bg-[#333333] border-[#555555]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] border-[#555555]">
              <SelectItem value="name">Nome (A-Z)</SelectItem>
              <SelectItem value="performance-high">Melhor Desempenho</SelectItem>
              <SelectItem value="performance-low">Menor Desempenho</SelectItem>
            </SelectContent>
          </Select>
          
          <Tabs 
            value={activeView} 
            onValueChange={setActiveView}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-[#333333] w-full sm:w-auto">
              <TabsTrigger value="cards" className="flex-1">Cards</TabsTrigger>
              <TabsTrigger value="table" className="flex-1">Tabela</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Separator className="bg-[#555555]" />
      
      <Tabs value={activeView} className="w-full">
        <TabsContent value="cards" className="mt-0">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMembers.map((worker) => (
                <WorkerPerformanceCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <Card className="bg-[#444444] border-0">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">Nenhum trabalhador encontrado com os critérios de busca.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="table" className="mt-0">
          <Card className="bg-[#444444] border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#333333]">
                    <th className="px-4 py-3 text-left">Trabalhador</th>
                    <th className="px-4 py-3 text-left">Projeto Atual</th>
                    <th className="px-4 py-3 text-center">Tarefas Concluídas</th>
                    <th className="px-4 py-3 text-center">Não Realizadas</th>
                    <th className="px-4 py-3 text-center">Pendentes</th>
                    <th className="px-4 py-3 text-center">Produtividade</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((worker) => (
                      <tr key={worker.id} className="border-t border-[#555555] hover:bg-[#3a3a3a]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#666666] overflow-hidden">
                              {worker.photoUrl ? (
                                <img 
                                  src={worker.photoUrl} 
                                  alt={worker.nome} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-xs font-medium">
                                  {worker.nome.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{worker.nome}</div>
                              <div className="text-xs text-gray-400">{worker.numero}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{worker.currentProject || "-"}</td>
                        <td className="px-4 py-3 text-center font-medium text-green-400">
                          {worker.performance?.completedTasks || 0}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-red-400">
                          {worker.performance?.failedTasks || 0}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-yellow-400">
                          {worker.performance?.pendingTasks || 0}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-24 bg-[#333333] h-2 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  (worker.performance?.productivityIndex || 0) >= 80 ? 'bg-green-500' : 
                                  (worker.performance?.productivityIndex || 0) >= 60 ? 'bg-yellow-500' : 
                                  'bg-red-500'
                                }`} 
                                style={{ width: `${worker.performance?.productivityIndex || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {worker.performance?.productivityIndex || 0}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                        Nenhum trabalhador encontrado com os critérios de busca.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPerformance;
