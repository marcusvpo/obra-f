
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectDetailsContainer from "@/components/project-details/ProjectDetailsContainer";
import { useNavigate, useParams } from "react-router-dom";
import { projectDetails } from "@/data/projectsData";

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
