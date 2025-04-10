
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "@/data/projectData";
import ProjectHeader from "./ProjectHeader";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectKpis from "./ProjectKpis";
import MediaGallery from "./MediaGallery";
import PendingTasks from "./PendingTasks";
import DelayHistory from "./DelayHistory";
import MaterialConsumption from "./MaterialConsumption";
import ProjectRiskInfo from "./ProjectRiskInfo";
import ProjectChatLog from "./ProjectChatLog";
import { Project } from "@/types/project";
import { Card } from "@/components/ui/card";
import ProjectSummary from "./ProjectSummary";
import ProjectLatestPhoto from "../project-details/ProjectLatestPhoto";

export default function ProjectDetailsContainer() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(Number(id));
        setProject(data);
      } catch (error) {
        console.error("Erro ao buscar dados do projeto:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Projeto não encontrado</h2>
          <p className="text-muted-foreground">O projeto solicitado não existe ou foi removido.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <ProjectHeader project={project} />
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-5">
        {/* Coluna Esquerda */}
        <div className="xl:col-span-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-12">
              <ProjectInfoPanel project={project} />
            </div>
          </div>
          
          {/* Cards agrupados logo abaixo do Informações do Projeto */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-7">
              <MediaGallery projectId={project.id} />
            </div>
            <div className="md:col-span-5">
              <ProjectSummary project={project} />
            </div>
          </div>
          
          {/* KPIs sem informações de orçamento */}
          <ProjectKpis project={project} />
          
          {/* Outros Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-6">
              <PendingTasks projectId={project.id} />
            </div>
            <div className="md:col-span-6">
              <DelayHistory projectId={project.id} />
            </div>
          </div>
          
          <MaterialConsumption projectId={project.id} />
          <ProjectRiskInfo project={project} />
        </div>
        
        {/* Coluna Direita */}
        <div className="xl:col-span-4 space-y-5">
          {project.photos && project.photos.length > 0 && (
            <ProjectLatestPhoto photo={project.photos[project.photos.length - 1]} />
          )}
          {/* Removido o histórico de conversas */}
        </div>
      </div>
    </div>
  );
}
