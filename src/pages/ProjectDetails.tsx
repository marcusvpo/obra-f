import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, MapPin, Check, AlertCircle } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import TimelineItem from "@/components/dashboard/TimelineItem";
import PhotoGallery from "@/components/dashboard/PhotoGallery";
import BudgetIndicator from "@/components/dashboard/BudgetIndicator";
import RiskIndicator from "@/components/dashboard/RiskIndicator";
import AlertList from "@/components/dashboard/AlertList";
import ProductivityIndicator from "@/components/dashboard/ProductivityIndicator";
import MaintenanceList from "@/components/dashboard/MaintenanceList";
import { 
  getProjectDetails, updateProjectStatus, updateCompletionDate, 
  updateProjectInfo, updateProjectName, updateWorkedHours, updateObservations 
} from "@/data/mockData";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusFormData {
  status: string;
}

interface DateFormData {
  completionDate: string;
}

interface InfoFormData {
  managerName: string;
  managerPhone: string;
  address: string;
}

interface NameFormData {
  name: string;
}

interface HoursFormData {
  hoursWorked: string;
}

interface ObservationsFormData {
  observations: string;
}

interface EditFormData {
  name: string;
  status: string;
}

const materialsMock = {
  cimento: { usado: 50, planejado: 100 },
  areia: { usado: 200, planejado: 300 },
  tijolos: { usado: 12000, planejado: 15000 },
  ferro: { usado: 850, planejado: 800 }
};

const tarefasPendentesMock = [
  'Falta concluir pilares - Reportado em 11/04',
  'Comprar mais cimento - Reportado em 12/04',
  'Revisar instalações elétricas - Reportado em 13/04'
];

const historicoAtrasosMock = [
  '10/04: Atraso de 2 horas - Chuva',
  '12/04: Atraso de 1 dia - Falta de material',
  '14/04: Atraso de 3 horas - Problema com fornecedor'
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [hoursDialogOpen, setHoursDialogOpen] = useState(false);
  const [observationsDialogOpen, setObservationsDialogOpen] = useState(false);
  
  const [materiais, setMateriais] = useState(materialsMock);
  const [tarefasPendentes, setTarefasPendentes] = useState(tarefasPendentesMock);
  const [historicoAtrasos, setHistoricoAtrasos] = useState(historicoAtrasosMock);
  
  const editForm = useForm<EditFormData>();
  const dateForm = useForm<DateFormData>();
  const infoForm = useForm<InfoFormData>();
  const hoursForm = useForm<HoursFormData>();
  const observationsForm = useForm<ObservationsFormData>();
  
  useEffect(() => {
    if (!id) return;
    
    const projectData = getProjectDetails(id);
    if (!projectData) {
      toast.error("Projeto não encontrado");
      navigate("/");
      return;
    }
    
    setProject(projectData);
    
    editForm.reset({ 
      name: projectData.name,
      status: projectData.status 
    });
    dateForm.reset({ completionDate: projectData.estimatedCompletionDate });
    infoForm.reset({
      managerName: projectData.managerName,
      managerPhone: projectData.managerPhone,
      address: projectData.address
    });
    hoursForm.reset({ hoursWorked: projectData.hoursWorked });
    observationsForm.reset({ observations: projectData.observations || "" });
    
    if (projectData) {
      const viewedProjects = JSON.parse(localStorage.getItem("viewedProjects") || "{}");
      viewedProjects[projectData.id] = true;
      localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects));
    }
  }, [id, navigate]);
  
  useEffect(() => {
    if (project) {
      const buttonContainer = document.getElementById('page-specific-buttons');
      if (buttonContainer) {
        const editButton = document.createElement('button');
        editButton.className = 'bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/80';
        editButton.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Editar</span>';
        editButton.onclick = () => setEditDialogOpen(true);
        
        buttonContainer.innerHTML = '';
        buttonContainer.appendChild(editButton);
      }
    }

    return () => {
      const buttonContainer = document.getElementById('page-specific-buttons');
      if (buttonContainer) {
        buttonContainer.innerHTML = '';
      }
    };
  }, [project]);
  
  if (!project) return null;
  
  const handleExportReport = () => {
    toast.success("Relatório gerado com sucesso!");
  };

  const handleConcluirTarefa = (index: number) => {
    setTarefasPendentes(prev => prev.filter((_, i) => i !== index));
    toast.success("Tarefa marcada como concluída!");
  };
  
  const onEditSubmit = (data: EditFormData) => {
    updateProjectName(project.id, data.name);
    updateProjectStatus(project.id, data.status);
    setEditDialogOpen(false);
    
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name: data.name,
        status: data.status,
        lastUpdate: new Date().toLocaleDateString('pt-BR')
      };
    });
    
    toast.success("Projeto atualizado com sucesso!");
  };
  
  const onDateSubmit = (data: DateFormData) => {
    updateCompletionDate(project.id, data.completionDate);
    setDateDialogOpen(false);
    
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        estimatedCompletionDate: data.completionDate
      };
    });
    
    toast.success("Data de conclusão atualizada com sucesso!");
  };
  
  const onInfoSubmit = (data: InfoFormData) => {
    updateProjectInfo(project.id, {
      managerName: data.managerName,
      managerPhone: data.managerPhone,
      address: data.address
    });
    setInfoDialogOpen(false);
    
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        managerName: data.managerName,
        managerPhone: data.managerPhone,
        address: data.address
      };
    });
    
    toast.success("Informações atualizadas com sucesso!");
  };
  
  const onHoursSubmit = (data: HoursFormData) => {
    updateWorkedHours(project.id, data.hoursWorked);
    setHoursDialogOpen(false);
    
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        hoursWorked: data.hoursWorked
      };
    });
    
    toast.success("Horas trabalhadas atualizadas com sucesso!");
  };
  
  const onObservationsSubmit = (data: ObservationsFormData) => {
    updateObservations(project.id, data.observations);
    setObservationsDialogOpen(false);
    
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        observations: data.observations
      };
    });
    
    toast.success("Observações atualizadas com sucesso!");
  };

  const handleResolveAlert = (index: number, type: 'safety' | 'quality') => {
    if (!project) return;
    
    let updatedProject = { ...project };
    if (type === 'safety' && updatedProject.safetyAlerts) {
      updatedProject.safetyAlerts = updatedProject.safetyAlerts.filter((_, i) => i !== index);
    } else if (type === 'quality' && updatedProject.qualityIssues) {
      updatedProject.qualityIssues = updatedProject.qualityIssues.filter((_, i) => i !== index);
    }
    
    setProject(updatedProject);
    toast.success(`Alerta resolvido com sucesso!`);
  };

  const handleCompleteMaintenance = (index: number) => {
    if (!project || !project.postConstructionMaintenance) return;
    
    const updatedProject = { ...project };
    updatedProject.postConstructionMaintenance = updatedProject.postConstructionMaintenance.filter((_, i) => i !== index);
    setProject(updatedProject);
    toast.success("Tarefa de manutenção concluída!");
  };
  
  return (
    <AppLayout 
      title={project.name}
      showBackButton={true}
      onBackClick={() => navigate("/projetos")}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {project.photos && project.photos.length > 0 && (
          <div className="bg-card p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Última Foto do Projeto</h2>
            <div className="flex justify-center">
              <img 
                src={project.photos[project.photos.length - 1].url} 
                alt="Última foto do projeto" 
                className="max-h-[400px] rounded-md object-contain"
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <KpiCard 
              title="Data de Conclusão" 
              value={project.estimatedCompletionDate}
              icon={<Calendar size={24} className="text-primary" />}
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setDateDialogOpen(true)}
              className="absolute top-3 right-3 h-6 p-1 hover:bg-primary/20"
            >
              <Edit size={14} />
            </Button>
          </div>
          <div className="relative">
            <KpiCard 
              title="Horas Trabalhadas" 
              value={project.hoursWorked}
              icon={<Clock size={24} className="text-primary" />}
            />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setHoursDialogOpen(true)}
              className="absolute top-3 right-3 h-6 p-1 hover:bg-primary/20"
            >
              <Edit size={14} />
            </Button>
          </div>
        </div>
        
        {project.budget && (
          <BudgetIndicator 
            planned={project.budget.planned} 
            estimated={project.budget.estimated} 
          />
        )}

        {project.delayRisk && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <RiskIndicator 
              percentage={project.delayRisk.percentage}
              days={project.delayRisk.days}
              reason={project.delayRisk.reason}
            />
            
            {project.teamProductivity !== undefined && (
              <ProductivityIndicator productivity={project.teamProductivity} />
            )}
          </div>
        )}
        
        {(project.safetyAlerts?.length || project.qualityIssues?.length) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.safetyAlerts?.length > 0 && (
              <AlertList 
                title="Alertas de Segurança"
                alerts={project.safetyAlerts}
                type="safety"
                onResolve={(index) => handleResolveAlert(index, 'safety')}
              />
            )}
            
            {project.qualityIssues?.length > 0 && (
              <AlertList 
                title="Problemas de Qualidade"
                alerts={project.qualityIssues}
                type="quality"
                onResolve={(index) => handleResolveAlert(index, 'quality')}
              />
            )}
          </div>
        )}
        
        {project.isCompleted && project.postConstructionMaintenance && project.postConstructionMaintenance.length > 0 && (
          <MaintenanceList 
            maintenance={project.postConstructionMaintenance}
            onComplete={handleCompleteMaintenance}
          />
        )}
        
        <div className="bg-card p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Consumo de Materiais</h2>
          <div className="space-y-4">
            {Object.entries(materiais).map(([material, { usado, planejado }]) => {
              const percentagem = Math.round((usado / planejado) * 100);
              const acimaPlanejado = usado > planejado;
              
              return (
                <div key={material}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <span className="capitalize">{material}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        {usado} de {planejado} planejados
                      </span>
                    </div>
                    {acimaPlanejado && (
                      <span className="text-[#FF6200] text-xs bg-[#FF6200]/10 px-2 py-0.5 rounded-full">
                        {Math.round((usado / planejado - 1) * 100)}% acima do planejado
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-[#333333] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${acimaPlanejado ? 'bg-[#FF6200]' : 'bg-primary'}`} 
                      style={{ width: `${Math.min(percentagem, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Tarefas Pendentes</h2>
          {tarefasPendentes.length === 0 ? (
            <p className="text-center text-gray-400">Nenhuma tarefa pendente</p>
          ) : (
            <div className="space-y-3">
              {tarefasPendentes.map((tarefa, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-[#333333] rounded-lg">
                  <p>{tarefa}</p>
                  <Button 
                    onClick={() => handleConcluirTarefa(index)}
                    variant="ghost"
                    size="sm"
                    className="text-green-500 hover:bg-green-500/10 hover:text-green-400"
                  >
                    <Check size={16} className="mr-2" />
                    Concluir
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card p-5 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Histórico de Atrasos</h2>
          {historicoAtrasos.length === 0 ? (
            <p className="text-center text-gray-400">Nenhum atraso registrado</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#444444] text-left">
                    <th className="pb-2">Data</th>
                    <th className="pb-2">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {historicoAtrasos.map((atraso, index) => {
                    const [data, ...restoParts] = atraso.split(': ');
                    const resto = restoParts.join(': ');
                    
                    return (
                      <tr key={index} className="border-b border-[#333333]">
                        <td className="py-3">{data}</td>
                        <td className="py-3">{resto}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Linha do Tempo</h2>
            </div>
            <div className="bg-card p-5 rounded-lg">
              {project.timeline && project.timeline.length > 0 ? (
                <div className="pl-2 pt-2">
                  {project.timeline.map((event, index) => (
                    <TimelineItem 
                      key={event.id} 
                      event={event} 
                      isLast={index === project.timeline.length - 1}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-4">Nenhuma atualização disponível</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Informações do Projeto</h2>
              <Button 
                variant="outline" 
                onClick={() => setInfoDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Edit size={14} className="mr-2" />
                Editar Informações
              </Button>
            </div>
            <div className="bg-card p-5 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-muted">Responsável</h4>
                  <p>{project.managerName}</p>
                </div>
                <div>
                  <h4 className="text-sm text-muted">Contato</h4>
                  <p>{project.managerPhone}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-muted mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm text-muted">Endereço</h4>
                    <p>{project.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Galeria de Fotos</h2>
            </div>
            <div className="bg-card p-5 rounded-lg">
              {project.photos && project.photos.length > 0 ? (
                <PhotoGallery images={project.photos} />
              ) : (
                <p className="text-muted text-center py-4">Nenhuma foto disponível</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Observações</h2>
              <Button 
                variant="outline" 
                onClick={() => setObservationsDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Edit size={14} className="mr-2" />
                Editar
              </Button>
            </div>
            <div className="bg-card p-5 rounded-lg h-[calc(100%-48px)]">
              {project.observations ? (
                <p className="whitespace-pre-wrap">{project.observations}</p>
              ) : (
                <p className="text-muted text-center py-4">Nenhuma observação disponível.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleExportReport} 
            className="bg-primary hover:bg-primary/80 text-white gap-2"
          >
            Exportar Relatório
          </Button>
        </div>
      </div>
      
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Projeto</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome do projeto" 
                        className="bg-secondary"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status do Projeto</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Ex: Fundações concluídas" 
                        className="bg-secondary resize-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Atualizar Data de Conclusão</DialogTitle>
          </DialogHeader>
          
          <Form {...dateForm}>
            <form onSubmit={dateForm.handleSubmit(onDateSubmit)} className="space-y-4">
              <FormField
                control={dateForm.control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Estimada de Conclusão</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="DD/MM/AAAA" 
                        className="bg-secondary"
                        dateFormat={true}
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={hoursDialogOpen} onOpenChange={setHoursDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Atualizar Horas Trabalhadas</DialogTitle>
          </DialogHeader>
          
          <Form {...hoursForm}>
            <form onSubmit={hoursForm.handleSubmit(onHoursSubmit)} className="space-y-4">
              <FormField
                control={hoursForm.control}
                name="hoursWorked"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas Trabalhadas</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: 450h de 1000h planejadas" 
                        className="bg-secondary"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setHoursDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Editar Informações do Projeto</DialogTitle>
          </DialogHeader>
          
          <Form {...infoForm}>
            <form onSubmit={infoForm.handleSubmit(onInfoSubmit)} className="space-y-4">
              <FormField
                control={infoForm.control}
                name="managerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsável</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome do responsável" 
                        className="bg-secondary"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={infoForm.control}
                name="managerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contato</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(00) 123456789" 
                        className="bg-secondary"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={infoForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Endereço completo" 
                        className="bg-secondary resize-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setInfoDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={observationsDialogOpen} onOpenChange={setObservationsDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Editar Observações</DialogTitle>
          </DialogHeader>
          
          <Form {...observationsForm}>
            <form onSubmit={observationsForm.handleSubmit(onObservationsSubmit)} className="space-y-4">
              <FormField
                control={observationsForm.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Adicione observações sobre o projeto" 
                        className="bg-secondary resize-none min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setObservationsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary/80"
                >
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ProjectDetails;
