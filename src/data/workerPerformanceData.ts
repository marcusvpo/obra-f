
import { WorkerPerformance } from "@/types/worker";

// Dados simulados para demonstração
export const getWorkerPerformance = (workerId: string): WorkerPerformance => {
  const performances: Record<string, WorkerPerformance> = {
    "1": {
      completedTasks: 28,
      pendingTasks: 5,
      failedTasks: 3,
      productivityIndex: 78,
      performanceTrend: [65, 72, 74, 68, 71, 73, 78],
      messages: [
        { date: "14/05", content: "Concluí a instalação elétrica no 2º andar", type: "success" },
        { date: "12/05", content: "Atraso na entrega dos materiais de hidráulica", type: "warning" },
        { date: "10/05", content: "Fundação concluída conforme cronograma", type: "success" },
        { date: "08/05", content: "Problema com a betoneira, preciso de ajuda", type: "danger" },
        { date: "05/05", content: "Iniciando trabalho nas fundações do setor B", type: "info" },
      ]
    },
    "2": {
      completedTasks: 35,
      pendingTasks: 3,
      failedTasks: 1,
      productivityIndex: 92,
      performanceTrend: [80, 83, 85, 87, 89, 90, 92],
      messages: [
        { date: "15/05", content: "Sistema hidráulico do térreo finalizado", type: "success" },
        { date: "13/05", content: "Iniciando instalações no piso superior", type: "info" },
        { date: "11/05", content: "Conclusão do encanamento principal", type: "success" },
        { date: "09/05", content: "Problema com vazamento resolvido", type: "success" },
        { date: "07/05", content: "Encontrei vazamento na tubulação principal", type: "warning" },
      ]
    },
    "3": {
      completedTasks: 19,
      pendingTasks: 8,
      failedTasks: 7,
      productivityIndex: 56,
      performanceTrend: [60, 58, 62, 59, 57, 54, 56],
      messages: [
        { date: "14/05", content: "Atraso na colocação das janelas", type: "danger" },
        { date: "12/05", content: "Retrabalho necessário na pintura do hall", type: "danger" },
        { date: "10/05", content: "Finalização da instalação de esquadrias", type: "success" },
        { date: "08/05", content: "Iniciando trabalhos de acabamento", type: "info" },
        { date: "05/05", content: "Materiais recebidos com problemas", type: "warning" },
      ]
    },
    "4": {
      completedTasks: 42,
      pendingTasks: 4,
      failedTasks: 2,
      productivityIndex: 88,
      performanceTrend: [75, 78, 80, 82, 84, 86, 88],
      messages: [
        { date: "15/05", content: "Acabamento do telhado concluído", type: "success" },
        { date: "13/05", content: "Estrutura de madeira finalizada", type: "success" },
        { date: "11/05", content: "Atraso na entrega das telhas", type: "warning" },
        { date: "09/05", content: "Instalação de calhas concluída", type: "success" },
        { date: "07/05", content: "Iniciando montagem do telhado", type: "info" },
      ]
    }
  };

  return performances[workerId] || {
    completedTasks: 0,
    pendingTasks: 0,
    failedTasks: 0,
    productivityIndex: 0,
    performanceTrend: [0, 0, 0, 0, 0, 0, 0],
    messages: []
  };
};

export const getAllWorkersPerformance = () => {
  return ["1", "2", "3", "4"].map(id => {
    return getWorkerPerformance(id);
  });
};
