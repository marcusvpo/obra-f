
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { SearchIcon, Filter, X, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { projects, getSaudeObra, getDelayedProjects, getCompletedProjects } from "@/data/mockData";
import { Project } from "@/types/project";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

type SortOption = "progress" | "date" | "delay" | "none";

const sortOptions = [
  { value: "none", label: "Padrão" },
  { value: "progress", label: "Por Progresso" },
  { value: "date", label: "Por Data de Conclusão" },
  { value: "delay", label: "Por Atraso" }
];

const Projetos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [viewedProjects, setViewedProjects] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem("viewedProjects");
    return stored ? JSON.parse(stored) : {};
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("none");
  
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
    
    setProjectsList(applySorting(filtered, sortBy));
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
    setProjectsList(applySorting(sortedProjects, sortBy));
  };

  const applySorting = (projects: Project[], sortOption: SortOption): Project[] => {
    const projectsCopy = [...projects];
    
    switch (sortOption) {
      case "progress":
        return projectsCopy.sort((a, b) => b.progress - a.progress);
      case "date":
        // Simple string comparison for dates in DD/MM/YYYY format
        return projectsCopy.sort((a, b) => 
          a.estimatedCompletionDate.localeCompare(b.estimatedCompletionDate)
        );
      case "delay":
        // Sort by delay (null/0 values first, then ascending by delay)
        return projectsCopy.sort((a, b) => {
          if (!a.delay && !b.delay) return 0;
          if (!a.delay) return -1;
          if (!b.delay) return 1;
          return a.delay - b.delay;
        });
      default:
        return projectsCopy;
    }
  };
  
  const handleSort = (option: SortOption) => {
    setSortBy(option);
    setProjectsList(applySorting(projectsList, option));
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
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1 min-w-[90px]">
                        <Filter size={16} />
                        <span>Filtrar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
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
                        <DropdownMenuItem onClick={() => applyFilter("completed")}>
                          Projetos concluídos
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Progresso</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => applyFilter("progress-low")}>
                          0-50% concluído
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => applyFilter("progress-high")}>
                          51-100% concluído
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => applyFilter("favorites")}>
                        Projetos favoritos
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  Filtrar projetos
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <SortAsc size={16} />
                        <span>Ordenar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {sortOptions.map((option) => (
                        <DropdownMenuItem 
                          key={option.value}
                          onClick={() => handleSort(option.value as SortOption)}
                          className={sortBy === option.value ? "bg-primary/20" : ""}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  Ordenar projetos
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {activeFilter && (
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-3 py-1 flex items-center gap-2 bg-secondary">
              {activeFilter === "delayed" && "Projetos atrasados"}
              {activeFilter === "completed" && "Projetos concluídos"}
              {activeFilter === "in-progress" && "Projetos no prazo"}
              {activeFilter === "favorites" && "Projetos favoritos"}
              {activeFilter === "progress-low" && "Progresso 0-50%"}
              {activeFilter === "progress-high" && "Progresso 51-100%"}
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
