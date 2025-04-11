
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
  latitude?: number;
  longitude?: number;
  observations: string;
  budget?: {
    planned: number;
    estimated: number;
  };
  delayRisk?: DelayRiskInfo;
  safetyAlerts?: AlertItem[];
  qualityIssues?: AlertItem[];
  teamProductivity?: number;
  postConstructionMaintenance?: MaintenanceItem[];
  timeline?: TimelineEvent[];
  photos?: Photo[];
  chatLogs?: ChatMessage[];
  tarefasPendentes?: string[];
  materiais?: Record<string, { usado: number; planejado: number }>;
}

export interface DelayRiskInfo {
  percentage: number;
  days: number;
  reason: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  isDelayed?: boolean;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface ChatMessage {
  data: string;
  hora: string;
  remetente: string;
  mensagem: string;
  origem: string;
}

export interface ChatLogEntry {
  obra: string;
  logs: ChatMessage[];
}

export interface AlertItem {
  date: string;
  title: string;
  description: string;
}

export interface MaintenanceItem {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}
