import { Project, ProjectDetails, ChatLogEntry, TimelineEvent, AlertItem, MaintenanceItem } from "@/types/project";

// Helper function to convert string alerts to AlertItem objects
const convertStringToAlertItem = (alertString: string): AlertItem => {
  const [date, ...descriptionParts] = alertString.split(': ');
  const description = descriptionParts.join(': ');
  return {
    date,
    title: description,
    description
  };
};

// Helper function to convert string maintenance to MaintenanceItem objects
const convertStringToMaintenanceItem = (maintenanceString: string): MaintenanceItem => {
  const [title, date] = maintenanceString.split(' - ');
  return {
    title,
    description: title,
    date: date || "",
    isCompleted: false
  };
};

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
    latestPhoto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=870&auto=format&fit=crop",
    pendingTasks: 2,
    todayUpdates: 3,
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
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=873&auto=format&fit=crop",
    pendingTasks: 4,
    todayUpdates: 1,
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
    latestPhoto: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=848&auto=format&fit=crop",
    pendingTasks: 1,
    todayUpdates: 2,
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
    latestPhoto: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=872&auto=format&fit=crop",
    pendingTasks: 5,
    todayUpdates: 0,
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
    latestPhoto: "https://images.unsplash.com/photo-1599707367072-cd6ada2e0a65?q=80&w=873&auto=format&fit=crop",
    pendingTasks: 3,
    todayUpdates: 2,
    lastUpdateTime: "09/04/2025 às 11:10"
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
    latestPhoto: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1472&auto=format&fit=crop",
    pendingTasks: 1,
    todayUpdates: 4,
    lastUpdateTime: "09/04/2025 às 16:45",
    isCompleted: true
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
    observations: "Obra progredindo dentro do cronograma. Materiais sendo entregues conforme planejado. Equipe completa trabalhando no local.",
    pendingTasks: 2,
    todayUpdates: 3,
    lastUpdateTime: "09/04/2025 às 15:30",
    budget: {
      planned: 1400000,
      estimated: 1500000
    },
    delayRisk: {
      percentage: 30,
      days: 5,
      reason: "Chuva prevista e consumo de cimento acima do planejado"
    },
    safetyAlerts: [
      "11/04: Trabalhador sem capacete detectado",
      "12/04: Andaime instável"
    ].map(convertStringToAlertItem),
    qualityIssues: [
      "11/04: Rachadura na fundação",
      "12/04: Acabamento irregular"
    ].map(convertStringToAlertItem),
    teamProductivity: 75,
    postConstructionMaintenance: [
      "Verificar fundações - 15/10/2025"
    ].map(convertStringToMaintenanceItem),
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
    observations: "Problemas com fornecedor de concreto causaram um atraso de 2 dias. Estamos buscando alternativas para recuperar o tempo perdido.",
    pendingTasks: 4,
    todayUpdates: 1,
    lastUpdateTime: "09/04/2025 às 10:45",
    budget: {
      planned: 2500000,
      estimated: 2650000
    },
    delayRisk: {
      percentage: 45,
      days: 7,
      reason: "Fornecedor de concreto com problemas de entrega e previsão de chuvas"
    },
    safetyAlerts: [
      "10/04: Equipe sem proteção adequada para altura",
      "08/04: Material empilhado incorretamente"
    ].map(convertStringToAlertItem),
    qualityIssues: [
      "07/04: Coluna com alinhamento incorreto",
      "05/04: Problema na compactação do solo"
    ].map(convertStringToAlertItem),
    teamProductivity: 65,
    postConstructionMaintenance: [
      "Verificar estrutura do 3º andar - 20/12/2025"
    ].map(convertStringToMaintenanceItem),
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

export const chatLogs: ChatLogEntry[] = [
  { 
    obra: "Condomínio Villa Verde", 
    logs: [
      { data: "09/04/2025", hora: "15:30", remetente: "João (+5511999999999)", mensagem: "Finalizada instalação elétrica em 5 apartamentos do bloco B", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "14:15", remetente: "João (+5511999999999)", mensagem: "Iniciando instalação elétrica no bloco B", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "10:20", remetente: "Maria (+5511988888888)", mensagem: "Entregue novo lote de materiais elétricos", origem: "Atualização de materiais" },
      { data: "07/04/2025", hora: "16:45", remetente: "João (+5511999999999)", mensagem: "Instalações elétricas iniciadas no bloco A", origem: "Status no dashboard" },
      { data: "05/04/2025", hora: "11:30", remetente: "Maria (+5511988888888)", mensagem: "Recebemos os materiais elétricos e hidráulicos hoje", origem: "Atualização de materiais" },
      { data: "02/04/2025", hora: "17:20", remetente: "João (+5511999999999)", mensagem: "Estrutura de concreto do último andar finalizada", origem: "Status no dashboard" },
      { data: "28/03/2025", hora: "09:15", remetente: "Maria (+5511988888888)", mensagem: "Tivemos que pausar a concretagem por causa da chuva forte. Atraso de 1 dia.", origem: "Alerta de atraso" }
    ]
  },
  { 
    obra: "Edifício Solaris", 
    logs: [
      { data: "09/04/2025", hora: "10:45", remetente: "Ana (+5511966666666)", mensagem: "Recebemos parte do concreto com atraso", origem: "Status no dashboard" },
      { data: "06/04/2025", hora: "14:30", remetente: "Pedro (+5511977777777)", mensagem: "Problemas com o fornecedor de concreto. Vamos atrasar 2 dias.", origem: "Alerta de atraso" },
      { data: "04/04/2025", hora: "16:15", remetente: "Pedro (+5511977777777)", mensagem: "Concretagem do 2º andar concluída com sucesso", origem: "Status no dashboard" },
      { data: "01/04/2025", hora: "08:45", remetente: "Ana (+5511966666666)", mensagem: "Iniciamos a montagem das formas para o 3º andar hoje", origem: "Status no dashboard" }
    ]
  },
  {
    obra: "Residencial Monte Alto",
    logs: [
      { data: "09/04/2025", hora: "14:15", remetente: "Carlos (+5511955555555)", mensagem: "Acabamento de 70% dos apartamentos concluído", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "09:30", remetente: "Carlos (+5511955555555)", mensagem: "Recebemos os materiais para finalização", origem: "Atualizaç��o de materiais" },
      { data: "07/04/2025", hora: "13:00", remetente: "Carlos (+5511955555555)", mensagem: "Acabamentos avançando conforme planejado", origem: "Status no dashboard" }
    ]
  },
  {
    obra: "Shopping Center Plaza",
    logs: [
      { data: "08/04/2025", hora: "16:20", remetente: "Roberto (+5511944444444)", mensagem: "Fundações concluídas, mas com 5 dias de atraso", origem: "Status no dashboard" },
      { data: "05/04/2025", hora: "11:45", remetente: "Roberto (+5511944444444)", mensagem: "Problemas na fundação estão causando atrasos significativos", origem: "Alerta de atraso" }
    ]
  },
  {
    obra: "Hospital Regional",
    logs: [
      { data: "09/04/2025", hora: "11:10", remetente: "Paula (+5511933333333)", mensagem: "Instalações hidráulicas no 2º andar concluídas", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "10:05", remetente: "Paula (+5511933333333)", mensagem: "Recebemos novos materiais hidráulicos", origem: "Atualização de materiais" },
      { data: "07/04/2025", hora: "15:30", remetente: "Paula (+5511933333333)", mensagem: "Iniciando instalações hidráulicas no 2º andar", origem: "Status no dashboard" }
    ]
  },
  {
    obra: "Escola Municipal",
    logs: [
      { data: "09/04/2025", hora: "16:45", remetente: "Marcelo (+5511922222222)", mensagem: "Pintura externa concluída 100%", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "14:30", remetente: "Marcelo (+5511922222222)", mensagem: "95% da pintura externa finalizada", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "11:45", remetente: "Marcelo (+5511922222222)", mensagem: "Recebemos mais tinta para finalização", origem: "Atualização de materiais" },
      { data: "09/04/2025", hora: "09:20", remetente: "Marcelo (+5511922222222)", mensagem: "Iniciando último dia de pintura externa", origem: "Status no dashboard" },
      { data: "07/04/2025", hora: "17:10", remetente: "Marcelo (+5511922222222)", mensagem: "85% da pintura externa finalizada", origem: "Status no dashboard" }
    ]
  }
];

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
      photos: [],
      budget: {
        planned: 0,
        estimated: 0
      },
      delayRisk: {
        percentage: 0,
        days: 0,
        reason: ""
      },
      safetyAlerts: [],
      qualityIssues: [],
      teamProductivity: 0,
      postConstructionMaintenance: []
    };
  }
  
  return projectDetails[id as keyof typeof projectDetails];
}

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

export function getDelayedProjects() {
  return projects.filter(p => p.delay && p.delay > 0);
}

export function getCompletedProjects() {
  return projects.filter(p => p.isCompleted === true);
}

export function getTotalActiveAlerts() {
  let safetyAlerts = 0;
  let materialsAlerts = 0;
  let qualityAlerts = 0;
  
  Object.values(projectDetails).forEach(project => {
    if (project.safetyAlerts) safetyAlerts += project.safetyAlerts.length;
    if (project.materiais) {
      Object.values(project.materiais).forEach(m => {
        if (m.usado > m.planejado) materialsAlerts++;
      });
    }
    if (project.qualityIssues) qualityAlerts += project.qualityIssues.length;
  });
  
  return {
    total: safetyAlerts + materialsAlerts + qualityAlerts,
    safety: safetyAlerts,
    materials: materialsAlerts,
    quality: qualityAlerts
  };
}

export function getProjectUpdatesForToday() {
  const today = "09/04/2025"; // Current date
  const updates: Record<string, number> = {};
  
  chatLogs.forEach(log => {
    const todayLogs = log.logs.filter(l => l.data === today);
    updates[log.obra] = todayLogs.length;
  });
  
  return updates;
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

export function updateProjectStatus(id: string, newStatus: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.status = newStatus;
    project.lastUpdate = new Date().toLocaleDateString('pt-BR');
  }
  
  if (projectDetails[id]) {
    projectDetails[id].status = newStatus;
    projectDetails[id].lastUpdate = new Date().toLocaleDateString('pt-BR');
    
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

export function updateCompletionDate(id: string, newDate: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.estimatedCompletionDate = newDate;
  }
  
  if (projectDetails[id]) {
    projectDetails[id].estimatedCompletionDate = newDate;
    
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

export function updateProjectInfo(id: string, info: {
  managerName?: string;
  managerPhone?: string;
  address?: string;
}) {
  if (projectDetails[id]) {
    if (info.managerName) projectDetails[id].managerName = info.managerName;
    if (info.managerPhone) projectDetails[id].managerPhone = info.managerPhone;
    if (info.address) projectDetails[id].address = info.address;
    
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

export function updateProjectName(id: string, name: string) {
  const project = projects.find(p => p.id === id);
  if (project) {
    project.name = name;
  }
  
  if (projectDetails[id]) {
    projectDetails[id].name = name;
    
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Nome do projeto atualizado`,
      description: `O nome do projeto foi alterado para: ${name}`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}

export function updateWorkedHours(id: string, hours: string) {
  if (projectDetails[id]) {
    projectDetails[id].hoursWorked = hours;
    
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Horas trabalhadas atualizadas`,
      description: `As horas trabalhadas foram atualizadas para: ${hours}`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}

export function updateObservations(id: string, observations: string) {
  if (projectDetails[id]) {
    projectDetails[id].observations = observations;
    
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Observações atualizadas`,
      description: `As observações do projeto foram atualizadas`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}

export function markTaskAsComplete(id: string, taskIndex: number) {
  if (projectDetails[id] && projectDetails[id].tarefasPendentes) {
    projectDetails[id].tarefasPendentes = projectDetails[id].tarefasPendentes.filter((_, i) => i !== taskIndex);
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
