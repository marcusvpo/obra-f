
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { markTaskAsComplete } from "@/data/mockData";

export interface PendingTasksProps {
  tarefasPendentes: string[];
}

export default function PendingTasks({ tarefasPendentes }: PendingTasksProps) {
  const defaultTasks = [
    "Finalizar alvenaria interna do segundo andar",
    "Instalar fiação elétrica no bloco B",
    "Resolver atraso causado pela entrega do cimento",
    "Inspeção de qualidade nas fundações",
    "Concluir instalações hidráulicas do térreo"
  ];
  
  // Usa tarefasPendentes se disponível, caso contrário usa as tarefas padrão
  const tasks = tarefasPendentes && tarefasPendentes.length > 0 ? tarefasPendentes : defaultTasks;
  
  const handleComplete = (index: number) => {
    markTaskAsComplete("1", index);
    toast.success("Tarefa marcada como concluída!");
  };
  
  return (
    <Card className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <CheckCircle size={18} className="text-primary mr-2" />
          Tarefas Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
                <span className="text-sm">{task}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                  onClick={() => handleComplete(index)}
                >
                  Concluir
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted py-4">Nenhuma tarefa pendente</p>
        )}
      </CardContent>
    </Card>
  );
}
