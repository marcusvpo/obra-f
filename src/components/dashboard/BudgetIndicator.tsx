
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface BudgetIndicatorProps {
  compact?: boolean;
}

// Componente vazio para manter a compatibilidade com imports existentes
const BudgetIndicator = ({ compact = false }: BudgetIndicatorProps) => {
  // Retornando um componente vazio, sem informações financeiras
  return null;
};

export default BudgetIndicator;
