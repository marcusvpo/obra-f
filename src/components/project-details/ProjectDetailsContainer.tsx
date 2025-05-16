
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHeader from "./ProjectHeader";
import ProjectSummary from "./ProjectSummary";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectKpis from "./ProjectKpis";
import ProjectTimeline from "./ProjectTimeline";
import ProjectCharts from "@/components/dashboard/ProjectCharts";
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
  
  if (!project) return <div>Projeto não encontrado.</div>;
  
  return (
    <div className="flex flex-col gap-6 mb-10">
      <ProjectHeader project={project} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProjectSummary project={project} />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="timeline">Cronograma</TabsTrigger>
              <TabsTrigger value="tasks">Tarefas</TabsTrigger>
              <TabsTrigger value="gallery">Galeria</TabsTrigger>
              <TabsTrigger value="messages">Mensagens</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <ProjectKpis project={project} />
              <ProjectCharts project={project} />
              <PendingTasks projectId={projectId} pendingTasks={project.tarefasPendentes || []} />
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
              <PendingTasks projectId={projectId} pendingTasks={project.tarefasPendentes || []} />
            </TabsContent>
            
            <TabsContent value="gallery">
              <MediaGallery projectId={projectId} photos={project.photos || []} />
            </TabsContent>
            
            <TabsContent value="messages">
              <ProjectChatLog projectId={projectId} chatLogs={project.chatLogs || []} />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <ProjectInfoPanel project={project} />
          <ProjectLatestPhoto photo={project.photos?.[0]} />
        </div>
      </div>
    </div>
  );
}
