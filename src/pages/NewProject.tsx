
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/mockData";
import { Project } from "@/types/project";
import ProjectBasicInfo from "@/components/new-project/ProjectBasicInfo";
import ProjectContactInfo from "@/components/new-project/ProjectContactInfo";
import ProjectLocation from "@/components/new-project/ProjectLocation";

interface TeamMember {
  id: string;
  nome: string;
  numero: string;
  ultimaMensagem: string;
}

interface NewProjectFormData {
  name: string;
  estimatedCompletionDate: string;
  hoursWorked: string;
  plannedHours: string;
  managerName: string;
  managerPhone: string;
  address: string;
  observations: string;
}

export default function NewProject() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  
  useEffect(() => {
    const storedMembers = localStorage.getItem("teamMembers");
    if (storedMembers) {
      setTeamMembers(JSON.parse(storedMembers));
    } else {
      setTeamMembers([
        { id: "1", nome: "João Silva", numero: "(11) 999999999", ultimaMensagem: "07/04: Fundações concluídas" },
        { id: "2", nome: "Maria Oliveira", numero: "(11) 988888888", ultimaMensagem: "06/04: Iniciando instalações elétricas" },
        { id: "3", nome: "Pedro Santos", numero: "(11) 977777777", ultimaMensagem: "05/04: Problema com entrega de material" }
      ]);
    }
  }, []);
  
  const form = useForm<NewProjectFormData>({
    defaultValues: {
      name: "",
      estimatedCompletionDate: "",
      hoursWorked: "0h",
      plannedHours: "",
      managerName: "",
      managerPhone: "",
      address: "",
      observations: ""
    }
  });
  
  const onSubmit = (data: NewProjectFormData) => {
    setIsSubmitting(true);
    
    const newProject: Project = {
      id: uuidv4(),
      name: data.name,
      progress: 0,
      status: "Iniciando",
      delay: null,
      lastUpdate: new Date().toLocaleDateString("pt-BR"),
      estimatedCompletionDate: data.estimatedCompletionDate,
      isFavorite: false
    };
    
    const updatedProjects = [...projects, newProject];
    
    console.log("New project created:", newProject);
    
    setTimeout(() => {
      toast.success("Projeto criado com sucesso!");
      navigate("/projetos");
      setIsSubmitting(false);
    }, 1000);
  };

  const updateManagerPhone = (managerName: string) => {
    const selectedMember = teamMembers.find(member => member.nome === managerName);
    if (selectedMember) {
      form.setValue("managerPhone", selectedMember.numero);
    }
  };
  
  return (
    <AppLayout 
      title="Novo Projeto" 
      showBackButton={true} 
      onBackClick={() => navigate("/")}
    >
      <div className="max-w-3xl mx-auto">
        <Card className="bg-card border-none shadow">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Adicionar Novo Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ProjectBasicInfo control={form.control} />
                
                <ProjectContactInfo 
                  control={form.control} 
                  teamMembers={teamMembers} 
                  updateManagerPhone={updateManagerPhone}
                />
                
                <ProjectLocation control={form.control} />
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="mr-2"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/80 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Criando..." : "Criar Projeto"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
