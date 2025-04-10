
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getProjectDetails } from "@/data/projectData";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import ProjectHeader from "./ProjectHeader";
import ProjectSummary from "./ProjectSummary";
import ProjectRiskInfo from "./ProjectRiskInfo";
import MaterialConsumption from "./MaterialConsumption";
import PendingTasks from "./PendingTasks";
import DelayHistory from "./DelayHistory";
import ProjectInfoPanel from "./ProjectInfoPanel";
import MediaGallery from "./MediaGallery";
import ProjectChatLog from "./ProjectChatLog";
import ProjectLatestPhoto from "./ProjectLatestPhoto";
import ProjectKpis from "./ProjectKpis";

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

// Mock data for new KPIs
const kpisMock = {
  activitiesPlanned: 40,
  activitiesCompleted: 32,
  inspectionsCount: 5,
  inspectionAvgResult: 90,
  wastePercentage: 7,
  failuresCount: 12,
  failuresByArea: [
    { area: "Estrutura", count: 4 },
    { area: "Elétrica", count: 5 },
    { area: "Acabamento", count: 3 }
  ],
  reworkTimeAvg: 2,
  reworkTimeGoal: 1
};

export default function ProjectDetailsContainer() {
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
  
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProjectHeader 
        projectId={project.id}
        projectName={project.name}
        projectStatus={project.status}
        onProjectUpdated={handleProjectNameStatusUpdated}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProjectSummary 
            projectId={project.id}
            estimatedCompletionDate={project.estimatedCompletionDate}
            hoursWorked={project.hoursWorked}
            budget={project.budget}
            onProjectUpdated={handleProjectDatesHoursUpdated}
          />
        </div>
        
        <div className="bg-[#353535] p-5 rounded-lg shadow-md border-l-4 border-[#FF6200]">
          <h2 className="text-lg font-semibold mb-3">Status do Projeto</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Progresso:</span>
              <span className="font-bold text-[#FF6200]">{project.progress}%</span>
            </div>
            <div className="w-full bg-[#222222] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#FF6200] to-[#FFAA00] h-2 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Status:</span>
              <span className="font-medium text-white bg-primary/20 px-2 py-0.5 rounded-full text-sm">{project.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Última atualização:</span>
              <span>{project.lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>

      <ProjectRiskInfo 
        delayRisk={project.delayRisk}
        teamProductivity={project.teamProductivity}
        safetyAlerts={project.safetyAlerts || []}
        qualityIssues={project.qualityIssues || []}
        postConstructionMaintenance={project.postConstructionMaintenance || []}
        isCompleted={project.isCompleted}
        onHandleRiskUpdated={handleRiskUpdated}
      />
      
      <ProjectKpis data={kpisMock} />
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MaterialConsumption materials={materialsMock} />
        <PendingTasks initialTasks={tarefasPendentesMock} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DelayHistory delays={historicoAtrasosMock} />
        </div>
        
        {project.photos && project.photos.length > 0 && (
          <div>
            <ProjectLatestPhoto photo={project.photos[project.photos.length - 1]} />
          </div>
        )}
      </div>

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

      <ProjectChatLog messages={project.chatLogs || []} />
    </div>
  );
  
  function handleProjectNameStatusUpdated(name: string, status: string) {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        name,
        status,
        lastUpdate: new Date().toLocaleDateString('pt-BR')
      };
    });
  }
  
  function handleProjectDatesHoursUpdated(completionDate?: string, hoursWorked?: string) {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        estimatedCompletionDate: completionDate || prev.estimatedCompletionDate,
        hoursWorked: hoursWorked || prev.hoursWorked
      };
    });
  }
  
  function handleProjectInfoUpdated(managerName: string, managerPhone: string, address: string) {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        managerName,
        managerPhone,
        address
      };
    });
  }
  
  function handleObservationsUpdated(observations: string) {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        observations
      };
    });
  }
  
  function handleRiskUpdated() {
    setProject(prev => {
      if (!prev) return null;
      return { ...prev };
    });
  }
}
