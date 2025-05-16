
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface Task {
  text: string;
  deadline?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface PendingTasksProps {
  tarefasPendentes: string[] | Task[];
}

// Função auxiliar para converter strings em objetos de tarefa
const processTask = (task: string | Task): Task => {
  if (typeof task === 'string') {
    return {
      text: task,
      // Gera uma data aleatória nos próximos 14 dias
      deadline: format(
        new Date(Date.now() + Math.floor(Math.random() * 14) * 86400000),
        'dd/MM/yyyy',
        { locale: ptBR }
      ),
      // Atribui prioridade aleatória
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
    };
  }
  return task;
};

export default function PendingTasks({ tarefasPendentes }: PendingTasksProps) {
  const defaultTasks = [
    "Finalizar alvenaria interna do segundo andar",
    "Instalar fiação elétrica no bloco B",
    "Resolver atraso causado pela entrega do cimento",
    "Inspeção de qualidade nas fundações",
    "Concluir instalações hidráulicas do térreo"
  ];
  
  // Usa tarefasPendentes se disponível, caso contrário usa as tarefas padrão
  const rawTasks = tarefasPendentes && tarefasPendentes.length > 0 ? tarefasPendentes : defaultTasks;
  
  // Processa cada tarefa para garantir que seja um objeto Task
  const tasks = rawTasks.map(processTask);
  
  // Função para determinar a cor da prioridade
  const getPriorityColor = (priority: 'low' | 'medium' | 'high' | undefined): string => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return 'text-green-500';
    }
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
              <div 
                key={index} 
                className="flex flex-col p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <AlertTriangle 
                      size={16} 
                      className={`mt-1 ${getPriorityColor(task.priority)}`} 
                    />
                    <span className="text-sm">{task.text}</span>
                  </div>
                </div>
                
                {task.deadline && (
                  <div className="flex items-center mt-2 ml-6 text-xs text-muted-foreground">
                    <Calendar size={12} className="mr-1" />
                    <span>Prazo: {task.deadline}</span>
                  </div>
                )}
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
