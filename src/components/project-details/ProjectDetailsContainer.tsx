
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader from "./ProjectHeader";
import ProjectSummary from "./ProjectSummary";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectKpis from "./ProjectKpis";
import ProjectTimeline from "./ProjectTimeline";
import { ProgressTimeChart, HoursWorkedChart } from "@/components/dashboard/ProjectCharts";
import PendingTasks from "./PendingTasks";
import MediaGallery from "./MediaGallery";
import ProjectChatLog from "./ProjectChatLog";
import ProjectLatestPhoto from "./ProjectLatestPhoto";
import { getProjectDetails } from "@/data/projectData";
import { TimelineTask } from "@/types/project";
import { updateTimelineTasks } from "@/data/projectData";
import { toast } from "sonner";

export default function ProjectDetailsContainer() {
  const { id } = useParams<{ id: string }>();
  const projectId = id || "";
  const project = getProjectDetails(projectId);
  const [timelineTasks, setTimelineTasks] = useState<TimelineTask[]>(project?.timelineTasks || []);
  
  const handleTimelineUpdate = (tasks: TimelineTask[]) => {
    if (projectId) {
      updateTimelineTasks(projectId, tasks);
      setTimelineTasks(tasks);
      toast.success("Cronograma do projeto atualizado");
    }
  };
  
  const [projectName, setProjectName] = useState(project?.name || "");
  const [projectStatus, setProjectStatus] = useState(project?.status || "");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(project?.estimatedCompletionDate || "");
  const [hoursWorked, setHoursWorked] = useState(project?.hoursWorked || "");
  const [managerName, setManagerName] = useState(project?.managerName || "");
  const [managerPhone, setManagerPhone] = useState(project?.managerPhone || "");
  const [address, setAddress] = useState(project?.address || "");
  const [observations, setObservations] = useState(project?.observations || "");

  const handleProjectUpdated = (name: string, status: string) => {
    setProjectName(name);
    setProjectStatus(status);
  };

  const handleProjectSummaryUpdated = (completionDate?: string, worked?: string) => {
    if (completionDate) setEstimatedCompletionDate(completionDate);
    if (worked) setHoursWorked(worked);
  };

  const handleProjectInfoUpdated = (manager: string, phone: string, addr: string) => {
    setManagerName(manager);
    setManagerPhone(phone);
    setAddress(addr);
  };

  const handleObservationsUpdated = (obs: string) => {
    setObservations(obs);
  };
  
  if (!project) return <div>Projeto não encontrado.</div>;
  
  const kpiData = {
    activitiesPlanned: 20,
    activitiesCompleted: 12,
    inspectionsCount: 8,
    inspectionAvgResult: 85,
    wastePercentage: 4.2,
    failuresCount: 3,
    failuresByArea: [
      { area: "Alvenaria", count: 1 },
      { area: "Elétrica", count: 1 },
      { area: "Hidráulica", count: 1 }
    ]
  };
  
  return (
    <div className="flex flex-col gap-6 mb-10">
      <ProjectHeader 
        projectId={projectId} 
        projectName={projectName || project.name} 
        projectStatus={projectStatus || project.status} 
        onProjectUpdated={handleProjectUpdated} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectSummary 
            projectId={projectId}
            estimatedCompletionDate={estimatedCompletionDate || project.estimatedCompletionDate}
            hoursWorked={hoursWorked || project.hoursWorked}
            onProjectUpdated={handleProjectSummaryUpdated}
          />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="timeline">Cronograma</TabsTrigger>
              <TabsTrigger value="tasks">Tarefas</TabsTrigger>
              <TabsTrigger value="gallery">Galeria</TabsTrigger>
              <TabsTrigger value="messages">Mensagens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <ProjectKpis data={kpiData} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProgressTimeChart 
                  plannedDays={project.plannedDays || 180} 
                  actualDays={project.actualDays || 180} 
                />
                <HoursWorkedChart 
                  plannedHours={project.plannedHours || "1000"} 
                  workedHours={project.hoursWorked} 
                />
              </div>
              <PendingTasks tarefasPendentes={project.tarefasPendentes || []} />
            </TabsContent>
            
            <TabsContent value="timeline">
              <ProjectTimeline 
                projectId={projectId}
                timelineTasks={timelineTasks} 
                scheduleAdherence={project.scheduleAdherence}
                onTimelineUpdate={handleTimelineUpdate}
              />
            </TabsContent>
            
            <TabsContent value="tasks">
              <PendingTasks tarefasPendentes={project.tarefasPendentes || []} />
            </TabsContent>
            
            <TabsContent value="gallery">
              <MediaGallery 
                projectId={projectId} 
                photos={project.photos || []} 
                observations={observations || project.observations}
                onObservationsUpdated={handleObservationsUpdated}
              />
            </TabsContent>
            
            <TabsContent value="messages">
              <ProjectChatLog messages={project.chatLogs || []} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <ProjectInfoPanel 
            projectId={projectId}
            managerName={managerName || project.managerName}
            managerPhone={managerPhone || project.managerPhone}
            address={address || project.address}
            timeline={project.timeline}
            onProjectUpdated={handleProjectInfoUpdated}
          />
          <ProjectLatestPhoto photo={project.photos?.[0]} />
        </div>
      </div>
    </div>
  );
}
