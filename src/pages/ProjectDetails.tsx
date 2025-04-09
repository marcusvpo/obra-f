
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { getProjectDetails } from "@/data/mockData";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import ProjectHeader from "@/components/project-details/ProjectHeader";
import ProjectSummary from "@/components/project-details/ProjectSummary";
import MaterialConsumption from "@/components/project-details/MaterialConsumption";
import PendingTasks from "@/components/project-details/PendingTasks";
import DelayHistory from "@/components/project-details/DelayHistory";
import ProjectInfoPanel from "@/components/project-details/ProjectInfoPanel";
import MediaGallery from "@/components/project-details/MediaGallery";
import ProjectRiskInfo from "@/components/project-details/ProjectRiskInfo";
import ProjectChatLog from "@/components/project-details/ProjectChatLog";

const materialsMock = {
  cimento: { usado: 50, planejado: 100 },
  areia: { usado: 200, planejado: 300 },
  tijolos: { usado: 12000, planejado: 15000 },
  ferro: { usado: 850, planejado: 800 }
};

const tarefasPendentesMock = [
  'Falta concluir pilares - Reportado em 11/04',
  'Comprar mais cimento - Reportado em 12/04',
  'Revisar instalações elétricas - Reportado em 13/04'
];

const historicoAtrasosMock = [
  '10/04: Atraso de 2 horas - Chuva',
  '12/04: Atraso de 1 dia - Falta de material',
  '14/04: Atraso de 3 horas - Problema com fornecedor'
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const projectData = getProjectDetails(id);
    if (!projectData) {
      toast.error("Projeto não encontrado");
      navigate("/");
      return;
    }
    
    setProject(projectData);
    
    if (projectData) {
      const viewedProjects = JSON.parse(localStorage.getItem("viewedProjects") || "{}");
      viewedProjects[projectData.id] = true;
      localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects));
    }
  }, [id, navigate]);
  
  if (!project) return null;
  
  const handleProjectNameStatusUpdated = (name: string, status: string) => {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name,
        status,
        lastUpdate: new Date().toLocaleDateString('pt-BR')
      };
    });
  };
  
  const handleProjectDatesHoursUpdated = (completionDate?: string, hoursWorked?: string) => {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        estimatedCompletionDate: completionDate || prev.estimatedCompletionDate,
        hoursWorked: hoursWorked || prev.hoursWorked
      };
    });
  };
  
  const handleProjectInfoUpdated = (managerName: string, managerPhone: string, address: string) => {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        managerName,
        managerPhone,
        address
      };
    });
  };
  
  const handleObservationsUpdated = (observations: string) => {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        observations
      };
    });
  };
  
  const handleRiskUpdated = () => {
    // Atualiza o projeto quando algum alerta ou risco é resolvido
    setProject(prev => {
      if (!prev) return null;
      return { ...prev };
    });
  };

  return (
    <AppLayout 
      title={project.name}
      showBackButton={true}
      onBackClick={() => navigate("/projetos")}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <ProjectHeader 
          projectId={project.id}
          projectName={project.name}
          projectStatus={project.status}
          onProjectUpdated={handleProjectNameStatusUpdated}
        />
        
        {project.photos && project.photos.length > 0 && (
          <div className="bg-card p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Última Foto do Projeto</h2>
            <div className="flex justify-center">
              <img 
                src={project.photos[project.photos.length - 1].url} 
                alt="Última foto do projeto" 
                className="max-h-[400px] rounded-md object-contain"
              />
            </div>
          </div>
        )}
        
        <ProjectSummary 
          projectId={project.id}
          estimatedCompletionDate={project.estimatedCompletionDate}
          hoursWorked={project.hoursWorked}
          budget={project.budget}
          onProjectUpdated={handleProjectDatesHoursUpdated}
        />
        
        <ProjectRiskInfo 
          delayRisk={project.delayRisk}
          teamProductivity={project.teamProductivity}
          safetyAlerts={project.safetyAlerts}
          qualityIssues={project.qualityIssues}
          postConstructionMaintenance={project.postConstructionMaintenance}
          isCompleted={project.isCompleted}
          onHandleRiskUpdated={handleRiskUpdated}
        />
        
        <MaterialConsumption materials={materialsMock} />

        <PendingTasks initialTasks={tarefasPendentesMock} />

        <DelayHistory delays={historicoAtrasosMock} />

        <ProjectInfoPanel 
          projectId={project.id}
          managerName={project.managerName}
          managerPhone={project.managerPhone}
          address={project.address}
          timeline={project.timeline}
          onProjectUpdated={handleProjectInfoUpdated}
        />
        
        <MediaGallery 
          projectId={project.id}
          photos={project.photos}
          observations={project.observations}
          onObservationsUpdated={handleObservationsUpdated}
        />

        {/* ChatLog incorporado na página de detalhes */}
        {project.chatLogs && project.chatLogs.length > 0 && (
          <ProjectChatLog messages={project.chatLogs} />
        )}
      </div>
    </AppLayout>
  );
};

export default ProjectDetails;
