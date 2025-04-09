
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getProjectDetails } from "@/data/mockData";
import { ProjectDetails as ProjectDetailsType } from "@/types/project";
import PhotoGallery from "@/components/dashboard/PhotoGallery";
import TimelineItem from "@/components/dashboard/TimelineItem";
import ProgressBar from "@/components/dashboard/ProgressBar";
import ChatLogSection, { ChatMessage } from "@/components/dashboard/ChatLogSection";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailsType | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (id) {
      const projectData = getProjectDetails(id);
      setProject(projectData);
      
      // Simulate chat log messages from the project data
      const messages: ChatMessage[] = [
        { 
          remetente: "João Silva",
          data: "09/04/2025",
          hora: "15:30",
          mensagem: "Fundações concluídas, atrasou 2 horas por chuva."
        },
        { 
          remetente: "Maria Oliveira",
          data: "08/04/2025",
          hora: "14:00", 
          mensagem: "Chegou mais cimento hoje."
        },
        {
          remetente: "Pedro Santos",
          data: "07/04/2025",
          hora: "09:15",
          mensagem: "Iniciando trabalho nas fundações."
        }
      ];
      
      setChatMessages(messages);
    }
  }, [id]);
  
  if (!project) {
    return (
      <AppLayout title="Carregando..." showBackButton={true} onBackClick={() => navigate("/projetos")}>
        <div className="flex justify-center items-center h-full">
          <p>Carregando detalhes do projeto...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout 
      title={project.name} 
      showBackButton={true} 
      onBackClick={() => navigate("/projetos")}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress & Status */}
            <Card className="bg-[#444444] border-none">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-white text-3xl font-bold text-[#FF6200]">{project.progress}%</h2>
                    <p className="text-[#BBBBBB] text-sm">Progresso da obra</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-[#FF6200]" />
                      <div>
                        <p className="text-xs text-[#BBBBBB]">Data de conclusão</p>
                        <p className="text-sm text-white">{project.estimatedCompletionDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-[#FF6200]" />
                      <div>
                        <p className="text-xs text-[#BBBBBB]">Status</p>
                        <p className="text-sm text-white">{project.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <ProgressBar progress={project.progress} size="lg" />
                </div>
              </CardContent>
            </Card>
            
            {/* Timeline */}
            <Card className="bg-[#444444] border-none">
              <CardContent className="p-4">
                <h2 className="text-lg font-medium text-white mb-3">Timeline de Atualizações</h2>
                <div className="space-y-3">
                  {project.timeline && project.timeline.length > 0 ? (
                    project.timeline.map((event) => (
                      <TimelineItem key={event.id} event={event} />
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Nenhuma atualização disponível.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* ChatLog Section */}
            <ChatLogSection 
              messages={chatMessages} 
              projectName={project.name} 
            />
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            {/* Recent Photos */}
            <Card className="bg-[#444444] border-none">
              <CardContent className="p-4">
                <h2 className="text-lg font-medium text-white mb-3">Fotos Recentes</h2>
                {project.photos && project.photos.length > 0 ? (
                  <PhotoGallery images={project.photos} />
                ) : (
                  <p className="text-sm text-gray-400">Nenhuma foto disponível.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Back Button (Mobile Only) */}
            <div className="lg:hidden">
              <Button
                onClick={() => navigate("/projetos")}
                className="w-full flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={16} />
                <span>Voltar para Projetos</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDetails;
