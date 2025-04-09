
import { DollarSign, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BudgetIndicatorProps {
  planned: number;
  estimated: number;
}

export default function BudgetIndicator({ planned, estimated }: BudgetIndicatorProps) {
  const percentage = Math.round((estimated / planned) * 100);
  const isOverBudget = estimated > planned;
  const overPercentage = isOverBudget ? Math.round(((estimated - planned) / planned) * 100) : 0;
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-primary" />
        Orçamento
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted">Orçado</p>
            <p className="text-xl font-semibold">{formatCurrency(planned)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Estimado</p>
            <p className={`text-xl font-semibold ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
              {formatCurrency(estimated)}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Utilização do orçamento</span>
            <span>{percentage}%</span>
          </div>
          <Progress 
            value={percentage > 100 ? 100 : percentage} 
            className="h-2"
            indicatorClassName={percentage > 100 ? 'bg-red-500' : 'bg-primary'}
          />
        </div>
        
        {isOverBudget && (
          <div className="bg-[#3A3A3A] p-3 rounded-md flex items-center gap-2 text-red-500">
            <TrendingUp size={16} />
            <span className="text-sm">{overPercentage}% acima do orçado</span>
          </div>
        )}
      </div>
    </div>
  );
}
