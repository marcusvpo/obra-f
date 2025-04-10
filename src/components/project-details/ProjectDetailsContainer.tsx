
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "@/data/projectData";
import ProjectHeader from "./ProjectHeader";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectKpis from "./ProjectKpis";
import MediaGallery from "./MediaGallery";
import PendingTasks from "./PendingTasks";
import DelayHistory from "./DelayHistory";
import MaterialConsumption from "./MaterialConsumption";
import ProjectRiskInfo from "./ProjectRiskInfo";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import ProjectSummary from "./ProjectSummary";
import ProjectLatestPhoto from "../project-details/ProjectLatestPhoto";
import { motion } from "framer-motion";

export default function ProjectDetailsContainer() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Use the projectDetails object directly from projectsData
        const projectId = id || "";
        const data = getProjectDetails(projectId);
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

  const handleProjectUpdated = (name?: string, status?: string) => {
    if (name || status) {
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          name: name || prev.name,
          status: status || prev.status,
        };
      });
    }
  };

  const handleInfoUpdated = (managerName?: string, managerPhone?: string, address?: string) => {
    if (managerName || managerPhone || address) {
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          managerName: managerName || prev.managerName,
          managerPhone: managerPhone || prev.managerPhone,
          address: address || prev.address,
        };
      });
    }
  };

  const handleObservationsUpdated = (observations?: string) => {
    if (observations !== undefined) {
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          observations: observations,
        };
      });
    }
  };

  const handleSummaryUpdated = (completionDate?: string, hoursWorked?: string) => {
    if (completionDate || hoursWorked) {
      setProject(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          estimatedCompletionDate: completionDate || prev.estimatedCompletionDate,
          hoursWorked: hoursWorked || prev.hoursWorked,
        };
      });
    }
  };

  const handleRiskUpdated = () => {
    // Re-fetch or update risk related data if needed
    console.log("Risk data updated");
  };
  
  return (
    <motion.div 
      className="container mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ProjectHeader 
        projectId={project.id} 
        projectName={project.name} 
        projectStatus={project.status} 
        onProjectUpdated={handleProjectUpdated} 
      />
      
      <div className="grid grid-cols-1 gap-5 mt-5">
        {/* KPIs e indicadores principais no topo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-6">
            <PendingTasks tarefasPendentes={project.tarefasPendentes || []} />
          </div>
          <div className="md:col-span-6">
            <DelayHistory timeline={project.timeline?.filter(t => t.isDelayed) || []} />
          </div>
        </div>
        
        {/* Indicadores e riscos */}
        {project.delayRisk && (
          <div className="mb-5">
            <ProjectKpis 
              data={{
                activitiesPlanned: 120,
                activitiesCompleted: project.progress ? Math.round(120 * project.progress / 100) : 0,
                inspectionsCount: 45,
                inspectionAvgResult: 85,
                wastePercentage: 4.2,
                failuresCount: 8,
                failuresByArea: [
                  { area: "Estrutura", count: 3 },
                  { area: "Elétrica", count: 2 },
                  { area: "Hidráulica", count: 2 },
                  { area: "Acabamento", count: 1 }
                ],
                reworkTimeAvg: 2.5,
                reworkTimeGoal: 2
              }} 
            />
          </div>
        )}
        
        <MaterialConsumption materiais={project.materiais} />
        
        <ProjectRiskInfo
          delayRisk={project.delayRisk}
          teamProductivity={project.teamProductivity}
          safetyAlerts={project.safetyAlerts}
          qualityIssues={project.qualityIssues}
          postConstructionMaintenance={project.postConstructionMaintenance}
          isCompleted={project.isCompleted}
          onHandleRiskUpdated={handleRiskUpdated}
        />
        
        {/* Cards movidos para o final da página */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <h2 className="text-xl font-bold mb-5">Detalhes Adicionais</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
            <div className="md:col-span-12">
              <ProjectInfoPanel 
                projectId={project.id}
                managerName={project.managerName}
                managerPhone={project.managerPhone}
                address={project.address}
                timeline={project.timeline}
                onProjectUpdated={handleInfoUpdated}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
            <div className="md:col-span-8">
              <MediaGallery 
                projectId={project.id} 
                photos={project.photos} 
                observations={project.observations}
                onObservationsUpdated={handleObservationsUpdated} 
              />
            </div>
            <div className="md:col-span-4">
              <div className="grid grid-cols-1 gap-5">
                <ProjectSummary 
                  projectId={project.id}
                  estimatedCompletionDate={project.estimatedCompletionDate}
                  hoursWorked={project.hoursWorked}
                  onProjectUpdated={handleSummaryUpdated}
                />
                
                {project.photos && project.photos.length > 0 && (
                  <ProjectLatestPhoto photo={project.photos[project.photos.length - 1]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
