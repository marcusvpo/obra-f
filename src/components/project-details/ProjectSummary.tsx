
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateCompletionDate, updateWorkedHours } from "@/data/mockData";
import BudgetIndicator from "@/components/dashboard/BudgetIndicator";

interface ProjectSummaryProps {
  projectId: string;
  estimatedCompletionDate: string;
  hoursWorked: string;
  budget?: { planned: number, estimated: number };
  onProjectUpdated: (completionDate?: string, hoursWorked?: string) => void;
}

interface DateFormData {
  completionDate: string;
}

interface HoursFormData {
  hoursWorked: string;
}

export default function ProjectSummary({ 
  projectId, 
  estimatedCompletionDate, 
  hoursWorked, 
  budget,
  onProjectUpdated
}: ProjectSummaryProps) {
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [hoursDialogOpen, setHoursDialogOpen] = useState(false);
  
  const dateForm = useForm<DateFormData>({
    defaultValues: { completionDate: estimatedCompletionDate }
  });
  
  const hoursForm = useForm<HoursFormData>({
    defaultValues: { hoursWorked: hoursWorked }
  });
  
  const onDateSubmit = (data: DateFormData) => {
    updateCompletionDate(projectId, data.completionDate);
    setDateDialogOpen(false);
    onProjectUpdated(data.completionDate);
    toast.success("Data de conclusão atualizada com sucesso!");
  };
  
  const onHoursSubmit = (data: HoursFormData) => {
    updateWorkedHours(projectId, data.hoursWorked);
    setHoursDialogOpen(false);
    onProjectUpdated(undefined, data.hoursWorked);
    toast.success("Horas trabalhadas atualizadas com sucesso!");
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative">
          <KpiCard 
            title="Data de Conclusão" 
            value={estimatedCompletionDate}
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
            value={hoursWorked}
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
      
      {budget && (
        <BudgetIndicator 
          planned={budget.planned} 
          estimated={budget.estimated} 
        />
      )}
    
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
    </>
  );
}
