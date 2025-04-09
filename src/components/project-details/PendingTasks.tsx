
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface PendingTasksProps {
  initialTasks: string[];
}

export default function PendingTasks({ initialTasks }: PendingTasksProps) {
  const [tarefasPendentes, setTarefasPendentes] = useState<string[]>(initialTasks);

  const handleConcluirTarefa = (index: number) => {
    setTarefasPendentes(prev => prev.filter((_, i) => i !== index));
    toast.success("Tarefa marcada como concluída!");
  };
  
  return (
    <div className="bg-card p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Tarefas Pendentes</h2>
      {tarefasPendentes.length === 0 ? (
        <p className="text-center text-gray-400">Nenhuma tarefa pendente</p>
      ) : (
        <div className="space-y-3">
          {tarefasPendentes.map((tarefa, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-[#333333] rounded-lg">
              <p>{tarefa}</p>
              <Button 
                onClick={() => handleConcluirTarefa(index)}
                variant="ghost"
                size="sm"
                className="text-green-500 hover:bg-green-500/10 hover:text-green-400"
              >
                <Check size={16} className="mr-2" />
                Concluir
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
