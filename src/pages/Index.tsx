
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
  
  // Função para lidar com a alteração de favoritos
  const handleFavoriteChange = () => {
    const sortedProjects = [...projects].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
    setProjectsList(sortedProjects);
  };
  
  // Filtrar projetos baseado na busca
  const filteredProjects = projectsList.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Últimas Atualizações */}
        {updates.length > 0 && (
          <Card className="bg-card border-none shadow">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-white">Últimas Atualizações</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {updates.map((update, idx) => (
                  <li 
                    key={idx} 
                    className="p-3 bg-secondary/20 rounded-md hover:bg-secondary/30 cursor-pointer transition-colors"
                    onClick={() => navigate(`/projeto/${update.projectId}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-white">{update.projectName}</span>
                        <p className="text-sm mt-1">{update.update.title}</p>
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
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
