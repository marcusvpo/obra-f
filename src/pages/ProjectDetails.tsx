
import AppLayout from "@/components/layout/AppLayout";
import ProjectDetailsContainer from "@/components/project-details/ProjectDetailsContainer";
import { useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  
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
