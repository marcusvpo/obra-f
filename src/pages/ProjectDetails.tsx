
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectDetailsContainer from "@/components/project-details/ProjectDetailsContainer";
import { useNavigate, useParams } from "react-router-dom";
import { projectDetails } from "@/data/projectsData";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import { getProjectDetails } from "@/data/projectData";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  
  useEffect(() => {
    // Load project details
    if (id) {
      const projectData = getProjectDetails(id);
      setProject(projectData);
    }
    
    // Check if project exists before rendering
    if (id && !projectDetails[id]) {
      // Redirect to first available project if current doesn't exist
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
      title={project?.name || "Detalhes do Projeto"}
      showBackButton={true}
      onBackClick={() => navigate("/projetos")}
      hideSidePadding={true}
    >
      <ProjectDetailsContainer />
    </AppLayout>
  );
};

export default ProjectDetails;
