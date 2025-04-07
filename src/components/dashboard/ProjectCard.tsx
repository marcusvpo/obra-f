
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import { Clock, AlertTriangle, Star, Calendar, ZoomIn, Bell } from "lucide-react";
import { Project } from "@/types/project";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toggleFavorite } from "@/data/mockData";

interface ProjectCardProps {
  project: Project;
  onFavoriteToggle: () => void;
  hasNewUpdates?: boolean;
}

export default function ProjectCard({ project, onFavoriteToggle, hasNewUpdates = false }: ProjectCardProps) {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  
  const handleViewDetails = () => {
    navigate(`/projeto/${project.id}`);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(project.id);
    onFavoriteToggle();
  };
  
  return (
    <div className="bg-card rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-white">{project.name}</h3>
        <div className="flex items-center gap-2">
          {hasNewUpdates && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
          <button
            onClick={handleToggleFavorite}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
            aria-label={project.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Star 
              size={18} 
              className={project.isFavorite ? "fill-primary text-primary" : "text-muted"} 
            />
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1.5 text-sm font-semibold">
          <span>Progresso</span>
          <span className="text-white text-base">{project.progress}%</span>
        </div>
        <ProgressBar progress={project.progress} />
      </div>
      
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-start gap-1.5 text-muted">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="flex-shrink-0" />
            {hasNewUpdates && <Bell size={14} className="text-primary animate-pulse" />}
          </div>
          <div>
            <p className="font-medium text-white">Status: {project.status}</p>
            <p className="text-xs mt-0.5">Atualizado em {project.lastUpdate}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-1.5 text-muted">
          <Calendar size={14} className="mt-1 flex-shrink-0" />
          <p className={project.delay && project.delay > 0 ? "text-amber-400" : "text-green-500"}>
            Previsão: {project.estimatedCompletionDate}
          </p>
        </div>
        
        {project.delay && project.delay > 0 && (
          <div className="flex items-center text-primary text-sm gap-1.5">
            <AlertTriangle size={14} />
            <span>Atraso de {project.delay} {project.delay === 1 ? 'dia' : 'dias'}</span>
          </div>
        )}
      </div>
      
      {project.latestPhoto && (
        <div className="mb-4 relative">
          <div 
            className="w-full h-32 rounded-md overflow-hidden cursor-pointer relative group"
            onClick={() => setShowImageModal(true)}
          >
            <img 
              src={project.latestPhoto} 
              alt={`Foto recente de ${project.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <ZoomIn size={24} className="text-white" />
            </div>
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleViewDetails} 
        className="w-full bg-primary hover:bg-primary/80 text-white"
      >
        Ver Detalhes
      </Button>
      
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="bg-background border-border max-w-3xl w-[90vw]">
          <div className="w-full">
            <img 
              src={project.latestPhoto} 
              alt={`Foto de ${project.name}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
