
import { AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RiskIndicatorProps {
  percentage: number;
  days: number;
  reason: string;
}

export default function RiskIndicator({ percentage, days, reason }: RiskIndicatorProps) {
  const getRiskColor = () => {
    if (percentage < 30) return "bg-green-500";
    if (percentage < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-[#3A3A3A] p-4 rounded-lg">
      <div className="flex items-start gap-2 mb-3">
        <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={18} />
        <div>
          <h3 className="font-medium">Risco de Atraso: {percentage}%</h3>
          <p className="text-sm text-gray-400">Possível atraso de {days} dias</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs mb-1">
          <span>Nível de Risco</span>
          <span className={percentage >= 60 ? "text-red-500" : percentage >= 30 ? "text-yellow-500" : "text-green-500"}>
            {percentage >= 60 ? "Alto" : percentage >= 30 ? "Médio" : "Baixo"}
          </span>
        </div>
        <Progress value={percentage} className="h-2" 
          indicatorClassName={getRiskColor()} 
        />
        
        <p className="text-sm mt-3 text-gray-400">
          <span className="font-medium text-white">Motivo:</span> {reason}
        </p>
      </div>
    </div>
  );
}
