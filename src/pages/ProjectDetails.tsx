
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectDetailsContainer from "@/components/project-details/ProjectDetailsContainer";
import { useNavigate, useParams } from "react-router-dom";
import { projectDetails, projects } from "@/data/projectsData";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import { getProjectDetails } from "@/data/projectData";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  useEffect(() => {
    // Carrega os detalhes do projeto
    if (id) {
      const projectData = getProjectDetails(id);
      setProject(projectData);
    }
    
    // Verifica se o projeto existe antes de renderizar
    if (id && !projectDetails[id]) {
      // Redireciona para o primeiro projeto disponível se o atual não existir
      const availableProjectIds = Object.keys(projectDetails);
      if (availableProjectIds.length > 0) {
        navigate(`/projeto/${availableProjectIds[0]}`);
      } else if (projects.length > 0) {
        // Redireciona para o primeiro projeto na lista de projetos
        navigate(`/projeto/${projects[0].id}`);
      } else {
        navigate("/projetos");
      }
    }
  }, [id, navigate]);
  
  // Define a imagem padrão caso o projeto não tenha uma
  const projectImage = project?.latestPhoto || project?.photos?.[0]?.url || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=870&auto=format&fit=crop";
  
  return (
    <AppLayout 
      title={project?.name || "Detalhes do Projeto"}
      showBackButton={true}
      onBackClick={() => navigate("/projetos")}
      projectImage={projectImage}
    >
      <ProjectDetailsContainer />
    </AppLayout>
  );
};

export default ProjectDetails;
