
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, FileText, Bot, CheckCircle, Filter, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projectsData";

interface ChatMessage {
  id: string;
  type: 'audio' | 'text';
  content: string;
  sender: string; 
  timestamp: string;
  projectId: string;
  extracted: {
    status?: string;
    hoursWorked?: string;
    issues?: string[];
    materials?: { name: string; quantity: number }[];
    progress?: number;
  };
  processed: boolean;
}

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'audio',
    content: 'Hoje trabalhamos no Condomínio Villa Verde e finalizamos a instalação elétrica em 5 apartamentos do bloco B. Tivemos um problema com a fiação de um dos apartamentos que precisou ser refeita.',
    sender: 'João Silva (11) 98765-4321',
    timestamp: '09/04/2025 15:30',
    projectId: '1',
    extracted: {
      status: 'Instalações elétricas em andamento',
      hoursWorked: '8h',
      issues: ['Problema com fiação em um apartamento'],
      progress: 68
    },
    processed: true
  },
  {
    id: '2',
    type: 'text',
    content: 'Devido à chuva, tivemos que interromper os trabalhos no Edifício Solaris hoje. Conseguimos avançar apenas 2 horas na parte da manhã com a preparação das formas para o próximo andar.',
    sender: 'Ana Oliveira (11) 91234-5678',
    timestamp: '09/04/2025 14:15',
    projectId: '2',
    extracted: {
      status: 'Trabalho interrompido por chuva',
      hoursWorked: '2h',
      issues: ['Interrupção por chuva']
    },
    processed: true
  },
  {
    id: '3',
    type: 'audio',
    content: 'Recebemos os materiais para o Residencial Monte Alto hoje. Estamos com todo o material necessário para os acabamentos finais. Precisamos de mais dois trabalhadores para manter o cronograma.',
    sender: 'Pedro Santos (11) 97654-3210',
    timestamp: '09/04/2025 10:45',
    projectId: '3',
    extracted: {
      status: 'Materiais recebidos',
      issues: ['Necessidade de mais trabalhadores']
    },
    processed: false
  },
  {
    id: '4',
    type: 'text',
    content: 'Terminamos a pintura de 3 salas na Escola Municipal. Faltam apenas os detalhes finais e a limpeza. Estimativa de conclusão em 2 dias.',
    sender: 'Mariana Alves (11) 95432-1098',
    timestamp: '09/04/2025 16:20',
    projectId: '6',
    extracted: {
      status: 'Pintura em finalização',
      progress: 95
    },
    processed: true
  }
];

export default function ChatLog() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "Projeto não encontrado";
  };

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'all' || 
                          (filter === 'processed' && message.processed) ||
                          (filter === 'unprocessed' && !message.processed);
    
    const matchesSearch = search === '' ||
                          message.content.toLowerCase().includes(search.toLowerCase()) ||
                          message.sender.toLowerCase().includes(search.toLowerCase()) ||
                          getProjectName(message.projectId).toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleProcess = (id: string) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === id ? { ...message, processed: true } : message
      )
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AppLayout title="ChatLog">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        <Card className="bg-[#3A3A3A] border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-white">
              <MessageCircle size={20} className="text-primary mr-2" />
              Registro de Comunicações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar mensagens, remetentes ou projetos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#444444] border-[#555555] text-white placeholder:text-gray-400"
                  />
                </div>
                <Select defaultValue="all" onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px] bg-[#444444] border-[#555555] text-white">
                    <span className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filtrar por" />
                    </span>
                  </SelectTrigger>
                  <SelectContent className="bg-[#444444] border-[#555555] text-white">
                    <SelectItem value="all">Todas as mensagens</SelectItem>
                    <SelectItem value="processed">Processadas</SelectItem>
                    <SelectItem value="unprocessed">Não processadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-[#444444] grid grid-cols-2 h-12">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#555555] data-[state=active]:text-white">
                    <FileText size={16} className="mr-2" />
                    Todas as mensagens
                  </TabsTrigger>
                  <TabsTrigger value="extracted" className="data-[state=active]:bg-[#555555] data-[state=active]:text-white">
                    <Bot size={16} className="mr-2" />
                    Análise da IA
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                  <motion.div 
                    className="space-y-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredMessages.length === 0 ? (
                      <p className="text-center py-8 text-gray-400">Nenhuma mensagem encontrada</p>
                    ) : (
                      filteredMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          variants={item}
                          transition={{ duration: 0.3 }}
                          className={`bg-[#444444] rounded-lg p-4 border-l-4 
                            ${message.processed ? 'border-green-500' : 'border-yellow-500'}
                            hover:bg-[#4A4A4A] transition-colors duration-300
                          `}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-sm flex items-center gap-2">
                              {message.type === 'audio' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                  <line x1="12" x2="12" y1="19" y2="22"/>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                              )}
                              {message.type === 'audio' ? 'Áudio' : 'Texto'}
                            </span>
                            <span className="text-xs text-gray-400">{message.timestamp}</span>
                          </div>
                          
                          <div className="flex gap-2 mb-2">
                            <Badge className="bg-[#333333] text-white hover:bg-[#3A3A3A]">
                              {getProjectName(message.projectId)}
                            </Badge>
                            {message.processed ? (
                              <Badge className="bg-green-500/20 text-green-300 hover:bg-green-500/30">
                                <CheckCircle size={12} className="mr-1" /> Processado
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30">
                                Pendente
                              </Badge>
                            )}
                          </div>
                          
                          <p className="bg-[#333333] p-3 rounded-md text-sm">{message.content}</p>
                          
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-gray-400">Enviado por: {message.sender}</span>
                            {!message.processed && (
                              <Button 
                                onClick={() => handleProcess(message.id)}
                                size="sm" 
                                className="bg-primary text-white hover:bg-primary/80"
                              >
                                Processar agora
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="extracted" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                  <motion.div 
                    className="space-y-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        variants={item}
                        className="bg-[#444444] rounded-lg overflow-hidden"
                      >
                        <div className="bg-[#555555] p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Bot size={18} className="text-primary" />
                            <span className="font-medium">Análise da IA</span>
                          </div>
                          <Badge className="bg-[#333333] text-white hover:bg-[#3A3A3A]">
                            {getProjectName(message.projectId)}
                          </Badge>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="text-xs text-gray-400">Mensagem original:</p>
                              <p className="text-sm bg-[#333333] p-2 rounded-md">{message.content}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-xs text-gray-400">Dados extraídos:</p>
                            <div className="bg-[#333333] p-3 rounded-md">
                              <ul className="space-y-2">
                                {message.extracted.status && (
                                  <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 16v-4"/>
                                        <path d="M12 8h.01"/>
                                      </svg>
                                    </span>
                                    <div>
                                      <span className="text-xs text-gray-400">Status:</span>
                                      <p className="text-sm">{message.extracted.status}</p>
                                    </div>
                                  </li>
                                )}
                                
                                {message.extracted.hoursWorked && (
                                  <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                      </svg>
                                    </span>
                                    <div>
                                      <span className="text-xs text-gray-400">Horas trabalhadas:</span>
                                      <p className="text-sm">{message.extracted.hoursWorked}</p>
                                    </div>
                                  </li>
                                )}
                                
                                {message.extracted.progress !== undefined && (
                                  <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 20V10"/>
                                        <path d="M12 20V4"/>
                                        <path d="M6 20v-6"/>
                                      </svg>
                                    </span>
                                    <div>
                                      <span className="text-xs text-gray-400">Progresso:</span>
                                      <p className="text-sm">{message.extracted.progress}%</p>
                                    </div>
                                  </li>
                                )}
                                
                                {message.extracted.issues && message.extracted.issues.length > 0 && (
                                  <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                                        <path d="M12 9v4"/>
                                        <path d="M12 17h.01"/>
                                      </svg>
                                    </span>
                                    <div>
                                      <span className="text-xs text-gray-400">Problemas reportados:</span>
                                      <ul className="text-sm list-disc pl-4 mt-1">
                                        {message.extracted.issues.map((issue, idx) => (
                                          <li key={idx}>{issue}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </li>
                                )}
                                
                                {message.extracted.materials && message.extracted.materials.length > 0 && (
                                  <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 16h6"/>
                                        <path d="M19 13v6"/>
                                        <path d="M12 20H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12v14Z"/>
                                      </svg>
                                    </span>
                                    <div>
                                      <span className="text-xs text-gray-400">Materiais:</span>
                                      <ul className="text-sm list-disc pl-4 mt-1">
                                        {message.extracted.materials.map((material, idx) => (
                                          <li key={idx}>{material.name} - {material.quantity} unidades</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </div>
                            
                            {message.processed ? (
                              <div className="flex items-center justify-end gap-2 text-xs text-green-400">
                                <CheckCircle size={14} />
                                <span>Dados enviados para o dashboard</span>
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <Button 
                                  onClick={() => handleProcess(message.id)}
                                  size="sm" 
                                  className="bg-primary text-white hover:bg-primary/80 flex items-center gap-1"
                                >
                                  <ArrowUpRight size={14} />
                                  <span>Enviar para o dashboard</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
}
