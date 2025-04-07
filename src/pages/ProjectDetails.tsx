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
import { 
  getProjectDetails, updateProjectStatus, updateCompletionDate, 
  updateProjectInfo, updateProjectName, updateWorkedHours, updateObservations 
} from "@/data/mockData";
import { HoursWorkedChart } from "@/components/dashboard/ProjectCharts";
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

interface NameFormData {
  name: string;
}

interface HoursFormData {
  hoursWorked: string;
}

interface ObservationsFormData {
  observations: string;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  // Dialog states
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [hoursDialogOpen, setHoursDialogOpen] = useState(false);
  const [observationsDialogOpen, setObservationsDialogOpen] = useState(false);
  
  // Form handling
  const statusForm = useForm<StatusFormData>();
  const dateForm = useForm<DateFormData>();
  const infoForm = useForm<InfoFormData>();
  const nameForm = useForm<NameFormData>();
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
    
    // Set default form values
    statusForm.reset({ status: projectData.status });
    dateForm.reset({ completionDate: projectData.estimatedCompletionDate });
    infoForm.reset({
      managerName: projectData.managerName,
      managerPhone: projectData.managerPhone,
      address: projectData.address
    });
    nameForm.reset({ name: projectData.name });
    hoursForm.reset({ hoursWorked: projectData.hoursWorked });
    observationsForm.reset({ observations: projectData.observations || "" });
    
    // Marcar projeto como visualizado
    if (projectData) {
      const viewedProjects = JSON.parse(localStorage.getItem("viewedProjects") || "{}");
      viewedProjects[projectData.id] = true;
      localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects));
    }
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
  
  const onNameSubmit = (data: NameFormData) => {
    updateProjectName(project.id, data.name);
    setNameDialogOpen(false);
    
    // Update local state
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name: data.name
      };
    });
    
    toast.success("Nome do projeto atualizado com sucesso!");
  };
  
  const onHoursSubmit = (data: HoursFormData) => {
    updateWorkedHours(project.id, data.hoursWorked);
    setHoursDialogOpen(false);
    
    // Update local state
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
    
    // Update local state
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        observations: data.observations
      };
    });
    
    toast.success("Observações atualizadas com sucesso!");
  };
  
  // FIX: Here I'm fixing the issue with KpiCard title prop expecting a string but receiving a React element
  // I'm separating the edit buttons from the titles
  const renderEditDateButton = () => (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setDateDialogOpen(true)}
      className="h-6 p-1 hover:bg-primary/20"
    >
      <Edit size={14} />
    </Button>
  );

  const renderEditHoursButton = () => (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setHoursDialogOpen(true)}
      className="h-6 p-1 hover:bg-primary/20"
    >
      <Edit size={14} />
    </Button>
  );
  
  return (
    <AppLayout 
      title={project.name}
      showBackButton={true}
      onBackClick={() => navigate("/")}
    >
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setNameDialogOpen(true)}
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Edit size={14} className="mr-1" />
          Editar Nome
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setStatusDialogOpen(true)}
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Edit size={14} className="mr-1" />
          Editar Status
        </Button>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard 
            title="Progresso" 
            value={`${project.progress}%`}
            icon={<Activity size={18} />}
          />
          <div className="relative">
            <KpiCard 
              title="Data de Conclusão" 
              value={project.estimatedCompletionDate}
              icon={<Calendar size={18} />}
            />
            <div className="absolute top-3 right-3">
              {renderEditDateButton()}
            </div>
          </div>
          <div className="relative">
            <KpiCard 
              title="Horas Trabalhadas" 
              value={project.hoursWorked}
              icon={<Clock size={18} />}
            />
            <div className="absolute top-3 right-3">
              {renderEditHoursButton()}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-card p-5 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium text-lg">Progresso do Projeto</h3>
            <span className="text-lg font-semibold">{project.progress}%</span>
          </div>
          <ProgressBar progress={project.progress} size="lg" color="#FF6200" />
        </div>
        
        {/* Chart Section */}
        <div className="grid grid-cols-1 gap-8">
          {project.plannedHours && (
            <Card className="bg-card shadow border-none">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Horas Trabalhadas vs. Planejadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg text-muted-foreground">Trabalhadas</h3>
                    <p className="text-4xl font-bold text-primary mt-2">
                      {project.hoursWorked.replace(/[^0-9]/g, '')}h
                    </p>
                  </div>
                  <div className="h-full w-px bg-border hidden lg:block"></div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg text-muted-foreground">Planejadas</h3>
                    <p className="text-4xl font-bold mt-2">{project.plannedHours}h</p>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <HoursWorkedChart
                      plannedHours={project.plannedHours}
                      workedHours={project.hoursWorked}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Observações Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Observações</h2>
            <Button 
              variant="outline" 
              onClick={() => setObservationsDialogOpen(true)}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Edit size={14} className="mr-2" />
              Editar Observações
            </Button>
          </div>
          <div className="bg-card p-5 rounded-lg">
            {project.observations ? (
              <p className="whitespace-pre-wrap">{project.observations}</p>
            ) : (
              <p className="text-muted text-center py-4">Nenhuma observação disponível. Clique em "Editar Observações" para adicionar.</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline Section */}
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
      
      {/* Name Dialog */}
      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Atualizar Nome do Projeto</DialogTitle>
          </DialogHeader>
          
          <Form {...nameForm}>
            <form onSubmit={nameForm.handleSubmit(onNameSubmit)} className="space-y-4">
              <FormField
                control={nameForm.control}
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
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setNameDialogOpen(false)}
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
      
      {/* Hours Dialog */}
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
      
      {/* Observations Dialog */}
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
