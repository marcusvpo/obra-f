import { Project, ProjectDetails } from "@/types/project";
import { projectDetails, projects } from "./projectsData";

export function getProjectById(id: number | string): ProjectDetails | null {
  const strId = String(id);
  return projectDetails[strId] || null;
}

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
