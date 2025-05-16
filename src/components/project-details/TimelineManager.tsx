
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Upload, Plus, Trash2 } from "lucide-react";
import { TimelineTask } from "@/types/project";
import { format } from "date-fns";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TimelineManagerProps {
  projectId: string;
  timelineTasks?: TimelineTask[];
  onTimelineUpdate: (tasks: TimelineTask[]) => void;
}

export default function TimelineManager({ projectId, timelineTasks = [], onTimelineUpdate }: TimelineManagerProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<TimelineTask>>({
    name: '',
    startDate: '',
    endDate: '',
    responsiblePerson: '',
    progress: 0,
    status: 'not_started',
    description: ''
  });
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNewTaskChange = (field: keyof TimelineTask, value: any) => {
    setNewTask(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTask = () => {
    if (!newTask.name || !newTask.startDate || !newTask.endDate || !newTask.responsiblePerson) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const task: TimelineTask = {
      id: uuidv4(),
      name: newTask.name || '',
      startDate: newTask.startDate || '',
      endDate: newTask.endDate || '',
      responsiblePerson: newTask.responsiblePerson || '',
      progress: newTask.progress || 0,
      status: newTask.status as "completed" | "in_progress" | "delayed" | "not_started" || "not_started",
      description: newTask.description
    };

    const updatedTasks = [...timelineTasks, task];
    onTimelineUpdate(updatedTasks);
    
    setIsAddTaskOpen(false);
    setNewTask({
      name: '',
      startDate: '',
      endDate: '',
      responsiblePerson: '',
      progress: 0,
      status: 'not_started',
      description: ''
    });
    
    toast.success("Tarefa adicionada ao cronograma");
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      handleNewTaskChange('startDate', format(date, 'yyyy-MM-dd'));
      setStartDateOpen(false);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      handleNewTaskChange('endDate', format(date, 'yyyy-MM-dd'));
      setEndDateOpen(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = timelineTasks.filter(task => task.id !== id);
    onTimelineUpdate(updatedTasks);
    toast.success("Tarefa removida do cronograma");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      toast.error("Selecione um arquivo para upload");
      return;
    }

    setIsUploading(true);

    // Simulating file upload and AI processing
    setTimeout(() => {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      
      // Generate mock timeline data based on file type
      let mockTasks: TimelineTask[] = [];
      
      if (fileType === 'pdf') {
        mockTasks = generateMockPdfTasks();
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        mockTasks = generateMockExcelTasks();
      } else {
        toast.error("Formato de arquivo não suportado. Use PDF ou Excel.");
        setIsUploading(false);
        return;
      }
      
      onTimelineUpdate(mockTasks);
      setIsUploading(false);
      setFile(null);
      toast.success("Cronograma processado com sucesso");
    }, 2000);
  };

  // Helper function to generate mock PDF tasks
  const generateMockPdfTasks = (): TimelineTask[] => {
    const today = new Date();
    const startDate = new Date(today);
    
    return [
      {
        id: uuidv4(),
        name: "Preparação do terreno",
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 15)), 'yyyy-MM-dd'),
        responsiblePerson: "João Silva",
        progress: 100,
        status: "completed"
      },
      {
        id: uuidv4(),
        name: "Fundação",
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 30)), 'yyyy-MM-dd'),
        responsiblePerson: "Carlos Mendes",
        progress: 70,
        status: "in_progress"
      },
      {
        id: uuidv4(),
        name: "Estrutura",
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 45)), 'yyyy-MM-dd'),
        responsiblePerson: "Roberto Alves",
        progress: 0,
        status: "not_started"
      },
      {
        id: uuidv4(),
        name: "Alvenaria",
        startDate: format(new Date(startDate.setDate(startDate.getDate() - 5)), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 40)), 'yyyy-MM-dd'),
        responsiblePerson: "Antonio Pereira",
        progress: 15,
        status: "delayed",
        description: "Atraso na entrega de tijolos"
      }
    ];
  };

  // Helper function to generate mock Excel tasks
  const generateMockExcelTasks = (): TimelineTask[] => {
    const today = new Date();
    const startDate = new Date(today);
    
    return [
      {
        id: uuidv4(),
        name: "Estudo preliminar",
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 20)), 'yyyy-MM-dd'),
        responsiblePerson: "Engenheiro chefe",
        progress: 100,
        status: "completed"
      },
      {
        id: uuidv4(),
        name: "Projeto executivo",
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 25)), 'yyyy-MM-dd'),
        responsiblePerson: "Equipe de projetos",
        progress: 85,
        status: "in_progress"
      },
      {
        id: uuidv4(),
        name: "Terraplenagem",
        startDate: format(new Date(startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 10)), 'yyyy-MM-dd'),
        responsiblePerson: "Operador de máquinas",
        progress: 30,
        status: "delayed"
      },
      {
        id: uuidv4(),
        name: "Instalações hidráulicas",
        startDate: format(new Date(startDate.setDate(startDate.getDate() + 15)), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 30)), 'yyyy-MM-dd'),
        responsiblePerson: "Equipe de hidráulica",
        progress: 0,
        status: "not_started"
      },
      {
        id: uuidv4(),
        name: "Instalações elétricas",
        startDate: format(new Date(startDate.setDate(startDate.getDate() - 5)), 'yyyy-MM-dd'),
        endDate: format(new Date(startDate.setDate(startDate.getDate() + 35)), 'yyyy-MM-dd'),
        responsiblePerson: "Equipe de elétrica",
        progress: 0,
        status: "not_started"
      }
    ];
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Gerenciar Cronograma</CardTitle>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="flex items-center gap-1.5">
              <Plus size={16} />
              <span>Novo cronograma</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Criar Cronograma</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="manual">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Criar manualmente</TabsTrigger>
                <TabsTrigger value="upload">Upload de arquivo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="py-4">
                {timelineTasks.length > 0 ? (
                  <div className="space-y-4">
                    <div className="text-sm mb-4">
                      Cronograma atual: <span className="font-semibold">{timelineTasks.length} tarefas</span>
                    </div>
                    
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {timelineTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between bg-secondary p-3 rounded-md">
                          <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-xs text-muted">
                              {task.startDate.includes('T') 
                                ? format(new Date(task.startDate), 'dd/MM/yyyy')
                                : task.startDate
                              } - {
                                task.endDate.includes('T')
                                  ? format(new Date(task.endDate), 'dd/MM/yyyy')
                                  : task.endDate
                              }
                            </div>
                          </div>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => setIsAddTaskOpen(true)}
                      className="w-full"
                    >
                      <Plus size={16} className="mr-1" />
                      Adicionar nova tarefa
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted mb-4">Nenhuma tarefa adicionada ao cronograma</p>
                    <Button onClick={() => setIsAddTaskOpen(true)}>
                      <Plus size={16} className="mr-1" />
                      Adicionar primeira tarefa
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upload" className="py-4">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <Upload size={24} className="mx-auto text-muted mb-2" />
                    <p className="mb-4 text-sm text-muted">
                      Faça upload de um arquivo PDF ou Excel contendo seu cronograma. 
                      Nossa IA processará e criará as etapas automaticamente.
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                      Selecionar arquivo
                    </Label>
                    {file && (
                      <p className="mt-3 text-sm">
                        Arquivo selecionado: <span className="font-medium">{file.name}</span>
                      </p>
                    )}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={handleFileUpload}
                    disabled={!file || isUploading}
                  >
                    {isUploading ? "Processando..." : "Processar arquivo"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {timelineTasks.length > 0 ? (
          <div className="text-sm text-muted">
            O cronograma contém {timelineTasks.length} tarefas. 
            <br />
            {timelineTasks.filter(t => t.status === "completed").length} concluídas, 
            {timelineTasks.filter(t => t.status === "in_progress").length} em andamento, 
            {timelineTasks.filter(t => t.status === "delayed").length} atrasadas.
          </div>
        ) : (
          <div className="text-sm text-muted">
            Nenhum cronograma definido. Clique em "Novo cronograma" para criar.
          </div>
        )}
      </CardContent>
      
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar nova tarefa</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-name">Nome da tarefa</Label>
              <Input
                id="task-name"
                value={newTask.name || ''}
                onChange={(e) => handleNewTaskChange('name', e.target.value)}
                placeholder="Ex: Fundação"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Data de início</Label>
                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant="outline"
                      className={
                        "w-full justify-start text-left font-normal",
                      }
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.startDate ? (
                        format(new Date(newTask.startDate), "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onSelect={handleStartDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">Data de término</Label>
                <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="end-date"
                      variant="outline"
                      className={
                        "w-full justify-start text-left font-normal",
                      }
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTask.endDate ? (
                        format(new Date(newTask.endDate), "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onSelect={handleEndDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Input
                id="responsible"
                value={newTask.responsiblePerson || ''}
                onChange={(e) => handleNewTaskChange('responsiblePerson', e.target.value)}
                placeholder="Ex: João Silva"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status"
                className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm"
                value={newTask.status || 'not_started'}
                onChange={(e) => handleNewTaskChange('status', e.target.value)}
              >
                <option value="not_started">Não iniciada</option>
                <option value="in_progress">Em andamento</option>
                <option value="delayed">Atrasada</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="progress">Progresso (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={newTask.progress || 0}
                onChange={(e) => handleNewTaskChange('progress', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Input
                id="description"
                value={newTask.description || ''}
                onChange={(e) => handleNewTaskChange('description', e.target.value)}
                placeholder="Detalhes adicionais sobre a tarefa"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddTask}>Adicionar tarefa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
