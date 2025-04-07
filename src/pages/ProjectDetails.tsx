
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, MapPin } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import TimelineItem from "@/components/dashboard/TimelineItem";
import PhotoGallery from "@/components/dashboard/PhotoGallery";
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

interface EditFormData {
  name: string;
  status: string;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  // Dialog states
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [hoursDialogOpen, setHoursDialogOpen] = useState(false);
  const [observationsDialogOpen, setObservationsDialogOpen] = useState(false);
  
  // Form handling
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
    
    // Set default form values
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
    
    // Marcar projeto como visualizado
    if (projectData) {
      const viewedProjects = JSON.parse(localStorage.getItem("viewedProjects") || "{}");
      viewedProjects[projectData.id] = true;
      localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects));
    }
  }, [id, navigate]);
  
  useEffect(() => {
    // Adiciona o botão de Editar no cabeçalho
    if (project) {
      const buttonContainer = document.getElementById('page-specific-buttons');
      if (buttonContainer) {
        const editButton = document.createElement('button');
        editButton.className = 'bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/80';
        editButton.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Editar</span>';
        editButton.onclick = () => setEditDialogOpen(true);
        
        // Limpa qualquer botão existente e adiciona o novo botão
        buttonContainer.innerHTML = '';
        buttonContainer.appendChild(editButton);
      }
    }

    return () => {
      // Limpa o botão ao desmontar o componente
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
  
  const onEditSubmit = (data: EditFormData) => {
    // Atualiza o nome do projeto
    updateProjectName(project.id, data.name);
    
    // Atualiza o status do projeto
    updateProjectStatus(project.id, data.status);
    
    setEditDialogOpen(false);
    
    // Update local state
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
  
  return (
    <AppLayout 
      title={project.name}
      showBackButton={true}
      onBackClick={() => navigate("/")}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Última foto do projeto - Nova feature */}
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
        
        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <KpiCard 
              title="Data de Conclusão" 
              value={project.estimatedCompletionDate}
              icon={Calendar}
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
              icon={Clock}
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          
          {/* Observações Section - Reduzido e ao lado da galeria */}
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
      
      {/* Edit Dialog - Combinando nome e status */}
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
