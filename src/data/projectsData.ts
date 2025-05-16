import { Project, ProjectDetails, AlertItem, MaintenanceItem, ChatMessage, TimelineEvent, TimelineTask, ScheduleAdherence } from "@/types/project";

// Helper function to convert string alerts to AlertItem objects
export const convertStringToAlertItem = (alertString: string): AlertItem => {
  const [date, ...descriptionParts] = alertString.split(': ');
  const description = descriptionParts.join(': ');
  return {
    date,
    title: description,
    description
  };
};

// Helper function to convert string maintenance to MaintenanceItem objects
export const convertStringToMaintenanceItem = (maintenanceString: string): MaintenanceItem => {
  const [title, date] = maintenanceString.split(' - ');
  return {
    title,
    description: title,
    date: date || "",
    isCompleted: false
  };
};

// Helper function to generate timeline tasks for a project
export const generateTimelineTasksForProject = (projectId: string): TimelineTask[] => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 30); // Start 30 days ago
  
  // Adjust based on project ID to get different timelines
  const projectSeed = parseInt(projectId, 10) || 1;
  const tasks: TimelineTask[] = [];
  
  // Common phases for construction projects
  const phases = [
    "Preparação do terreno",
    "Fundação",
    "Estrutura",
    "Alvenaria",
    "Instalações elétricas",
    "Instalações hidráulicas",
    "Acabamentos internos",
    "Acabamentos externos",
    "Pintura",
    "Testes e comissionamento",
  ];
  
  // Responsible people
  const responsiblePeople = [
    "João Silva",
    "Maria Oliveira",
    "Carlos Mendes",
    "Ana Santos",
    "Roberto Alves",
    "Antonio Pereira"
  ];
  
  // Generate progress based on project ID
  let currentDate = new Date(startDate);
  let progress = projectSeed * 10; // Higher ID = more progress
  if (progress > 100) progress = 85;
  
  // Make sure to have some completed, in-progress, and not-started tasks
  for (let i = 0; i < phases.length; i++) {
    // Duration varies by phase (5-20 days)
    const duration = 5 + (i * 2 % 15);
    const phaseProgress = Math.max(0, Math.min(100, progress - (i * 10)));
    
    let status: "completed" | "in_progress" | "delayed" | "not_started";
    if (phaseProgress >= 100) {
      status = "completed";
    } else if (phaseProgress > 0) {
      status = i % 4 === 0 ? "delayed" : "in_progress"; // Some random delays
    } else {
      status = "not_started";
    }
    
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + duration);
    
    tasks.push({
      id: `${projectId}-task-${i}`,
      name: phases[i],
      startDate: format(currentDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      responsiblePerson: responsiblePeople[i % responsiblePeople.length],
      progress: phaseProgress,
      status,
      description: status === "delayed" ? "Atraso devido a problemas com fornecedores ou condições climáticas" : undefined
    });
    
    // Move to next phase start date (some overlap)
    currentDate.setDate(currentDate.getDate() + Math.floor(duration * 0.8));
  }
  
  return tasks;
};

// Generate schedule adherence data based on timeline tasks
export const generateScheduleAdherenceForTasks = (tasks: TimelineTask[]): ScheduleAdherence => {
  const delayedTasks = tasks.filter(task => task.status === "delayed");
  const delayedTasksPercentage = Math.round((delayedTasks.length / tasks.length) * 100);
  
  // Calculate planned vs actual difference
  const plannedVsActualDifference = delayedTasks.length > 0 ? 
    Math.max(1, Math.round(delayedTasks.length * 2.5)) : 0;
  
  // Generate forecast date
  const today = new Date();
  const forecastDate = new Date(today);
  forecastDate.setDate(forecastDate.getDate() + 60 + plannedVsActualDifference);
  
  return {
    delayedTasksPercentage,
    plannedVsActualDifference,
    dynamicCompletionForecast: format(forecastDate, 'dd/MM/yyyy'),
    onTrack: delayedTasksPercentage < 15
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
      convertStringToAlertItem("11/04: Trabalhador sem capacete detectado"),
      convertStringToAlertItem("12/04: Andaime instável")
    ],
    qualityIssues: [
      convertStringToAlertItem("11/04: Rachadura na fundação"),
      convertStringToAlertItem("12/04: Acabamento irregular")
    ],
    teamProductivity: 75,
    postConstructionMaintenance: [
      convertStringToMaintenanceItem("Verificar fundações - 15/10/2025")
    ],
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
    ],
    chatLogs: [
      { data: "09/04/2025", hora: "15:30", remetente: "João", mensagem: "Finalizada instalação elétrica em 5 apartamentos do bloco B", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "14:15", remetente: "João", mensagem: "Iniciando instalação elétrica no bloco B", origem: "Status no dashboard" },
      { data: "07/04/2025", hora: "16:45", remetente: "João", mensagem: "Instalações elétricas iniciadas no bloco A", origem: "Status no dashboard" }
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
      convertStringToAlertItem("10/04: Equipe sem proteção adequada para altura"),
      convertStringToAlertItem("08/04: Material empilhado incorretamente")
    ],
    qualityIssues: [
      convertStringToAlertItem("07/04: Coluna com alinhamento incorreto"),
      convertStringToAlertItem("05/04: Problema na compactação do solo")
    ],
    teamProductivity: 65,
    postConstructionMaintenance: [
      convertStringToMaintenanceItem("Verificar estrutura do 3º andar - 20/12/2025")
    ],
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
    ],
    chatLogs: [
      { data: "09/04/2025", hora: "10:45", remetente: "Ana", mensagem: "Recebemos parte do concreto com atraso", origem: "Status no dashboard" },
      { data: "06/04/2025", hora: "14:30", remetente: "Pedro", mensagem: "Problemas com o fornecedor de concreto. Vamos atrasar 2 dias.", origem: "Alerta de atraso" },
      { data: "04/04/2025", hora: "16:15", remetente: "Pedro", mensagem: "Concretagem do 2º andar concluída com sucesso", origem: "Status no dashboard" }
    ]
  }
};

// Add timeline tasks to project details
for (const projectId of Object.keys(projectDetails)) {
  if (!projectDetails[projectId].timelineTasks || projectDetails[projectId].timelineTasks.length === 0) {
    const timelineTasks = generateTimelineTasksForProject(projectId);
    projectDetails[projectId].timelineTasks = timelineTasks;
    
    // Add schedule adherence based on tasks
    projectDetails[projectId].scheduleAdherence = generateScheduleAdherenceForTasks(timelineTasks);
  }
}

export const getLatestUpdates = () => {
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
};

export const getDelayedProjects = () => {
  return projects.filter(p => p.delay && p.delay > 0);
};

export const getCompletedProjects = () => {
  return projects.filter(p => p.isCompleted === true);
};
