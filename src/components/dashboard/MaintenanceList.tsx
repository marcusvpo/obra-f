
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaintenanceListProps {
  maintenance: string[];
  onComplete?: (index: number) => void;
}

export default function MaintenanceList({ maintenance, onComplete }: MaintenanceListProps) {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Manutenção Pós-Construção
      </h2>
      
      {maintenance.length === 0 ? (
        <p className="text-center text-gray-400">Nenhuma manutenção agendada</p>
      ) : (
        <div className="space-y-3">
          {maintenance.map((item, index) => (
            <div 
              key={index} 
              className="p-3 bg-[#3A3A3A] rounded-md flex justify-between items-start"
            >
              <p className="text-sm">{item}</p>
              
              {onComplete && (
                <Button 
                  onClick={() => onComplete(index)}
                  variant="ghost"
                  size="sm"
                  className="text-green-500 hover:bg-green-500/10 hover:text-green-400 min-w-[80px] h-7"
                >
                  <Check size={14} className="mr-1" />
                  Concluir
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
