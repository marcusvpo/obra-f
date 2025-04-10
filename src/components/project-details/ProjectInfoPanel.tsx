
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import TimelineItem from "@/components/dashboard/TimelineItem";
import { updateProjectInfo } from "@/data/mockData";
import { TimelineEvent } from "@/types/project";

interface TeamMember {
  id: string;
  nome: string;
  numero: string;
  funcao: string;
  foto?: string;
}

const teamMembers: TeamMember[] = [
  { id: "1", nome: "Carlos Silva", numero: "(11) 98765-4321", funcao: "Engenheiro Civil" },
  { id: "2", nome: "Ana Oliveira", numero: "(11) 91234-5678", funcao: "Engenheira Civil" },
  { id: "3", nome: "Pedro Santos", numero: "(11) 99876-5432", funcao: "Arquiteto" },
  { id: "4", nome: "Mariana Costa", numero: "(11) 97654-3210", funcao: "Técnica de Segurança" }
];

interface ProjectInfoPanelProps {
  projectId: string;
  managerName: string;
  managerPhone: string;
  address: string;
  timeline?: TimelineEvent[];
  onProjectUpdated: (managerName: string, managerPhone: string, address: string) => void;
}

interface InfoFormData {
  managerName: string;
  managerPhone: string;
  address: string;
}

export default function ProjectInfoPanel({ 
  projectId, 
  managerName, 
  managerPhone, 
  address, 
  timeline,
  onProjectUpdated
}: ProjectInfoPanelProps) {
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  
  const infoForm = useForm<InfoFormData>({
    defaultValues: {
      managerName,
      managerPhone,
      address
    }
  });
  
  const updateManagerPhone = (selectedManagerName: string) => {
    const selectedManager = teamMembers.find(member => member.nome === selectedManagerName);
    if (selectedManager) {
      infoForm.setValue('managerPhone', selectedManager.numero);
    }
  };
  
  const onInfoSubmit = (data: InfoFormData) => {
    updateProjectInfo(projectId, {
      managerName: data.managerName,
      managerPhone: data.managerPhone,
      address: data.address
    });
    setInfoDialogOpen(false);
    
    onProjectUpdated(data.managerName, data.managerPhone, data.address);
    
    toast.success("Informações atualizadas com sucesso!");
  };
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Linha do Tempo</h2>
          </div>
          <div className="bg-card p-5 rounded-lg">
            {timeline && timeline.length > 0 ? (
              <div className="pl-2 pt-2">
                {timeline.map((event, index) => (
                  <TimelineItem 
                    key={event.id} 
                    event={event} 
                    isLast={index === timeline.length - 1}
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
                <p>{managerName}</p>
              </div>
              <div>
                <h4 className="text-sm text-muted">Contato</h4>
                <p>{managerPhone}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-muted mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm text-muted">Endereço</h4>
                  <p>{address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        updateManagerPhone(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-secondary">
                          <SelectValue placeholder="Selecione um responsável" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.nome}>
                            {member.nome} ({member.funcao})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        readOnly
                        disabled
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
    </>
  );
}
