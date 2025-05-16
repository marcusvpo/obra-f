
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, AlertTriangle, XCircle, BarChart2, MessageCircle } from "lucide-react";
import { TeamMember } from "@/types/worker";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

interface WorkerPerformanceCardProps {
  worker: TeamMember;
}

const WorkerPerformanceCard = ({ worker }: WorkerPerformanceCardProps) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("7d");
  
  const performance = worker.performance || {
    completedTasks: 0,
    pendingTasks: 0,
    failedTasks: 0,
    productivityIndex: 0,
    performanceTrend: [0, 0, 0, 0, 0, 0, 0],
    messages: []
  };
  
  const totalTasks = performance.completedTasks + performance.pendingTasks + performance.failedTasks;
  
  const getProductivityColor = (index: number) => {
    if (index >= 80) return "bg-green-500";
    if (index >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };
  
  // Preparar dados para o gráfico de tendência
  const trendData = performance.performanceTrend.map((value, index) => ({
    day: index + 1,
    value
  }));
  
  // Filtrar dados para os diferentes períodos de tempo
  const getFilteredData = () => {
    switch (timeRange) {
      case "7d":
        return trendData.slice(-7);
      case "15d":
        return trendData.slice(-15);
      case "30d":
        return trendData.slice(-30);
      default:
        return trendData;
    }
  };
  
  return (
    <Card className="bg-[#444444] border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-[#FF6200]">
            <AvatarImage src={worker.photoUrl} alt={worker.nome} />
            <AvatarFallback className="bg-[#666666] text-white">
              {getInitials(worker.nome)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="text-lg font-medium">{worker.nome}</h3>
            <p className="text-sm text-gray-300">{worker.currentProject || "Sem projeto atribuído"}</p>
            <p className="text-xs text-gray-400">{worker.numero}</p>
          </div>
        </div>
        
        <div className="space-y-4 mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span className="text-sm">Tarefas concluídas</span>
            </div>
            <span className="text-sm font-medium">{performance.completedTasks}</span>
          </div>
          <Progress 
            value={(performance.completedTasks / totalTasks) * 100} 
            className="h-2" 
            indicatorClassName="bg-green-500"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle size={18} className="text-red-500" />
              <span className="text-sm">Tarefas não realizadas</span>
            </div>
            <span className="text-sm font-medium">{performance.failedTasks}</span>
          </div>
          <Progress 
            value={(performance.failedTasks / totalTasks) * 100} 
            className="h-2" 
            indicatorClassName="bg-red-500"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-500" />
              <span className="text-sm">Tarefas pendentes</span>
            </div>
            <span className="text-sm font-medium">{performance.pendingTasks}</span>
          </div>
          <Progress 
            value={(performance.pendingTasks / totalTasks) * 100} 
            className="h-2" 
            indicatorClassName="bg-yellow-500"
          />
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-[#FF6200]" />
              <span className="text-sm font-medium">Índice de produtividade</span>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              performance.productivityIndex >= 80 ? 'bg-green-900/20 text-green-400' : 
              performance.productivityIndex >= 60 ? 'bg-yellow-900/20 text-yellow-400' : 
              'bg-red-900/20 text-red-400'
            }`}>
              {performance.productivityIndex}%
            </span>
          </div>
          <Progress 
            value={performance.productivityIndex} 
            className="h-3 rounded-md" 
            indicatorClassName={getProductivityColor(performance.productivityIndex)}
          />
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Tendência de desempenho</h4>
            <Tabs defaultValue="7d" className="w-auto" onValueChange={setTimeRange}>
              <TabsList className="h-7 bg-[#333333]">
                <TabsTrigger value="7d" className="text-xs h-6">7 dias</TabsTrigger>
                <TabsTrigger value="15d" className="text-xs h-6">15 dias</TabsTrigger>
                <TabsTrigger value="30d" className="text-xs h-6">30 dias</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="h-[140px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getFilteredData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555555" />
                <XAxis dataKey="day" stroke="#999999" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="#999999" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#333333", borderColor: "#555555" }}
                  labelStyle={{ color: "#FFFFFF" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FF6200" 
                  activeDot={{ r: 6 }} 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full border-[#FF6200] text-[#FF6200] hover:bg-[#FF6200] hover:text-white" 
            onClick={() => setIsHistoryOpen(true)}
          >
            <MessageCircle size={16} className="mr-2" />
            Ver histórico de mensagens
          </Button>
        </div>
      </CardContent>
      
      <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="bg-[#333333] border-[#444444] max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium flex items-center gap-2">
              <MessageCircle size={20} className="text-[#FF6200]" />
              Histórico de mensagens - {worker.nome}
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto p-1">
            {performance.messages.length > 0 ? (
              <div className="space-y-3">
                {performance.messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border-l-4 ${
                      message.type === 'success' ? 'border-green-500 bg-green-900/20' : 
                      message.type === 'warning' ? 'border-yellow-500 bg-yellow-900/20' : 
                      message.type === 'danger' ? 'border-red-500 bg-red-900/20' : 
                      'border-blue-500 bg-blue-900/20'
                    }`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs font-medium ${
                        message.type === 'success' ? 'text-green-400' : 
                        message.type === 'warning' ? 'text-yellow-400' : 
                        message.type === 'danger' ? 'text-red-400' : 
                        'text-blue-400'
                      }`}>
                        {message.date}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        message.type === 'success' ? 'bg-green-900/40 text-green-400' : 
                        message.type === 'warning' ? 'bg-yellow-900/40 text-yellow-400' : 
                        message.type === 'danger' ? 'bg-red-900/40 text-red-400' : 
                        'bg-blue-900/40 text-blue-400'
                      }`}>
                        {message.type === 'success' ? 'Concluído' : 
                         message.type === 'warning' ? 'Alerta' : 
                         message.type === 'danger' ? 'Problema' : 
                         'Informação'}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                Nenhuma mensagem registrada para este trabalhador.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WorkerPerformanceCard;
