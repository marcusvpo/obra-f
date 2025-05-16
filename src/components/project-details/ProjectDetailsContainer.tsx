
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader from "./ProjectHeader";
import ProjectSummary from "./ProjectSummary";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectKpis from "./ProjectKpis";
import ProjectTimeline from "./ProjectTimeline";
import PendingTasks from "./PendingTasks";
import ProjectGallery from "./ProjectGallery";
import ProjectChatLog from "./ProjectChatLog";
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
  const [managerName, setManagerName] = useState(project?.managerName || "");
  const [managerPhone, setManagerPhone] = useState(project?.managerPhone || "");
  const [address, setAddress] = useState(project?.address || "");
  const [observations, setObservations] = useState(project?.observations || "");

  const handleProjectUpdated = (name: string, status: string) => {
    setProjectName(name);
    setProjectStatus(status);
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
  
  return (
    <div className="flex flex-col">
      {/* Project Header - Full Width */}
      <ProjectHeader 
        projectId={projectId} 
        projectName={projectName || project.name} 
        projectStatus={projectStatus || project.status}
        projectProgress={project.progress}
        estimatedCompletionDate={estimatedCompletionDate || project.estimatedCompletionDate}
        managerName={managerName || project.managerName}
        managerPhone={managerPhone || project.managerPhone}
        address={address || project.address}
        onProjectUpdated={handleProjectUpdated}
        onProjectInfoUpdated={handleProjectInfoUpdated}
      />
      
      {/* Main Content */}
      <div className="container px-4 py-6 mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="timeline">Cronograma</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Project KPIs */}
                <ProjectKpis data={{
                  activitiesPlanned: 20,
                  activitiesCompleted: 12,
                  inspectionsCount: 8,
                  inspectionAvgResult: 85,
                  failuresByArea: [
                    { area: "Alvenaria", count: 1 },
                    { area: "Elétrica", count: 1 },
                    { area: "Hidráulica", count: 1 }
                  ]
                }} />
                
                {/* Gallery Preview */}
                <ProjectGallery 
                  projectId={projectId}
                  photos={project.photos || []}
                  limit={3}
                  showViewAllButton={true}
                  observations={observations || project.observations}
                  onObservationsUpdated={handleObservationsUpdated}
                />
                
                {/* Project Chat Log Preview */}
                <ProjectChatLog 
                  messages={project.chatLogs || []}
                  limit={5}
                  showViewAllButton={true}
                />
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
                
                {/* Tasks Preview */}
                <PendingTasks tarefasPendentes={project.tarefasPendentes || []} />
              </div>
            </div>
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
          
          <TabsContent value="messages">
            <ProjectChatLog messages={project.chatLogs || []} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
