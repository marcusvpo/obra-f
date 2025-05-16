import { Project, ProjectDetails, TimelineTask } from "@/types/project";
import { projectDetails, projects } from "./projectsData";

export function getProjectById(id: number | string): ProjectDetails | null {
  const strId = String(id);
  return projectDetails[strId] || null;
}

export function getProjectDetails(id: string): ProjectDetails | null {
  if (!projectDetails[id]) {
    const project = projects.find(p => p.id === id);
    if (!project) return null;
    
    return {
      ...project,
      hoursWorked: "Dados não disponíveis",
      plannedHours: "1000",
      plannedDays: 180,
      actualDays: 180,
      managerName: "Gerente não atribuído",
      managerPhone: "Telefone não cadastrado",
      address: "Endereço não cadastrado",
      observations: "",
      timeline: [
        {
          id: "t1",
          date: new Date().toLocaleDateString('pt-BR'),
          title: "Início do projeto",
          description: "Projeto registrado no sistema"
        }
      ],
      timelineTasks: [],
      photos: [],
      budget: {
        planned: 0,
        estimated: 0
      },
      tarefasPendentes: [
        "Finalizar alvenaria interna",
        "Instalar fiação elétrica",
        "Resolver atraso na entrega de materiais",
        "Inspeção de qualidade nas fundações"
      ],
      delayRisk: {
        percentage: 30,
        days: 5,
        reason: "Previsão de chuvas para os próximos dias"
      },
      scheduleAdherence: {
        delayedTasksPercentage: 15,
        plannedVsActualDifference: 3,
        dynamicCompletionForecast: new Date(new Date().setDate(new Date().getDate() + 45)).toLocaleDateString('pt-BR'),
        onTrack: false
      },
      safetyAlerts: [],
      qualityIssues: [],
      teamProductivity: 75,
      postConstructionMaintenance: []
    };
  }
  
  if (!projectDetails[id].tarefasPendentes || projectDetails[id].tarefasPendentes.length === 0) {
    projectDetails[id].tarefasPendentes = [
      "Finalizar alvenaria interna do segundo andar",
      "Instalar fiação elétrica no bloco B",
      "Resolver atraso causado pela entrega do cimento",
      "Inspeção de qualidade nas fundações"
    ];
  }
  
  // Initialize schedule adherence if not exists
  if (!projectDetails[id].scheduleAdherence) {
    projectDetails[id].scheduleAdherence = {
      delayedTasksPercentage: projectDetails[id].delay ? 20 : 0,
      plannedVsActualDifference: projectDetails[id].delay || 0,
      dynamicCompletionForecast: projectDetails[id].estimatedCompletionDate,
      onTrack: !projectDetails[id].delay
    };
  }
  
  // Initialize timeline tasks if not exists
  if (!projectDetails[id].timelineTasks) {
    projectDetails[id].timelineTasks = [];
  }
  
  return projectDetails[id];
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
    
    // Update schedule adherence
    if (projectDetails[id].scheduleAdherence) {
      projectDetails[id].scheduleAdherence.dynamicCompletionForecast = newDate;
    }
    
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

export function updateTimelineTasks(id: string, tasks: TimelineTask[]) {
  if (projectDetails[id]) {
    projectDetails[id].timelineTasks = tasks;
    
    // Update schedule adherence based on task status
    if (tasks.length > 0) {
      const delayedTasks = tasks.filter(task => task.status === 'delayed');
      const delayedPercentage = Math.round((delayedTasks.length / tasks.length) * 100);
      
      // Calculate average difference in days between planned and actual
      const plannedVsActualDiff = delayedTasks.length > 0 ? 
        Math.max(1, Math.round(delayedTasks.length * 2.5)) : 0;
        
      // Update schedule adherence data
      projectDetails[id].scheduleAdherence = {
        delayedTasksPercentage: delayedPercentage,
        plannedVsActualDifference: plannedVsActualDiff,
        dynamicCompletionForecast: plannedVsActualDiff > 0 ? 
          new Date(new Date(projectDetails[id].estimatedCompletionDate.split('/').reverse().join('-')).setDate(
            new Date(projectDetails[id].estimatedCompletionDate.split('/').reverse().join('-')).getDate() + plannedVsActualDiff
          )).toLocaleDateString('pt-BR') : 
          projectDetails[id].estimatedCompletionDate,
        onTrack: delayedPercentage < 10
      };
    }
    
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Cronograma atualizado`,
      description: `O cronograma do projeto foi atualizado com ${tasks.length} tarefas`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
  }
}

export function markTaskAsComplete(id: string, taskIndex: number) {
  if (projectDetails[id] && projectDetails[id].tarefasPendentes) {
    const taskCompleted = projectDetails[id].tarefasPendentes[taskIndex];
    projectDetails[id].tarefasPendentes = projectDetails[id].tarefasPendentes.filter((_, i) => i !== taskIndex);
    
    const newEvent = {
      id: `t${Date.now()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Tarefa concluída`,
      description: `A tarefa "${taskCompleted}" foi marcada como concluída`
    };
    
    projectDetails[id].timeline = projectDetails[id].timeline 
      ? [newEvent, ...projectDetails[id].timeline] 
      : [newEvent];
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

export function updateTimelineTask(id: string, taskId: string, updates: Partial<TimelineTask>) {
  if (projectDetails[id] && projectDetails[id].timelineTasks) {
    const taskIndex = projectDetails[id].timelineTasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
      projectDetails[id].timelineTasks[taskIndex] = {
        ...projectDetails[id].timelineTasks[taskIndex],
        ...updates
      };
      
      // Update schedule adherence
      updateTimelineTasks(id, projectDetails[id].timelineTasks);
      
      const newEvent = {
        id: `t${Date.now()}`,
        date: new Date().toLocaleDateString('pt-BR'),
        title: `Tarefa atualizada: ${projectDetails[id].timelineTasks[taskIndex].name}`,
        description: `A tarefa foi atualizada no cronograma`
      };
      
      projectDetails[id].timeline = projectDetails[id].timeline 
        ? [newEvent, ...projectDetails[id].timeline] 
        : [newEvent];
    }
  }
}

// New function to process message and update project timeline
export function processWorkerMessage(projectId: string, workerId: string, workerName: string, message: string) {
  if (!projectDetails[projectId] || !projectDetails[projectId].timelineTasks) {
    return null;
  }
  
  // Simplified AI simulation: search for task names in the message
  const timelineTasks = projectDetails[projectId].timelineTasks;
  const lowerMessage = message.toLowerCase();
  
  // Keywords that indicate problems
  const delayKeywords = [
    'atraso', 'atrasado', 'não conseguimos', 'problema', 'dificuldade', 
    'impedimento', 'adiado', 'postergado', 'não vai dar'
  ];
  
  // Keywords that indicate progress
  const progressKeywords = [
    'concluído', 'concluida', 'finalizado', 'finalizada', 'terminado', 'terminada',
    'avançando', 'progresso', 'adiantado', 'completado', 'completada'
  ];
  
  // Check if the message mentions any task
  for (const task of timelineTasks) {
    const taskName = task.name.toLowerCase();
    const taskNameWords = taskName.split(' ');
    
    // Check if the message contains the task name or at least 2 significant words from the task name
    const containsTaskName = lowerMessage.includes(taskName) || 
      taskNameWords.filter(word => word.length > 3 && lowerMessage.includes(word)).length >= 2;
    
    if (containsTaskName) {
      // Check if message indicates a delay
      const isDelayMessage = delayKeywords.some(keyword => lowerMessage.includes(keyword));
      
      // Check if message indicates progress
      const isProgressMessage = progressKeywords.some(keyword => lowerMessage.includes(keyword));
      
      if (isDelayMessage) {
        // Update task to delayed status
        updateTimelineTask(projectId, task.id, { 
          status: "delayed",
          description: `${task.description || ''}\n[${new Date().toLocaleDateString('pt-BR')}] ${workerName}: ${message}`
        });
        
        // Create timeline event
        const newEvent = {
          id: `t${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          title: `Atraso reportado na tarefa: ${task.name}`,
          description: `${workerName} reportou um problema: "${message}"`,
          isDelayed: true
        };
        
        projectDetails[projectId].timeline = projectDetails[projectId].timeline 
          ? [newEvent, ...projectDetails[projectId].timeline] 
          : [newEvent];
          
        return {
          taskId: task.id,
          taskName: task.name,
          status: 'delayed',
          message: `Atraso detectado na tarefa "${task.name}"`
        };
      } 
      else if (isProgressMessage) {
        // Update task progress
        const newProgress = Math.min(100, task.progress + 20);
        const newStatus = newProgress >= 100 ? "completed" : "in_progress";
        
        updateTimelineTask(projectId, task.id, { 
          status: newStatus,
          progress: newProgress,
          description: `${task.description || ''}\n[${new Date().toLocaleDateString('pt-BR')}] ${workerName}: ${message}`
        });
        
        // Create timeline event
        const newEvent = {
          id: `t${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          title: `Progresso na tarefa: ${task.name}`,
          description: `${workerName} reportou: "${message}"`
        };
        
        projectDetails[projectId].timeline = projectDetails[projectId].timeline 
          ? [newEvent, ...projectDetails[projectId].timeline] 
          : [newEvent];
          
        return {
          taskId: task.id,
          taskName: task.name,
          status: newStatus,
          message: `Progresso detectado na tarefa "${task.name}": ${newProgress}%`
        };
      }
    }
  }
  
  return null;
}
