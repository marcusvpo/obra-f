
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export interface MaterialConsumptionProps {
  materiais?: Record<string, { usado: number; planejado: number }>;
}

export default function MaterialConsumption({ materiais }: MaterialConsumptionProps) {
  if (!materiais || Object.keys(materiais).length === 0) {
    return null;
  }
  
  return (
    <Card className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Package size={18} className="text-primary mr-2" />
          Consumo de Materiais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(materiais).map(([material, dados], index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{material}</span>
                <span className="text-sm text-muted-foreground">
                  {dados.usado} de {dados.planejado} ({Math.round((dados.usado / dados.planejado) * 100)}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    dados.usado > dados.planejado 
                      ? 'bg-red-500' 
                      : dados.usado / dados.planejado > 0.9 
                        ? 'bg-amber-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((dados.usado / dados.planejado) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
