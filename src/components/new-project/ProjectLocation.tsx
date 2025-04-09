
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, MessageSquare } from "lucide-react";
import { Control } from "react-hook-form";

interface ProjectLocationProps {
  control: Control<any>;
}

export default function ProjectLocation({ control }: ProjectLocationProps) {
  return (
    <>
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Endereço da Obra</span>
            </FormLabel>
            <FormControl>
              <Textarea 
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
        control={control}
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
    </>
  );
}
