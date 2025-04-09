
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import { Clock, Calendar, ZoomIn } from "lucide-react";
import { Project } from "@/types/project";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toggleFavorite } from "@/data/mockData";
import { Star } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onFavoriteToggle: () => void;
  saude?: {
    cor: string;
    texto: string;
  };
}

export default function ProjectCard({ project, onFavoriteToggle, saude }: ProjectCardProps) {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  
  const handleViewDetails = () => {
    navigate(`/projeto/${project.id}`);
  };
  
  const handleToggleFavorite = () => {
    toggleFavorite(project.id);
    onFavoriteToggle();
  };

  let photoUrl = project.latestPhoto;
  
  return (
    <div className="bg-card rounded-md p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in w-[250px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-base text-white">{project.name}</h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleFavorite}
            className="p-0.5 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label={project.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Star 
              size={16} 
              className={project.isFavorite ? "fill-primary text-primary" : "text-muted"} 
            />
          </button>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1 text-sm font-semibold">
          <span>Progresso</span>
          <span className="text-white text-lg text-[#FF6200]">{project.progress}%</span>
        </div>
        <ProgressBar progress={project.progress} />
      </div>

      {saude && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          <div 
            className="px-2 py-0.5 inline-block rounded-full text-xs font-medium"
            style={{ backgroundColor: saude.cor === '#FFFF00' ? 'rgba(255, 255, 0, 0.2)' : 
                                  saude.cor === '#FF0000' ? 'rgba(255, 0, 0, 0.2)' : 
                                  'rgba(0, 255, 0, 0.2)',
                   color: saude.cor === '#FFFF00' ? '#FFFF00' : 
                          saude.cor === '#FF0000' ? '#FF0000' : 
                          '#00FF00' }}
          >
            {saude.texto}
          </div>
        </div>
      )}
      
      <div className="mb-3 space-y-1.5 text-xs">
        <div className="flex items-start gap-1 text-muted">
          <Calendar size={12} className="mt-0.5 flex-shrink-0" />
          <p className="text-white">
            Previsão: {project.estimatedCompletionDate}
          </p>
        </div>
        
        {project.lastUpdateTime && (
          <div className="flex items-center gap-1 text-muted">
            <Clock size={12} className="flex-shrink-0" />
            <span>Última atualização: {project.lastUpdateTime}</span>
          </div>
        )}
      </div>
      
      {photoUrl && (
        <div className="mb-3 relative">
          <div 
            className="w-full h-28 rounded-md overflow-hidden cursor-pointer relative group"
            onClick={() => setShowImageModal(true)}
          >
            <img 
              src={photoUrl} 
              alt={`Foto recente de ${project.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <ZoomIn size={20} className="text-white" />
            </div>
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleViewDetails} 
        className="w-full bg-primary hover:bg-primary/80 text-white text-xs h-8 mt-1"
      >
        Ver Detalhes
      </Button>
      
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="bg-background border-border max-w-3xl w-[90vw]">
          <div className="w-full">
            <img 
              src={photoUrl} 
              alt={`Foto de ${project.name}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
