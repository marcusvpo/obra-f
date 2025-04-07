
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Clock, Activity, Edit, MapPin } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import TimelineItem from "@/components/dashboard/TimelineItem";
import PhotoGallery from "@/components/dashboard/PhotoGallery";
import { getProjectDetails, updateProjectStatus, updateCompletionDate, updateProjectInfo } from "@/data/mockData";
import { ProgressTimeChart, HoursWorkedChart } from "@/components/dashboard/ProjectCharts";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
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

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  // Dialog states
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  
  // Form handling
  const statusForm = useForm<StatusFormData>();
  const dateForm = useForm<DateFormData>();
  const infoForm = useForm<InfoFormData>();
  
  useEffect(() => {
    if (!id) return;
    
    const projectData = getProjectDetails(id);
    if (!projectData) {
      toast.error("Projeto não encontrado");
      navigate("/");
      return;
    }
    
    setProject(projectData);
    
    // Set default form values
    statusForm.reset({ status: projectData.status });
    dateForm.reset({ completionDate: projectData.estimatedCompletionDate });
    infoForm.reset({
      managerName: projectData.managerName,
      managerPhone: projectData.managerPhone,
      address: projectData.address
    });
  }, [id, navigate]);
  
  if (!project) return null;
  
  const handleExportReport = () => {
    toast.success("Relatório gerado com sucesso!");
  };
  
  const onStatusSubmit = (data: StatusFormData) => {
    updateProjectStatus(project.id, data.status);
    setStatusDialogOpen(false);
    
    // Update local state
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: data.status,
        lastUpdate: new Date().toLocaleDateString('pt-BR')
      };
    });
    
    toast.success("Status atualizado com sucesso!");
  };
  
  const onDateSubmit = (data: DateFormData) => {
    updateCompletionDate(project.id, data.completionDate);
    setDateDialogOpen(false);
    
    // Update local state
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
    
    // Update local state
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
  
  return (
    <AppLayout 
      title={project.name} 
      showBackButton={true}
      onBackClick={() => navigate("/")}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard 
            title="Progresso" 
            value={`${project.progress}%`}
            icon={<Activity size={18} />}
          />
          <KpiCard 
            title="Data de Conclusão" 
            value={project.estimatedCompletionDate}
            icon={<Calendar size={18} />}
          />
          <KpiCard 
            title="Horas Trabalhadas" 
            value={project.hoursWorked}
            icon={<Clock size={18} />}
          />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-card p-5 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Progresso do Projeto</h3>
            <span>{project.progress}%</span>
          </div>
          <ProgressBar progress={project.progress} size="lg" color="#FF6200" />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {project.plannedDays && project.actualDays && (
            <Card className="bg-card shadow border-none">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Tempo Planejado vs. Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressTimeChart 
                  plannedDays={project.plannedDays}
                  actualDays={project.actualDays}
                />
              </CardContent>
            </Card>
          )}
          
          {project.plannedHours && (
            <Card className="bg-card shadow border-none">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Horas Trabalhadas vs. Planejadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HoursWorkedChart
                  plannedHours={project.plannedHours}
                  workedHours={project.hoursWorked}
                />
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Linha do Tempo</h2>
              <Button 
                variant="outline" 
                onClick={() => setStatusDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Edit size={14} className="mr-2" />
                Editar Status
              </Button>
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
          
          {/* Project Information */}
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
                  <h4 className="text-sm text-muted">Gerente Responsável</h4>
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
                <div className="pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setDateDialogOpen(true)}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    size="sm"
                  >
                    <Calendar size={14} className="mr-2" />
                    Editar Data de Conclusão
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Photos Gallery */}
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
        
        <div className="flex justify-end">
          <Button 
            onClick={handleExportReport} 
            className="bg-primary hover:bg-primary/80 text-white gap-2"
          >
            <Download size={16} />
            <span>Exportar Relatório</span>
          </Button>
        </div>
      </div>
      
      {/* Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Atualizar Status</DialogTitle>
          </DialogHeader>
          
          <Form {...statusForm}>
            <form onSubmit={statusForm.handleSubmit(onStatusSubmit)} className="space-y-4">
              <FormField
                control={statusForm.control}
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
                  onClick={() => setStatusDialogOpen(false)}
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
      
      {/* Date Dialog */}
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
      
      {/* Info Dialog */}
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
                    <FormLabel>Gerente Responsável</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome do gerente" 
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
                        placeholder="Telefone" 
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
    </AppLayout>
  );
};

export default ProjectDetails;
