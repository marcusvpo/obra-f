
import { useRef, useState } from "react";
import { TimelineTask, ScheduleAdherence } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { format, parseISO, differenceInDays, isBefore, isAfter, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Calendar, Edit, CheckCheck, AlertCircle, HourglassIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimelineManager from "./TimelineManager";

interface ProjectTimelineProps {
  projectId: string;
  timelineTasks?: TimelineTask[];
  scheduleAdherence?: ScheduleAdherence;
  onTimelineUpdate?: (tasks: TimelineTask[]) => void;
}

const TaskStatusColors = {
  completed: "bg-green-500",
  in_progress: "bg-blue-500",
  delayed: "bg-red-500",
  not_started: "bg-gray-400"
};

const TaskStatusIcons = {
  completed: <CheckCheck className="h-4 w-4 text-green-500" />,
  in_progress: <HourglassIcon className="h-4 w-4 text-blue-500" />,
  delayed: <AlertCircle className="h-4 w-4 text-red-500" />,
  not_started: <Clock className="h-4 w-4 text-gray-400" />
};

const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), "dd/MM/yyyy", { locale: ptBR });
  } catch (e) {
    // Handle date in DD/MM/YYYY format
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/').map(Number);
      return format(new Date(year, month - 1, day), "dd/MM/yyyy", { locale: ptBR });
    }
    return dateString;
  }
};

const parseTimelineDate = (dateString: string): Date => {
  try {
    return parseISO(dateString);
  } catch (e) {
    // Handle DD/MM/YYYY format
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  }
};

export default function ProjectTimeline({ 
  projectId,
  timelineTasks = [], 
  scheduleAdherence,
  onTimelineUpdate 
}: ProjectTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'7' | '15' | '30' | 'all'>('all');

  if (timelineTasks.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Cronograma do Projeto</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-1" 
            onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="h-4 w-4" />
            <span>Editar</span>
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-56">
          <p className="text-muted text-center">
            Nenhuma tarefa no cronograma ainda. Clique em "Editar" para adicionar tarefas ou fazer upload de um cronograma.
          </p>
        </CardContent>
        
        {renderEditDialog()}
      </Card>
    );
  }

  // Sort tasks by start date
  const sortedTasks = [...timelineTasks].sort((a, b) => {
    const dateA = parseTimelineDate(a.startDate);
    const dateB = parseTimelineDate(b.startDate);
    return dateA.getTime() - dateB.getTime();
  });

  // Filter tasks based on time filter
  const filteredTasks = timeFilter === 'all' 
    ? sortedTasks 
    : sortedTasks.filter(task => {
        const today = new Date();
        const startDate = parseTimelineDate(task.startDate);
        const endDate = parseTimelineDate(task.endDate);
        const daysAgo = parseInt(timeFilter);
        
        const cutoffDate = subDays(today, daysAgo);
        
        // Include if task overlaps with the selected time period
        return (isAfter(startDate, cutoffDate) || isAfter(endDate, cutoffDate));
      });

  // Calculate timeline range
  const minDate = filteredTasks.length > 0 
    ? parseTimelineDate(filteredTasks[0].startDate)
    : new Date();
    
  const maxDate = filteredTasks.length > 0
    ? parseTimelineDate(filteredTasks[filteredTasks.length - 1].endDate)
    : addDays(new Date(), 30);

  const totalDays = differenceInDays(maxDate, minDate) + 1;

  // Calculate task positions and widths
  const calculateTaskPosition = (task: TimelineTask) => {
    const startDate = parseTimelineDate(task.startDate);
    const endDate = parseTimelineDate(task.endDate);
    
    const startOffset = differenceInDays(startDate, minDate);
    const duration = differenceInDays(endDate, startDate) + 1;
    
    const left = `${(startOffset / totalDays) * 100}%`;
    const width = `${(duration / totalDays) * 100}%`;
    
    return { left, width };
  };

  // Calculate overall project progress
  const completedTasks = timelineTasks.filter(task => task.status === "completed").length;
  const overallProgress = Math.round((completedTasks / timelineTasks.length) * 100);
  const weightedProgress = Math.round(
    timelineTasks.reduce((acc, task) => acc + task.progress, 0) / timelineTasks.length
  );

  // Check for potential delays (tasks scheduled for today but not in progress)
  const today = new Date();
  const potentialDelays = timelineTasks.filter(task => {
    const startDate = parseTimelineDate(task.startDate);
    const endDate = parseTimelineDate(task.endDate);
    return (
      task.status === "not_started" && 
      isBefore(startDate, today) && 
      isAfter(endDate, today)
    );
  });

  function renderEditDialog() {
    return (
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Cronograma</DialogTitle>
          </DialogHeader>
          <TimelineManager
            projectId={projectId}
            timelineTasks={timelineTasks}
            onTimelineUpdate={(tasks) => {
              if (onTimelineUpdate) {
                onTimelineUpdate(tasks);
              }
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <CardTitle className="text-xl font-bold mb-2 sm:mb-0">Cronograma do Projeto</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Tabs 
              defaultValue="all" 
              value={timeFilter}
              onValueChange={(value) => setTimeFilter(value as '7' | '15' | '30' | 'all')}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="7">7 dias</TabsTrigger>
                <TabsTrigger value="15">15 dias</TabsTrigger>
                <TabsTrigger value="30">30 dias</TabsTrigger>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 ml-0 sm:ml-4 w-full sm:w-auto mt-2 sm:mt-0" 
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
              <span>Editar</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
          <div className="mb-3 sm:mb-0">
            <div className="flex items-center gap-2 text-white">
              <span>Progresso geral:</span>
              <span className="font-semibold">{weightedProgress}%</span>
            </div>
            <div className="w-48 h-2 mt-1">
              <Progress value={weightedProgress} />
            </div>
          </div>
          {scheduleAdherence && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {scheduleAdherence.onTrack ? (
                  <CheckCircle className="text-green-500" size={16} />
                ) : (
                  <AlertTriangle className="text-amber-500" size={16} />
                )}
                <span>
                  {scheduleAdherence.onTrack ? "No prazo" : "Atraso detectado"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted">
                <Calendar size={14} />
                <span>Previsão: {scheduleAdherence.dynamicCompletionForecast}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted mb-2">
            <span>{formatDate(filteredTasks[0]?.startDate || '')}</span>
            <span>{formatDate(filteredTasks[filteredTasks.length - 1]?.endDate || '')}</span>
          </div>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="h-1 w-full bg-gray-700 mt-1 mb-8"></div>
            
            {/* Today Marker */}
            <div 
              className="absolute h-4 w-0.5 bg-primary bottom-0 transform -translate-x-1/2"
              style={{ 
                left: `${(differenceInDays(today, minDate) / totalDays) * 100}%`,
                top: '-5px'
              }}
            >
              <div className="absolute -top-7 -left-14 w-28 text-center">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                  Hoje
                </Badge>
              </div>
            </div>
            
            {/* Weighted Progress Marker */}
            <div 
              className="absolute h-1 bg-primary-hover rounded-full"
              style={{ width: `${weightedProgress}%` }}
            ></div>
          </div>
          
          <div className="pb-6">
            <ScrollArea className="h-[360px] pr-4 overflow-x-visible" orientation="vertical">
              <div className="space-y-8 mt-8" ref={timelineRef}>
                {filteredTasks.map((task) => {
                  const { left, width } = calculateTaskPosition(task);
                  
                  const isPotentialDelay = potentialDelays.some(
                    delayedTask => delayedTask.id === task.id
                  );

                  const today = new Date();
                  const startDate = parseTimelineDate(task.startDate);
                  const endDate = parseTimelineDate(task.endDate);
                  
                  const isUpcoming = isAfter(startDate, today);
                  const isPast = isBefore(endDate, today);

                  return (
                    <div key={task.id} className="relative animate-fade-in">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div 
                            className={cn(
                              "relative h-12 w-full cursor-pointer group",
                              isPotentialDelay && "animate-pulse"
                            )}
                          >
                            {/* Task Bar */}
                            <div 
                              className={cn(
                                "absolute h-10 rounded-md transition-all duration-300 group-hover:h-12 group-hover:shadow-lg border",
                                TaskStatusColors[task.status],
                                task.status === "completed" && "border-green-300",
                                task.status === "in_progress" && "border-blue-300",
                                task.status === "delayed" && "border-red-300",
                                task.status === "not_started" && "border-gray-500",
                                isPotentialDelay && "border-orange-500 border-2"
                              )}
                              style={{ left, width }}
                            >
                              {/* Progress Indicator inside the bar */}
                              {task.progress > 0 && (
                                <div 
                                  className="h-full bg-white/30 rounded-l-md" 
                                  style={{ width: `${task.progress}%` }}
                                />
                              )}
                              
                              {/* Task Title and Status */}
                              <div className="absolute inset-0 px-3 py-1 flex items-center justify-between">
                                <div className="overflow-hidden whitespace-nowrap text-ellipsis text-sm text-white font-medium">
                                  {task.name}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="bg-black bg-opacity-30 rounded-full p-1">
                                    {TaskStatusIcons[task.status]}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Date Label */}
                            <div 
                              className="absolute text-xs text-muted -bottom-6"
                              style={{ left: left }}
                            >
                              {formatDate(task.startDate)}
                            </div>
                            
                            {/* End Date */}
                            <div 
                              className="absolute text-xs text-muted -bottom-6"
                              style={{ 
                                left: `calc(${left} + ${width})`,
                                transform: 'translateX(-100%)' 
                              }}
                            >
                              {formatDate(task.endDate)}
                            </div>
                          </div>
                        </HoverCardTrigger>
                        
                        <HoverCardContent className="w-80 p-0">
                          <div className="bg-card border-none shadow-lg rounded-lg p-4">
                            <div className="mb-2 border-b pb-2 border-gray-600">
                              <h4 className="font-semibold text-white text-lg">{task.name}</h4>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted">Status:</span>
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    task.status === "completed" && "bg-green-500/10 text-green-500 border-green-500",
                                    task.status === "in_progress" && "bg-blue-500/10 text-blue-500 border-blue-500",
                                    task.status === "delayed" && "bg-red-500/10 text-red-500 border-red-500",
                                    task.status === "not_started" && "bg-gray-500/10 text-gray-400 border-gray-400"
                                  )}
                                >
                                  {task.status === "completed" && "Concluída"}
                                  {task.status === "in_progress" && "Em andamento"}
                                  {task.status === "delayed" && "Atrasada"}
                                  {task.status === "not_started" && "Não iniciada"}
                                </Badge>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-muted">Período:</span>
                                <span>{formatDate(task.startDate)} - {formatDate(task.endDate)}</span>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-muted">Progresso:</span>
                                <div className="flex items-center gap-2">
                                  <Progress value={task.progress} className="h-2 w-24" />
                                  <span className="font-medium">{task.progress}%</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-between">
                                <span className="text-muted">Responsável:</span>
                                <span className="font-medium">{task.responsiblePerson}</span>
                              </div>
                              
                              {task.description && (
                                <div className="pt-2 border-t border-gray-600 mt-2">
                                  <span className="text-muted block mb-1">Observações:</span>
                                  <p className="text-sm">{task.description}</p>
                                </div>
                              )}
                              
                              {isPotentialDelay && (
                                <div className="pt-2 border-t border-gray-600 mt-2 flex gap-2 items-center text-orange-400">
                                  <AlertTriangle size={16} />
                                  <span>Possível atraso (sem atualizações)</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          
          <div className="flex items-center justify-center mt-6">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${TaskStatusColors.completed} mr-1`}></div>
                <span>Concluída</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${TaskStatusColors.in_progress} mr-1`}></div>
                <span>Em andamento</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${TaskStatusColors.delayed} mr-1`}></div>
                <span>Atrasada</span>
              </div>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${TaskStatusColors.not_started} mr-1`}></div>
                <span>Não iniciada</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 border-2 border-orange-500 mr-1"></div>
                <span>Possível atraso</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {renderEditDialog()}
    </Card>
  );
}
