
import { Project, ProjectDetails, TimelineEvent } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    name: "Condomínio Villa Verde",
    progress: 68,
    status: "Instalações elétricas",
    delay: null,
    lastUpdate: "07/04/2025",
    estimatedCompletionDate: "15/08/2025",
    isFavorite: true,
    latestPhoto: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop",
    lastUpdateTime: "09/04/2025 às 15:30"
  },
  {
    id: "2",
    name: "Edifício Solaris",
    progress: 42,
    status: "Estrutura do 3º andar",
    delay: 2,
    lastUpdate: "06/04/2025",
    estimatedCompletionDate: "20/11/2025",
    isFavorite: false,
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=1600&auto=format&fit=crop",
    lastUpdateTime: "09/04/2025 às 10:45"
  },
  {
    id: "3",
    name: "Residencial Monte Alto",
    progress: 85,
    status: "Acabamentos finais",
    delay: null,
    lastUpdate: "07/04/2025",
    estimatedCompletionDate: "30/06/2025",
    isFavorite: false,
    latestPhoto: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=1600&auto=format&fit=crop",
    lastUpdateTime: "09/04/2025 às 14:15"
  },
  {
    id: "4",
    name: "Shopping Center Plaza",
    progress: 23,
    status: "Fundações concluídas",
    delay: 5,
    lastUpdate: "05/04/2025",
    estimatedCompletionDate: "10/05/2026",
    isFavorite: false,
    latestPhoto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    lastUpdateTime: "08/04/2025 às 16:20"
  },
  {
    id: "5",
    name: "Hospital Regional",
    progress: 55,
    status: "Instalações hidráulicas",
    delay: null,
    lastUpdate: "07/04/2025",
    estimatedCompletionDate: "15/01/2026",
    isFavorite: false,
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=1600&auto=format&fit=crop",
    lastUpdateTime: "09/04/2025 às 11:10"
  }
];

export const projectDetails: Record<string, ProjectDetails> = {
  "1": {
    id: "1",
    name: "Condomínio Villa Verde",
    progress: 68,
    status: "Instalações elétricas",
    delay: null,
    lastUpdate: "07/04/2025",
    estimatedCompletionDate: "15/08/2025",
    isFavorite: true,
    latestPhoto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
    hoursWorked: "680h de 1000h planejadas",
    plannedHours: "1000",
    plannedDays: 180,
    actualDays: 180,
    managerName: "Carlos Silva",
    managerPhone: "(11) 98765-4321",
    address: "Rua das Palmeiras, 123 - São Paulo, SP",
    latitude: -23.5505,
    longitude: -46.6333,
    observations: "Obra progredindo dentro do cronograma. Materiais sendo entregues conforme planejado. Equipe completa trabalhando no local.",
    lastUpdateTime: "09/04/2025 às 15:30",
    timeline: [
      {
        id: "t1",
        date: "07/04/2025",
        title: "Instalações elétricas em andamento",
        description: "Equipe iniciou a instalação da fiação nos apartamentos do bloco A"
      },
      {
        id: "t2",
        date: "05/04/2025",
        title: "Entrega de materiais",
        description: "Recebimento de materiais elétricos e hidráulicos"
      },
      {
        id: "t3",
        date: "02/04/2025",
        title: "Estrutura concluída",
        description: "Finalização da estrutura de concreto do último andar"
      },
      {
        id: "t4",
        date: "28/03/2025",
        title: "Atraso na concretagem",
        description: "Chuva forte causou atraso de 1 dia na concretagem do último andar",
        isDelayed: true
      },
      {
        id: "t5",
        date: "25/03/2025",
        title: "Início da montagem das formas",
        description: "Equipe iniciou a montagem das formas para o último andar"
      }
    ],
    photos: [
      {
        id: "p1",
        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
        caption: "Instalações elétricas - Bloco A",
        date: "07/04/2025"
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1582580683418-4f67758bfa56?q=80&w=1600&auto=format&fit=crop",
        caption: "Entrega de materiais",
        date: "05/04/2025"
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=1600&auto=format&fit=crop",
        caption: "Estrutura finalizada",
        date: "02/04/2025"
      }
    ]
  },
  "2": {
    id: "2",
    name: "Edifício Solaris",
    progress: 42,
    status: "Estrutura do 3º andar",
    delay: 2,
    lastUpdate: "06/04/2025",
    estimatedCompletionDate: "20/11/2025",
    isFavorite: false,
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=1600&auto=format&fit=crop",
    hoursWorked: "420h de 1000h planejadas",
    plannedHours: "1000",
    plannedDays: 240,
    actualDays: 242,
    managerName: "Ana Oliveira",
    managerPhone: "(11) 91234-5678",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    latitude: -23.5605,
    longitude: -46.6433,
    observations: "Problemas com fornecedor de concreto causaram um atraso de 2 dias. Estamos buscando alternativas para recuperar o tempo perdido.",
    lastUpdateTime: "09/04/2025 às 10:45",
    timeline: [
      {
        id: "t1",
        date: "06/04/2025",
        title: "Atraso na estrutura",
        description: "Problemas com fornecedor causaram atraso de 2 dias",
        isDelayed: true
      },
      {
        id: "t2",
        date: "04/04/2025",
        title: "Concretagem do 2º andar",
        description: "Finalizada com sucesso"
      },
      {
        id: "t3",
        date: "01/04/2025",
        title: "Montagem das formas",
        description: "Início da montagem das formas para o 3º andar"
      }
    ],
    photos: [
      {
        id: "p1",
        url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1600&auto=format&fit=crop",
        caption: "Estrutura do 3º andar",
        date: "06/04/2025"
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1583687665142-6bab378ea85f?q=80&w=1600&auto=format&fit=crop",
        caption: "Concretagem do 2º andar",
        date: "04/04/2025"
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=1600&auto=format&fit=crop",
        caption: "Montagem das formas",
        date: "01/04/2025"
      }
    ]
  }
};

export function getProjectDetails(id: string) {
  if (!projectDetails[id as keyof typeof projectDetails]) {
    const project = projects.find(p => p.id === id);
    if (!project) return null;
    
    return {
      ...project,
      hoursWorked: "Dados não disponíveis",
      managerName: "Gerente não atribuído",
      managerPhone: "Telefone não cadastrado",
      address: "Endereço não cadastrado",
      observations: "",
      timeline: [],
      photos: []
    };
  }
  
  return projectDetails[id as keyof typeof projectDetails];
}

export function getDelayedProjects() {
  return projects.filter(p => p.delay && p.delay > 0);
}

export function getCompletedProjects() {
  return projects.filter(p => p.isCompleted === true);
}

export function toggleFavorite(id: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.isFavorite = !project.isFavorite;
  }
  
  if (projectDetails[id]) {
    projectDetails[id].isFavorite = project?.isFavorite;
  }
}

export function getSaudeObra(project: Project) {
  if (!project.delay || project.delay <= 0) {
    return { cor: '#00FF00', texto: 'No prazo' };
  }
  if (project.delay < 3) {
    return { cor: '#FFFF00', texto: `Atraso leve: ${project.delay} ${project.delay === 1 ? 'dia' : 'dias'}` };
  }
  return { cor: '#FF0000', texto: `Atraso crítico: ${project.delay} dias` };
}

// Simplified types for the team members
export const teamMembers = [
  { 
    id: "1", 
    nome: "João Silva", 
    numero: "+5511999999999", 
    projetos: ["Condomínio Villa Verde"],
    ultimaMensagem: "07/04: Fundações concluídas" 
  },
  { 
    id: "2", 
    nome: "Maria Oliveira", 
    numero: "+5511988888888", 
    projetos: ["Edifício Solaris"],
    ultimaMensagem: "06/04: Iniciando instalações elétricas" 
  },
  { 
    id: "3", 
    nome: "Pedro Santos", 
    numero: "+5511977777777", 
    projetos: ["Hospital Regional"],
    ultimaMensagem: "05/04: Problema com entrega de material" 
  },
  { 
    id: "4", 
    nome: "Ana Costa", 
    numero: "+5511966666666", 
    projetos: ["Condomínio Villa Verde", "Edifício Solaris"],
    ultimaMensagem: "07/04: Concluindo a fundação" 
  }
];

// Sample chat log messages for each project
export const chatLogs = [
  {
    projectId: "1",
    messages: [
      { remetente: "João Silva", data: "09/04/2025", hora: "15:30", mensagem: "Fundações concluídas, atrasou 2 horas por chuva" },
      { remetente: "Carlos (Gerente)", data: "09/04/2025", hora: "15:45", mensagem: "Entendido. Algum problema com os materiais?" },
      { remetente: "João Silva", data: "09/04/2025", hora: "16:00", mensagem: "Não, materiais estão ok. Só a chuva mesmo que atrapalhou" },
      { remetente: "Maria Oliveira", data: "08/04/2025", hora: "14:00", mensagem: "Chegou mais cimento hoje" }
    ]
  },
  {
    projectId: "2",
    messages: [
      { remetente: "Ana Oliveira", data: "09/04/2025", hora: "10:45", mensagem: "Estrutura do 3º andar iniciada" },
      { remetente: "Pedro Santos", data: "09/04/2025", hora: "11:00", mensagem: "Estamos com um pequeno atraso na entrega do concreto" },
      { remetente: "Ana Oliveira", data: "08/04/2025", hora: "16:30", mensagem: "Concretagem do 2º andar finalizada" }
    ]
  }
];
