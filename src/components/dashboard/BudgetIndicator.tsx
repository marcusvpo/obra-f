import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface BudgetIndicatorProps {
  planned: number;
  estimated: number;
  compact?: boolean;
}

const BudgetIndicator = ({ planned, estimated, compact = false }: BudgetIndicatorProps) => {
  const difference = estimated - planned;
  const percentageDiff = Math.round((difference / planned) * 100);
  const isOverBudget = difference > 0;
  
  if (compact) {
    return (
      <Card className="bg-card border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-muted">Orçamento</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                isOverBudget ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
              }`}>
                {isOverBudget ? `${percentageDiff}% acima` : `${Math.abs(percentageDiff)}% abaixo`}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Planejado: {formatCurrency(planned)}</span>
              <span>Estimado: {formatCurrency(estimated)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card mt-5 border-0 shadow-md">
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Orçamento</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-muted text-sm mb-1">Planejado</p>
            <p className="text-xl font-bold">{formatCurrency(planned)}</p>
          </div>
          <div>
            <p className="text-muted text-sm mb-1">Estimado</p>
            <p className="text-xl font-bold">{formatCurrency(estimated)}</p>
          </div>
        </div>
        
        <div className="mt-5">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Variação</span>
            <span className={`text-sm ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
              {isOverBudget ? '+' : ''}{formatCurrency(difference)} ({isOverBudget ? '+' : ''}{percentageDiff}%)
            </span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div 
              className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(Math.abs(percentageDiff) * 2, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetIndicator;
