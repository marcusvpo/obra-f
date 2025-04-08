
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Download, FileText } from "lucide-react";
import { projects } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Relatorios = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const metrics = [
    { id: "progress", label: "Percentual de conclusão" },
    { id: "delays", label: "Atrasos" },
    { id: "hours", label: "Horas trabalhadas" },
    { id: "materials", label: "Consumo de materiais" },
    { id: "photos", label: "Fotos" },
  ];

  const handleToggleProject = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleToggleMetric = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleGenerateReport = (type: "semanal" | "mensal", projectId: string) => {
    toast.success(`Relatório ${type} para ${projects.find(p => p.id === projectId)?.name} gerado com sucesso!`);
  };

  const handleGenerateCustomReport = () => {
    if (!startDate || !endDate) {
      toast.error("Selecione um período para o relatório");
      return;
    }

    if (selectedProjects.length === 0) {
      toast.error("Selecione pelo menos um projeto");
      return;
    }

    if (selectedMetrics.length === 0) {
      toast.error("Selecione pelo menos uma métrica");
      return;
    }

    toast.success("Relatório personalizado gerado com sucesso!");
  };

  return (
    <AppLayout title="Relatórios">
      <div className="max-w-7xl mx-auto space-y-8">
        <Tabs defaultValue="automaticos" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="automaticos">Relatórios Automáticos</TabsTrigger>
            <TabsTrigger value="personalizados">Relatórios Personalizados</TabsTrigger>
          </TabsList>

          <TabsContent value="automaticos">
            <Card className="bg-card border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Relatórios Automáticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between border-b border-[#444444] pb-4">
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-400">Progresso: {project.progress}%</p>
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleGenerateReport("semanal", project.id)} 
                          variant="outline"
                          className="border-[#FF6200] text-[#FF6200] hover:bg-[#FF6200] hover:text-white"
                        >
                          <FileText size={16} className="mr-2" />
                          Semanal
                        </Button>
                        <Button 
                          onClick={() => handleGenerateReport("mensal", project.id)}
                          className="bg-[#FF6200] text-white hover:bg-[#FF6200]/80"
                        >
                          <FileText size={16} className="mr-2" />
                          Mensal
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personalizados">
            <Card className="bg-card border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Relatórios Personalizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-3">Período</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3 items-center">
                        <Calendar size={20} className="text-[#FF6200]" />
                        <div className="grid grid-cols-2 gap-3 flex-1">
                          <div>
                            <Label htmlFor="startDate">Data Inicial</Label>
                            <Input 
                              id="startDate"
                              type="date" 
                              value={startDate} 
                              onChange={(e) => setStartDate(e.target.value)}
                              className="bg-[#333333] border-none"
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">Data Final</Label>
                            <Input 
                              id="endDate"
                              type="date" 
                              value={endDate} 
                              onChange={(e) => setEndDate(e.target.value)}
                              className="bg-[#333333] border-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-medium mb-3 mt-6">Métricas</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {metrics.map(metric => (
                        <div key={metric.id} className="flex items-center gap-2">
                          <Checkbox 
                            id={`metric-${metric.id}`}
                            checked={selectedMetrics.includes(metric.id)}
                            onCheckedChange={() => handleToggleMetric(metric.id)}
                            className="data-[state=checked]:bg-[#FF6200] data-[state=checked]:border-[#FF6200]"
                          />
                          <Label htmlFor={`metric-${metric.id}`}>{metric.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Projetos</h3>
                    <div className="bg-[#333333] p-4 rounded-md max-h-[300px] overflow-y-auto">
                      <div className="space-y-3">
                        {projects.map(project => (
                          <div key={project.id} className="flex items-center gap-2">
                            <Checkbox 
                              id={`project-${project.id}`}
                              checked={selectedProjects.includes(project.id)}
                              onCheckedChange={() => handleToggleProject(project.id)}
                              className="data-[state=checked]:bg-[#FF6200] data-[state=checked]:border-[#FF6200]"
                            />
                            <Label htmlFor={`project-${project.id}`}>{project.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={handleGenerateCustomReport} 
                    className="bg-[#FF6200] text-white hover:bg-[#FF6200]/80"
                  >
                    <Download size={18} className="mr-2" />
                    Gerar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Relatorios;
