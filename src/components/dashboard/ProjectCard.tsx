
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import { Clock, AlertTriangle } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  progress: number;
  status: string;
  delay?: number | null;
  lastUpdate: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/projeto/${project.id}`);
  };
  
  return (
    <div className="bg-card rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-white">{project.name}</h3>
        {project.delay && project.delay > 0 && (
          <div className="flex items-center text-primary text-sm gap-1.5">
            <AlertTriangle size={14} />
            <span>Atraso de {project.delay} {project.delay === 1 ? 'dia' : 'dias'}</span>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1.5 text-sm">
          <span>Progresso</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <ProgressBar progress={project.progress} />
      </div>
      
      <div className="mb-4 text-sm">
        <div className="flex items-start gap-1.5 text-muted">
          <Clock size={14} className="mt-1 flex-shrink-0" />
          <div>
            <p>Status: {project.status}</p>
            <p className="text-xs mt-0.5">Atualizado em {project.lastUpdate}</p>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleViewDetails} 
        className="w-full bg-primary hover:bg-primary/80 text-white"
      >
        Ver Detalhes
      </Button>
    </div>
  );
}
