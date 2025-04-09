
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { SearchIcon, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { projects, getSaudeObra, getDelayedProjects, getCompletedProjects } from "@/data/mockData";
import { Project } from "@/types/project";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projetos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [viewedProjects, setViewedProjects] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem("viewedProjects");
    return stored ? JSON.parse(stored) : {};
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for filter in URL
    const filter = searchParams.get("filter");
    if (filter) {
      setActiveFilter(filter);
      applyFilter(filter);
    } else {
      // Sort projects with favorites on top
      const sortedProjects = [...projects].sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return 0;
      });
      setProjectsList(sortedProjects);
    }
  }, [searchParams]);
  
  useEffect(() => {
    localStorage.setItem("viewedProjects", JSON.stringify(viewedProjects));
  }, [viewedProjects]);
  
  // Function to handle favorite changes
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

  // Filter projects based on search
  const filteredProjects = projectsList.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
    
    let filtered: Project[];
    switch (filter) {
      case "delayed":
        filtered = getDelayedProjects();
        break;
      case "completed":
        filtered = getCompletedProjects();
        break;
      case "in-progress":
        filtered = projects.filter(p => !p.isCompleted && (!p.delay || p.delay === 0));
        break;
      case "favorites":
        filtered = projects.filter(p => p.isFavorite);
        break;
      default:
        filtered = [...projects].sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return 0;
        });
    }
    
    setProjectsList(filtered);
    setSearchParams(filter === "all" ? {} : { filter });
  };
  
  const clearFilter = () => {
    setActiveFilter(null);
    setSearchParams({});
    
    const sortedProjects = [...projects].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
    setProjectsList(sortedProjects);
  };

  return (
    <AppLayout title="Projetos">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold">Projetos</h1>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <Input
                placeholder="Buscar projeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-none"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 min-w-[90px]">
                  <Filter size={16} />
                  <span>Filtrar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => applyFilter("all")}>
                    Todos os projetos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("in-progress")}>
                    Projetos no prazo
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("delayed")}>
                    Projetos atrasados
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("favorites")}>
                    Projetos favoritos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => applyFilter("completed")}>
                    Projetos concluídos
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {activeFilter && (
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 bg-secondary">
              {activeFilter === "delayed" && "Projetos atrasados"}
              {activeFilter === "completed" && "Projetos concluídos"}
              {activeFilter === "in-progress" && "Projetos no prazo"}
              {activeFilter === "favorites" && "Projetos favoritos"}
              <button onClick={clearFilter} className="ml-1">
                <X size={14} />
              </button>
            </Badge>
          </div>
        )}

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

export default Projetos;
