
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateProjectName, updateProjectStatus, updateProjectInfo } from "@/data/projectData";
import ProjectTimeline from "./ProjectTimeline";
import { cn } from "@/lib/utils";

export interface ProjectHeaderProps {
  projectId: string;
  projectName: string;
  projectStatus: string;
  projectProgress: number;
  estimatedCompletionDate: string;
  managerName: string;
  managerPhone: string;
  address: string;
  onProjectUpdated: (name: string, status: string) => void;
  onProjectInfoUpdated: (manager: string, phone: string, address: string) => void;
}

interface EditFormData {
  name: string;
  status: string;
  managerName: string;
  managerPhone: string;
  address: string;
}

export default function ProjectHeader({ 
  projectId, 
  projectName, 
  projectStatus,
  projectProgress,
  estimatedCompletionDate,
  managerName,
  managerPhone,
  address,
  onProjectUpdated,
  onProjectInfoUpdated
}: ProjectHeaderProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  
  const editForm = useForm<EditFormData>({
    defaultValues: {
      name: projectName,
      status: projectStatus,
      managerName: managerName,
      managerPhone: managerPhone,
      address: address
    }
  });
  
  const onEditSubmit = (data: EditFormData) => {
    updateProjectName(projectId, data.name);
    updateProjectStatus(projectId, data.status);
    updateProjectInfo(projectId, {
      managerName: data.managerName,
      managerPhone: data.managerPhone,
      address: data.address
    });
    
    setEditDialogOpen(false);
    
    onProjectUpdated(data.name, data.status);
    onProjectInfoUpdated(data.managerName, data.managerPhone, data.address);
    
    toast.success("Projeto atualizado com sucesso!");
  };
  
  // Generate a background color based on project progress
  const getBgGradient = () => {
    if (projectProgress >= 80) return "from-green-900/40 to-green-950/80";
    if (projectProgress >= 50) return "from-blue-900/40 to-blue-950/80";
    return "from-amber-900/40 to-amber-950/80";
  };
  
  return (
    <>
      <div className={cn(
        "relative w-full bg-gradient-to-b", 
        getBgGradient(),
        "min-h-[240px] px-6 py-10 md:px-12 lg:px-24"
      )}>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=870&auto=format&fit=crop')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{projectName}</h1>
              <span className="bg-primary/20 text-white px-3 py-1 rounded-full text-sm">
                {projectStatus}
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 mb-4 text-gray-200">
              <div className="flex items-center gap-1">
                <span className="text-sm">Responsável: {managerName}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">Contato: {managerPhone}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm">Local: {address}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Progresso</span>
                <span>{projectProgress}%</span>
              </div>
              <Progress value={projectProgress} className="w-full max-w-md h-2" />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-white">
              <span>Previsão de entrega:</span>
              <span className="font-semibold">{estimatedCompletionDate}</span>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 gap-3 self-start">
            <Button 
              variant="outline" 
              size="icon"
              className="bg-black/30 border-none hover:bg-black/50 text-white"
              onClick={() => setShowTimeline(!showTimeline)}
            >
              <Clock className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setEditDialogOpen(true)}
              className="bg-black/30 border-none hover:bg-black/50 text-white"
            >
              <Edit size={15} className="mr-1" />
              <span>Editar</span>
            </Button>
          </div>
        </div>
        
        {/* Timeline Preview Dropdown */}
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          showTimeline ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="bg-black/30 p-4 rounded-lg">
            <ProjectTimeline 
              projectId={projectId}
              compact={true}
              hideControls={true}
            />
          </div>
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
              
              <FormField
                control={editForm.control}
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
                control={editForm.control}
                name="managerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone de Contato</FormLabel>
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
                control={editForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço da Obra</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Endereço" 
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
    </>
  );
}
