
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/mockData";
import { Project } from "@/types/project";
import { useNavigate } from "react-router-dom";

const PrjetosEmAndamento = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsList, setProjectsList] = useState<Project[]>([]);
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

  // Determinar o status de saúde de uma obra
  const getSaudeObra = (project: Project) => {
    if (!project.delay || project.delay <= 0) {
      return { cor: '#00FF00', texto: 'No prazo' };
    }
    if (project.delay < 3) {
      return { cor: '#FFFF00', texto: 'Atraso leve' };
    }
    return { cor: '#FF0000', texto: 'Atraso crítico' };
  };
  
  // Filtrar projetos baseado na busca
  const filteredProjects = projectsList.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout title="Projetos">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold">Projetos</h1>
          
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
            {filteredProjects.map((project) => {
              const saude = getSaudeObra(project);
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onFavoriteToggle={handleFavoriteChange}
                  saude={saude}
                />
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default PrjetosEmAndamento;
