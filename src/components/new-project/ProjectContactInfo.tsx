
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { User, Phone } from "lucide-react";
import { Control } from "react-hook-form";

interface TeamMember {
  id: string;
  nome: string;
  numero: string;
  ultimaMensagem: string;
}

interface ProjectContactInfoProps {
  control: Control<any>;
  teamMembers: TeamMember[];
  updateManagerPhone: (managerName: string) => void;
}

export default function ProjectContactInfo({ 
  control, 
  teamMembers,
  updateManagerPhone 
}: ProjectContactInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
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
        control={control}
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
  );
}
