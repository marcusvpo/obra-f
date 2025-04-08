
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Phone, MapPin, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projects } from "@/data/mockData";
import { Project } from "@/types/project";

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
  
  // Load team members from localStorage if available
  useEffect(() => {
    const storedMembers = localStorage.getItem("teamMembers");
    if (storedMembers) {
      setTeamMembers(JSON.parse(storedMembers));
    } else {
      // Default team members if none in storage
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
    
    // Create new project
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
    
    // Add to projects list
    const updatedProjects = [...projects, newProject];
    
    // In a real app, we'd call an API here
    // For now, we'll update our mock projects
    // This is a simulated behavior since we can't modify the mockData directly
    console.log("New project created:", newProject);
    
    setTimeout(() => {
      toast.success("Projeto criado com sucesso!");
      navigate("/projetos");
      setIsSubmitting(false);
    }, 1000);
  };

  // Get responsible person's phone when selected
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Projeto</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Condomínio Villa Verde" 
                          className="bg-secondary"
                          {...field} 
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="estimatedCompletionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Data Estimada de Conclusão</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="DD/MM/AAAA" 
                            className="bg-secondary"
                            {...field} 
                            required
                            pattern="\d{2}/\d{2}/\d{4}"
                            onBlur={(e) => {
                              // Basic date format validation
                              const value = e.target.value;
                              if (value && !/\d{2}\/\d{2}\/\d{4}/.test(value)) {
                                toast.error("Formato de data inválido. Use DD/MM/AAAA");
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="plannedHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>Horas Planejadas</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: 1000" 
                            className="bg-secondary"
                            {...field} 
                            required
                          />
                        </FormControl>
                        <FormDescription>
                          Quantidade total de horas previstas para o projeto
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="managerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User size={16} />
                          <span>Responsável</span>
                        </FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              updateManagerPhone(value);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="bg-secondary">
                              <SelectValue placeholder="Selecione um responsável" />
                            </SelectTrigger>
                            <SelectContent>
                              {teamMembers.map((member) => (
                                <SelectItem key={member.id} value={member.nome}>
                                  {member.nome}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="managerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone size={16} />
                          <span>Contato do Responsável</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(00) 123456789" 
                            className="bg-secondary"
                            {...field} 
                            readOnly
                            disabled
                          />
                        </FormControl>
                        <FormDescription>
                          Será preenchido automaticamente
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Endereço da Obra</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Endereço completo" 
                          className="bg-secondary"
                          {...field} 
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare size={16} />
                        <span>Observações</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Observações iniciais sobre o projeto" 
                          className="bg-secondary resize-none min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
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
