
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
  projectTasks?: ProjectTask[];
}

export interface ProjectTask {
  projectId: string;
  projectName: string;
  taskId: string;
  taskName: string;
  status: "completed" | "in_progress" | "delayed" | "not_started";
  dueDate: string;
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
