
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Phone, MapPin, MessageSquare } from "lucide-react";

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
    
    // Simulamos a adição de um novo projeto com um timeout
    setTimeout(() => {
      // Na vida real, aqui seria feita uma chamada para adicionar o projeto
      console.log("Dados do novo projeto:", data);
      
      toast.success("Projeto criado com sucesso!");
      navigate("/");
      setIsSubmitting(false);
    }, 1000);
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
                          <span>Gerente Responsável</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nome do gerente" 
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
                    name="managerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone size={16} />
                          <span>Contato do Gerente</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(00) 00000-0000" 
                            className="bg-secondary"
                            {...field} 
                            required
                          />
                        </FormControl>
                        <FormDescription>
                          Será usado para identificação no WhatsApp
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
