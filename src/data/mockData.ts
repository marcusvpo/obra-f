
import { Project, ProjectDetails, ChatLogEntry } from "@/types/project";

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
    latestPhoto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=870&auto=format&fit=crop"
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
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=873&auto=format&fit=crop"
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
    latestPhoto: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=848&auto=format&fit=crop"
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
    latestPhoto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=872&auto=format&fit=crop"
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
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=873&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Escola Municipal",
    progress: 95,
    status: "Pintura final",
    delay: null,
    lastUpdate: "07/04/2025",
    estimatedCompletionDate: "30/05/2025",
    isFavorite: false,
    latestPhoto: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1472&auto=format&fit=crop"
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
    latestPhoto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=870&auto=format&fit=crop",
    hoursWorked: "680h de 1000h planejadas",
    plannedHours: "1000",
    plannedDays: 180,
    actualDays: 180,
    managerName: "Carlos Silva",
    managerPhone: "(11) 98765-4321",
    address: "Rua das Palmeiras, 123 - São Paulo, SP",
    latitude: -23.5505,
    longitude: -46.6333,
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
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=870&auto=format&fit=crop",
        caption: "Instalações elétricas - Bloco A",
        date: "07/04/2025"
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=870&auto=format&fit=crop",
        caption: "Entrega de materiais",
        date: "05/04/2025"
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=848&auto=format&fit=crop",
        caption: "Estrutura finalizada",
        date: "02/04/2025"
      },
      {
        id: "p4",
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=872&auto=format&fit=crop",
        caption: "Montagem das formas",
        date: "25/03/2025"
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
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=873&auto=format&fit=crop",
    hoursWorked: "420h de 1000h planejadas",
    plannedHours: "1000",
    plannedDays: 240,
    actualDays: 242,
    managerName: "Ana Oliveira",
    managerPhone: "(11) 91234-5678",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    latitude: -23.5605,
    longitude: -46.6433,
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
        url: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=873&auto=format&fit=crop",
        caption: "Estrutura do 3º andar",
        date: "06/04/2025"
      },
      {
        id: "p2",
        url: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=870&auto=format&fit=crop",
        caption: "Concretagem do 2º andar",
        date: "04/04/2025"
      },
      {
        id: "p3",
        url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1472&auto=format&fit=crop",
        caption: "Montagem das formas",
        date: "01/04/2025"
      }
    ]
  }
};

// Dados para o ChatLog
export const chatLogs: ChatLogEntry[] = [
  { 
    obra: "Condomínio Villa Verde", 
    logs: [
      { data: "07/04/2025", remetente: "João (+5511999999999)", mensagem: "Instalações elétricas iniciadas no bloco A", origem: "Status no dashboard" },
      { data: "05/04/2025", remetente: "Maria (+5511988888888)", mensagem: "Recebemos os materiais elétricos e hidráulicos hoje", origem: "Atualização de materiais" },
      { data: "02/04/2025", remetente: "João (+5511999999999)", mensagem: "Estrutura de concreto do último andar finalizada", origem: "Status no dashboard" },
      { data: "28/03/2025", remetente: "Maria (+5511988888888)", mensagem: "Tivemos que pausar a concretagem por causa da chuva forte. Atraso de 1 dia.", origem: "Alerta de atraso" }
    ]
  },
  { 
    obra: "Edifício Solaris", 
    logs: [
      { data: "06/04/2025", remetente: "Pedro (+5511977777777)", mensagem: "Problemas com o fornecedor de concreto. Vamos atrasar 2 dias.", origem: "Alerta de atraso" },
      { data: "04/04/2025", remetente: "Pedro (+5511977777777)", mensagem: "Concretagem do 2º andar concluída com sucesso", origem: "Status no dashboard" },
      { data: "01/04/2025", remetente: "Ana (+5511966666666)", mensagem: "Iniciamos a montagem das formas para o 3º andar hoje", origem: "Status no dashboard" }
    ]
  }
];

// Função para buscar detalhes de um projeto
export function getProjectDetails(id: string) {
  // Se o projeto não existir nos detalhes, cria um modelo básico
  if (!projectDetails[id as keyof typeof projectDetails]) {
    const project = projects.find(p => p.id === id);
    if (!project) return null;
    
    return {
      ...project,
      hoursWorked: "Dados não disponíveis",
      managerName: "Gerente não atribuído",
      managerPhone: "Telefone não cadastrado",
      address: "Endereço não cadastrado",
      timeline: [],
      photos: []
    };
  }
  
  return projectDetails[id as keyof typeof projectDetails];
}

// Função para obter as últimas atualizações de todos os projetos
export function getLatestUpdates() {
  const updates: {projectId: string, projectName: string, update: TimelineEvent}[] = [];
  
  Object.values(projectDetails).forEach(project => {
    if (project.timeline && project.timeline.length > 0) {
      const latestUpdates = [...project.timeline].sort((a, b) => 
        new Date(b.date.split('/').reverse().join('-')).getTime() - 
        new Date(a.date.split('/').reverse().join('-')).getTime()
      ).slice(0, 2);
      
      latestUpdates.forEach(update => {
        updates.push({
          projectId: project.id,
          projectName: project.name,
          update
        });
      });
    }
  });
  
  return updates.sort((a, b) => 
    new Date(b.update.date.split('/').reverse().join('-')).getTime() - 
    new Date(a.update.date.split('/').reverse().join('-')).getTime()
  ).slice(0, 3);
}

// Função para alternar favorito
export function toggleFavorite(id: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.isFavorite = !project.isFavorite;
  }
  
  if (projectDetails[id]) {
    projectDetails[id].isFavorite = project?.isFavorite;
  }
}

// Função para atualizar status
export function updateProjectStatus(id: string, newStatus: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.status = newStatus;
    project.lastUpdate = new Date().toLocaleDateString('pt-BR');
  }
  
  if (projectDetails[id]) {
    projectDetails[id].status = newStatus;
    projectDetails[id].lastUpdate = new Date().toLocaleDateString('pt-BR');
    
    // Adiciona um novo evento na timeline
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Status atualizado: ${newStatus}`,
      description: `O status do projeto foi alterado para: ${newStatus}`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}

// Função para atualizar data de conclusão
export function updateCompletionDate(id: string, newDate: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.estimatedCompletionDate = newDate;
  }
  
  if (projectDetails[id]) {
    projectDetails[id].estimatedCompletionDate = newDate;
    
    // Adiciona um novo evento na timeline
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Data de conclusão atualizada: ${newDate}`,
      description: `A data estimada de conclusão foi alterada para: ${newDate}`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}

// Função para atualizar informações do projeto
export function updateProjectInfo(id: string, info: {
  managerName?: string;
  managerPhone?: string;
  address?: string;
}) {
  if (projectDetails[id]) {
    if (info.managerName) projectDetails[id].managerName = info.managerName;
    if (info.managerPhone) projectDetails[id].managerPhone = info.managerPhone;
    if (info.address) projectDetails[id].address = info.address;
    
    // Adiciona um novo evento na timeline
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Informações do projeto atualizadas`,
      description: `Os dados do projeto foram atualizados pelo administrador`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}
