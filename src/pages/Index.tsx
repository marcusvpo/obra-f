
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { projects, getLatestUpdates } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/project";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [updates, setUpdates] = useState<ReturnType<typeof getLatestUpdates>>([]);
  const [viewedProjects, setViewedProjects] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem("viewedProjects");
    return stored ? JSON.parse(stored) : {};
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ordenar projetos com favoritos no topo
    const sortedProjects = [...projects].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
    setProjectsList(sortedProjects);
    
    // Obter últimas atualizações
    setUpdates(getLatestUpdates());
  }, []);
  
  useEffect(() => {
    localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects));
  }, [viewedProjects]);
  
  // Função para lidar com a alteração de favoritos
  const handleFavoriteChange = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
    setProjectsList(sortedProjects);
  };
  
  const handleProjectClick = (projectId: string) => {
    setViewedProjects(prev => ({
      ...prev,
      [projectId]: true
    }));
    navigate(`/projeto/${projectId}`);
  };

  // Verificar se um projeto tem atualizações não visualizadas
  const hasNewUpdates = (projectId: string) => {
    return updates.some(update => 
      update.projectId === projectId && !viewedProjects[projectId]
    );
  };
  
  // Filtrar projetos baseado na busca
  const filteredProjects = projectsList.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Últimas Atualizações */}
        {updates.length > 0 && (
          <Card className="bg-card border-none shadow max-h-60">
            <CardHeader className="py-3">
              <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                Últimas Atualizações
                {updates.some(update => !viewedProjects[update.projectId]) && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-40 overflow-y-auto pb-2">
              <ul className="space-y-2">
                {updates.map((update, idx) => (
                  <li 
                    key={idx} 
                    className="p-2.5 bg-secondary/20 rounded-md hover:bg-secondary/30 cursor-pointer transition-colors flex items-center"
                    onClick={() => handleProjectClick(update.projectId)}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-white">{update.projectName}</span>
                          {!viewedProjects[update.projectId] && (
                            <span className="relative flex h-2 w-2 ml-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                          )}
                        </div>
                        <p className="text-sm mt-0.5">{update.update.title}</p>
                      </div>
                      <span className="text-xs text-muted whitespace-nowrap">{update.update.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold">Dashboard de Projetos</h1>
          
          <div className="relative w-full sm:w-64">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
            <Input
              placeholder="Buscar projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-none"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted text-lg">Nenhum projeto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onFavoriteToggle={handleFavoriteChange}
                hasNewUpdates={hasNewUpdates(project.id)}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
