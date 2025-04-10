
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { updateCompletionDate, updateWorkedHours } from "@/data/projectData";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export interface ProjectSummaryProps {
  projectId: string;
  estimatedCompletionDate: string;
  hoursWorked: string;
  onProjectUpdated: (completionDate?: string, hoursWorked?: string) => void;
}

interface SummaryFormData {
  completionDate: string;
  hoursWorked: string;
}

export default function ProjectSummary({
  projectId,
  estimatedCompletionDate,
  hoursWorked,
  onProjectUpdated
}: ProjectSummaryProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const form = useForm<SummaryFormData>({
    defaultValues: {
      completionDate: estimatedCompletionDate,
      hoursWorked: hoursWorked
    }
  });

  const onSubmit = (data: SummaryFormData) => {
    updateCompletionDate(projectId, data.completionDate);
    updateWorkedHours(projectId, data.hoursWorked);
    
    onProjectUpdated(data.completionDate, data.hoursWorked);
    
    toast.success("Informações atualizadas com sucesso!");
    setEditDialogOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#353535] p-5 rounded-lg shadow-lg border-l-4 border-[#FF6200] hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} className="text-[#FF6200]" />
            <h2 className="text-lg font-semibold">Data de Conclusão</h2>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6200] to-[#FFAA00]">
              {estimatedCompletionDate}
            </p>
            <p className="text-sm text-gray-400">Previsão de término</p>
          </div>
        </div>
        
        <div className="bg-[#353535] p-5 rounded-lg shadow-lg border-l-4 border-[#FF6200] hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6200]">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <h2 className="text-lg font-semibold">Horas Trabalhadas</h2>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF6200] to-[#FFAA00]">
              {hoursWorked}
            </p>
            <p className="text-sm text-gray-400">Controle de horas</p>
          </div>
        </div>
      </div>
      
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-[#3A3A3A] border-[#444444]">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Informações</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Data de Conclusão</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="DD/MM/YYYY" 
                        {...field} 
                        className="bg-[#444444] border-[#555555] text-white"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hoursWorked"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Horas Trabalhadas</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ex: 680h de 1000h planejadas" 
                        {...field} 
                        className="bg-[#444444] border-[#555555] text-white"
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
                  className="border-[#555555] text-gray-300 hover:bg-[#444444]"
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
