
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectDetailsContainer from "@/components/project-details/ProjectDetailsContainer";
import { useNavigate, useParams } from "react-router-dom";
import { projectDetails, projects } from "@/data/projectsData";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
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
  
  return (
    <AppLayout 
      title="Detalhes do Projeto"
      showBackButton={true}
      onBackClick={() => navigate("/projetos")}
    >
      <ProjectDetailsContainer />
    </AppLayout>
  );
};

export default ProjectDetails;
