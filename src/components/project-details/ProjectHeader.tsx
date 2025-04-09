
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateProjectName, updateProjectStatus } from "@/data/mockData";

interface ProjectHeaderProps {
  projectId: string;
  projectName: string;
  projectStatus: string;
  onProjectUpdated: (name: string, status: string) => void;
}

interface EditFormData {
  name: string;
  status: string;
}

export default function ProjectHeader({ projectId, projectName, projectStatus, onProjectUpdated }: ProjectHeaderProps) {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const editForm = useForm<EditFormData>({
    defaultValues: {
      name: projectName,
      status: projectStatus
    }
  });
  
  const onEditSubmit = (data: EditFormData) => {
    updateProjectName(projectId, data.name);
    updateProjectStatus(projectId, data.status);
    setEditDialogOpen(false);
    
    onProjectUpdated(data.name, data.status);
    
    toast.success("Projeto atualizado com sucesso!");
  };
  
  return (
    <>
      <div className="flex justify-end">
        <Button 
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/80"
          onClick={() => setEditDialogOpen(true)}
        >
          <Edit size={15} />
          <span>Editar</span>
        </Button>
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
    </>
  );
}
