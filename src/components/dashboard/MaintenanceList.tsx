
import { Calendar } from "lucide-react";
import { MaintenanceItem } from "@/types/project";

interface MaintenanceListProps {
  maintenance: MaintenanceItem[];
  onComplete?: (index: number) => void;
}

export default function MaintenanceList({ maintenance }: MaintenanceListProps) {
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
              className="p-3 bg-[#3A3A3A] rounded-md"
            >
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
              
              {item.isCompleted && (
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                  Concluído
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
