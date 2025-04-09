
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";
import { Control } from "react-hook-form";

interface NewProjectFormData {
  name: string;
  estimatedCompletionDate: string;
  plannedHours: string;
}

interface ProjectBasicInfoProps {
  control: Control<any>;
}

export default function ProjectBasicInfo({ control }: ProjectBasicInfoProps) {
  return (
    <>
      <FormField
        control={control}
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
          control={control}
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
                  dateFormat={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
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
    </>
  );
}
