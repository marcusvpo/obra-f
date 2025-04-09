
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import { Clock, Calendar, ZoomIn, Bell, AlertTriangle, ClipboardList, ArrowRight } from "lucide-react";
import { Project } from "@/types/project";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toggleFavorite } from "@/data/mockData";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  if (project.id === "2") {
    photoUrl = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=873&auto=format&fit=crop";
  } else if (project.id === "5") {
    photoUrl = "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=873&auto=format&fit=crop";
  }
  
  return (
    <div className="bg-card rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-white">{project.name}</h3>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>
                {project.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1.5 text-sm font-semibold">
          <span>Progresso</span>
          <span className="text-white text-base">{project.progress}%</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ProgressBar progress={project.progress} gradient={true} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              Progresso: {project.progress}%
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {saude && (
        <div className="mb-4 flex flex-wrap gap-2">
          <div 
            className="px-3 py-1 inline-block rounded-full text-xs font-medium"
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
      
      <div className="mb-4 space-y-2 text-sm">
        <div className="flex items-start gap-1.5 text-muted">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="flex-shrink-0" />
          </div>
          <div>
            <p className="font-medium text-white">Status: {project.status}</p>
            <p className="text-xs mt-0.5">Atualizado em {project.lastUpdate}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-1.5 text-muted">
          <Calendar size={14} className="mt-1 flex-shrink-0" />
          <p className="text-white">
            Previsão: {project.estimatedCompletionDate}
          </p>
        </div>
        
        {/* New indicators */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {project.pendingTasks !== undefined && (
            <div className="flex items-center gap-1.5 bg-[#3A3A3A] rounded-md p-2">
              <ClipboardList size={14} className="text-primary" />
              <span className="text-xs">Pendências: <span className="text-primary">{project.pendingTasks}</span></span>
            </div>
          )}
          
          {project.todayUpdates !== undefined && (
            <div className="flex items-center gap-1.5 bg-[#3A3A3A] rounded-md p-2">
              <Bell size={14} className="text-primary" />
              <span className="text-xs">Atualizações hoje: <span className="text-primary">{project.todayUpdates}</span></span>
            </div>
          )}
        </div>
        
        {project.lastUpdateTime && (
          <div className="flex items-center gap-1.5 text-xs text-muted mt-2">
            <Clock size={12} />
            <span>Última atualização: {project.lastUpdateTime}</span>
          </div>
        )}
      </div>
      
      {photoUrl && (
        <div className="mb-4 relative">
          <div 
            className="w-full h-32 rounded-md overflow-hidden cursor-pointer relative group"
            onClick={() => setShowImageModal(true)}
          >
            <img 
              src={photoUrl} 
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
        className="w-full bg-primary hover:bg-primary/80 text-white flex items-center justify-center gap-1"
      >
        Ver Detalhes
        <ArrowRight size={14} />
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
