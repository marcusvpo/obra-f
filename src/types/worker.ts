
export interface WorkerMessage {
  date: string;
  content: string;
  type: "success" | "warning" | "danger" | "info";
}

export interface WorkerPerformance {
  completedTasks: number;
  pendingTasks: number;
  failedTasks: number;
  productivityIndex: number;
  performanceTrend: number[];
  messages: WorkerMessage[];
}

export interface TeamMember {
  id: string;
  nome: string;
  numero: string;
  ultimaMensagem: string;
  currentProject?: string;
  performance?: WorkerPerformance;
  photoUrl?: string;
}
