
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProductivityIndicatorProps {
  productivity: number;
}

export default function ProductivityIndicator({ productivity }: ProductivityIndicatorProps) {
  const getProductivityColor = () => {
    if (productivity >= 80) return "bg-green-500";
    if (productivity >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        Produtividade da Equipe
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold">{productivity}%</p>
          <span className="text-sm text-muted">tarefas concluídas</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Nível de Produtividade</span>
            <span className={
              productivity >= 80 ? "text-green-500" : 
              productivity >= 60 ? "text-yellow-500" : 
              "text-red-500"
            }>
              {productivity >= 80 ? "Alta" : productivity >= 60 ? "Média" : "Baixa"}
            </span>
          </div>
          <Progress 
            value={productivity} 
            className="h-2"
            indicatorClassName={getProductivityColor()}
          />
        </div>
      </div>
    </div>
  );
}
