
import { useRef } from "react";
import { TimelineTask, ScheduleAdherence } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { format, parseISO, differenceInDays, isBefore, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Calendar } from "lucide-react";

interface ProjectTimelineProps {
  timelineTasks?: TimelineTask[];
  scheduleAdherence?: ScheduleAdherence;
}

const TaskStatusColors = {
  completed: "bg-green-500",
  in_progress: "bg-blue-500",
  delayed: "bg-red-500",
  not_started: "bg-gray-400"
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

const calculatePosition = (
  startDate: string, 
  endDate: string, 
  minDate: Date, 
  totalDays: number
): { left: string; width: string } => {
  let start: Date;
  let end: Date;
  
  try {
    start = parseISO(startDate);
    end = parseISO(endDate);
  } catch {
    // Handle DD/MM/YYYY format
    const [startDay, startMonth, startYear] = startDate.split('/').map(Number);
    const [endDay, endMonth, endYear] = endDate.split('/').map(Number);
    
    start = new Date(startYear, startMonth - 1, startDay);
    end = new Date(endYear, endMonth - 1, endDay);
  }
  
  const startDiff = differenceInDays(start, minDate);
  const taskDuration = differenceInDays(end, start) + 1; // Include the end date
  
  const left = `${(startDiff / totalDays) * 100}%`;
  const width = `${(taskDuration / totalDays) * 100}%`;
  
  return { left, width };
};

export default function ProjectTimeline({ timelineTasks = [], scheduleAdherence }: ProjectTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  if (timelineTasks.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Cronograma do Projeto</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-56">
          <p className="text-muted text-center">
            Nenhuma tarefa no cronograma ainda. Adicione tarefas ou faça upload de um cronograma para visualizá-lo aqui.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort tasks by start date
  const sortedTasks = [...timelineTasks].sort((a, b) => {
    let dateA: Date, dateB: Date;
    
    try {
      dateA = parseISO(a.startDate);
      dateB = parseISO(b.startDate);
    } catch {
      // Handle DD/MM/YYYY format
      const [dayA, monthA, yearA] = a.startDate.split('/').map(Number);
      const [dayB, monthB, yearB] = b.startDate.split('/').map(Number);
      
      dateA = new Date(yearA, monthA - 1, dayA);
      dateB = new Date(yearB, monthB - 1, dayB);
    }
    
    return dateA.getTime() - dateB.getTime();
  });

  // Calculate timeline range
  let minDate: Date;
  let maxDate: Date;

  try {
    minDate = parseISO(sortedTasks[0].startDate);
    maxDate = parseISO(sortedTasks[sortedTasks.length - 1].endDate);
  } catch {
    // Handle DD/MM/YYYY format
    const [firstDay, firstMonth, firstYear] = sortedTasks[0].startDate.split('/').map(Number);
    const [lastDay, lastMonth, lastYear] = sortedTasks[sortedTasks.length - 1].endDate.split('/').map(Number);
    
    minDate = new Date(firstYear, firstMonth - 1, firstDay);
    maxDate = new Date(lastYear, lastMonth - 1, lastDay);
  }

  const totalDays = differenceInDays(maxDate, minDate) + 1;

  // Calculate overall project progress
  const completedTasks = timelineTasks.filter(task => task.status === "completed").length;
  const overallProgress = Math.round((completedTasks / timelineTasks.length) * 100);

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Cronograma do Projeto</CardTitle>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
          <div className="mb-2 sm:mb-0">
            <div className="flex items-center gap-2">
              <span>Progresso geral:</span>
              <span className="font-semibold">{overallProgress}%</span>
            </div>
            <div className="w-48 h-2 mt-1">
              <Progress value={overallProgress} />
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
        {scheduleAdherence && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Tarefas atrasadas</div>
              <div className="text-xl font-semibold">
                {scheduleAdherence.delayedTasksPercentage}%
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Diferença do planejado</div>
              <div className="text-xl font-semibold">
                {scheduleAdherence.plannedVsActualDifference > 0 
                  ? `+${scheduleAdherence.plannedVsActualDifference} dias`
                  : `${scheduleAdherence.plannedVsActualDifference} dias`}
              </div>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-sm text-muted mb-1">Previsão de conclusão</div>
              <div className="text-xl font-semibold">
                {scheduleAdherence.dynamicCompletionForecast}
              </div>
            </div>
          </div>
        )}

        <div className="relative mb-3">
          <div className="flex justify-between text-xs text-muted">
            <span>{formatDate(sortedTasks[0].startDate)}</span>
            <span>{formatDate(sortedTasks[sortedTasks.length - 1].endDate)}</span>
          </div>
          <div className="h-1 w-full bg-gray-700 mt-1"></div>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4" ref={timelineRef}>
            {sortedTasks.map((task) => {
              const { left, width } = calculatePosition(
                task.startDate,
                task.endDate,
                minDate,
                totalDays
              );

              const today = new Date();
              const startDate = task.startDate.includes('/') 
                ? new Date(Number(task.startDate.split('/')[2]), Number(task.startDate.split('/')[1])-1, Number(task.startDate.split('/')[0]))
                : parseISO(task.startDate);
              const endDate = task.endDate.includes('/') 
                ? new Date(Number(task.endDate.split('/')[2]), Number(task.endDate.split('/')[1])-1, Number(task.endDate.split('/')[0]))
                : parseISO(task.endDate);
              
              const isUpcoming = isAfter(startDate, today);
              const isPast = isBefore(endDate, today);

              return (
                <div key={task.id} className="relative">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">{task.name}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "ml-2", 
                        task.status === "completed" && "bg-green-500/10 text-green-500",
                        task.status === "in_progress" && "bg-blue-500/10 text-blue-500",
                        task.status === "delayed" && "bg-red-500/10 text-red-500",
                        task.status === "not_started" && "bg-gray-500/10 text-gray-500"
                      )}
                    >
                      {task.status === "completed" && "Concluída"}
                      {task.status === "in_progress" && "Em andamento"}
                      {task.status === "delayed" && "Atrasada"}
                      {task.status === "not_started" && "Não iniciada"}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-muted mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(task.startDate)} - {formatDate(task.endDate)}
                      </div>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        Responsável: {task.responsiblePerson}
                      </div>
                    </div>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative h-8 w-full bg-gray-800 rounded-md">
                          <div 
                            className={cn(
                              "absolute h-full rounded-md", 
                              TaskStatusColors[task.status]
                            )}
                            style={{ 
                              left, 
                              width,
                              opacity: isUpcoming ? 0.5 : isPast ? 0.8 : 1
                            }}
                          >
                            {task.progress > 0 && (
                              <div 
                                className="h-full bg-white/30 rounded-md" 
                                style={{ width: `${task.progress}%` }}
                              />
                            )}
                          </div>
                          {isUpcoming && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold">
                              Futuro
                            </div>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div>
                          <p className="font-semibold">{task.name}</p>
                          <p>Período: {formatDate(task.startDate)} - {formatDate(task.endDate)}</p>
                          <p>Progresso: {task.progress}%</p>
                          <p>Responsável: {task.responsiblePerson}</p>
                          {task.description && <p>{task.description}</p>}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center gap-3 text-sm">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
