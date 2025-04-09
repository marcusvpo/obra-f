
export interface Project {
  id: string;
  name: string;
  progress: number;
  status: string;
  delay: number | null;
  lastUpdate: string;
  estimatedCompletionDate: string;
  isFavorite: boolean;
  latestPhoto?: string;
  lastUpdateTime?: string;
  isCompleted?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  isDelayed?: boolean;
}

export interface ChatMessage {
  remetente: string;
  data: string;
  hora: string;
  mensagem: string;
}

export interface ProjectDetails extends Project {
  hoursWorked?: string;
  plannedHours?: string;
  plannedDays?: number;
  actualDays?: number;
  managerName?: string;
  managerPhone?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  observations?: string;
  timeline?: TimelineEvent[];
  photos?: GalleryImage[];
}

export interface ChatLogEntry {
  obra: string;
  logs: {
    data: string;
    hora: string;
    remetente: string;
    mensagem: string;
    origem: string;
  }[];
}
