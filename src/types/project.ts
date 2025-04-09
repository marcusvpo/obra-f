
export interface Project {
  id: string;
  name: string;
  progress: number;
  status: string;
  delay?: number | null;
  lastUpdate: string;
  estimatedCompletionDate: string;
  isFavorite?: boolean;
  latestPhoto?: string;
  pendingTasks?: number;
  todayUpdates?: number;
  lastUpdateTime?: string;
  isCompleted?: boolean;
}

export interface ProjectDetails extends Project {
  hoursWorked: string;
  plannedHours?: string;
  plannedDays?: number;
  actualDays?: number;
  managerName: string;
  managerPhone: string;
  address: string;
  timeline?: TimelineEvent[];
  photos?: GalleryImage[];
  latitude?: number;
  longitude?: number;
  observations?: string;
  materiais?: Record<string, { usado: number, planejado: number }>;
  tarefasPendentes?: string[];
  historicoAtrasos?: string[];
  budget?: {
    planned: number;
    estimated: number;
  };
  delayRisk?: {
    percentage: number;
    days: number;
    reason: string;
  };
  safetyAlerts?: AlertItem[];
  qualityIssues?: AlertItem[];
  teamProductivity?: number;
  postConstructionMaintenance?: MaintenanceItem[];
  chatLogs?: ChatMessage[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  isDelayed?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface ChatLogEntry {
  obra: string;
  logs: ChatMessage[];
}

export interface ChatMessage {
  data: string;
  hora?: string;
  remetente: string;
  mensagem: string;
  origem: string;
}

export interface SaudeObra {
  cor: string;
  texto: string;
}

export interface AlertItem {
  title: string;
  description: string;
  date: string;
}

export interface MaintenanceItem {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}
