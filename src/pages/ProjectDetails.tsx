
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Clock, FastForward } from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import ProgressBar from "@/components/dashboard/ProgressBar";
import TimelineItem from "@/components/dashboard/TimelineItem";
import PhotoGallery from "@/components/dashboard/PhotoGallery";
import { getProjectDetails } from "@/data/mockData";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectDetails(id || "");
  
  useEffect(() => {
    if (!project) {
      toast.error("Projeto não encontrado");
      navigate("/");
    }
  }, [project, navigate]);
  
  if (!project) return null;
  
  const handleExportReport = () => {
    toast.success("Relatório gerado com sucesso!");
  };
  
  return (
    <AppLayout 
      title={project.name} 
      showBackButton={true}
      onBackClick={() => navigate("/")}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* KPIs Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <KpiCard 
            title="Progresso" 
            value={`${project.progress}%`}
            icon={<FastForward size={18} />}
          />
          <KpiCard 
            title="Data de Conclusão" 
            value={project.estimatedCompletionDate}
            icon={<Calendar size={18} />}
          />
          <KpiCard 
            title="Horas Trabalhadas" 
            value={project.hoursWorked}
            icon={<Clock size={18} />}
          />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-card p-5 rounded-lg">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Progresso do Projeto</h3>
            <span>{project.progress}%</span>
          </div>
          <ProgressBar progress={project.progress} size="lg" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Linha do Tempo</h2>
            </div>
            <div className="bg-card p-5 rounded-lg">
              {project.timeline && project.timeline.length > 0 ? (
                <div className="pl-2 pt-2">
                  {project.timeline.map((event, index) => (
                    <TimelineItem 
                      key={event.id} 
                      event={event} 
                      isLast={index === project.timeline.length - 1}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center py-4">Nenhuma atualização disponível</p>
              )}
            </div>
          </div>
          
          {/* Project Information */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Informações do Projeto</h2>
            </div>
            <div className="bg-card p-5 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-muted">Gerente Responsável</h4>
                  <p>{project.managerName}</p>
                </div>
                <div>
                  <h4 className="text-sm text-muted">Contato</h4>
                  <p>{project.managerPhone}</p>
                </div>
                <div>
                  <h4 className="text-sm text-muted">Endereço</h4>
                  <p>{project.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Photos Gallery */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Galeria de Fotos</h2>
          </div>
          <div className="bg-card p-5 rounded-lg">
            {project.photos && project.photos.length > 0 ? (
              <PhotoGallery images={project.photos} />
            ) : (
              <p className="text-muted text-center py-4">Nenhuma foto disponível</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleExportReport} 
            className="bg-primary hover:bg-primary/80 text-white gap-2"
          >
            <Download size={16} />
            <span>Exportar Relatório</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetails;
