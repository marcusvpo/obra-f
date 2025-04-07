
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { chatLogs } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChatLog = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(
    chatLogs.length > 0 ? chatLogs[0].obra : null
  );

  const selectedLogs = chatLogs.find(log => log.obra === selectedProject)?.logs || [];

  return (
    <AppLayout title="Histórico de Conversas">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar with projects */}
          <div className="md:col-span-1">
            <Card className="bg-card border-none shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Projetos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {chatLogs.map(log => (
                    <li key={log.obra}>
                      <button
                        onClick={() => setSelectedProject(log.obra)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedProject === log.obra
                            ? "bg-primary text-white"
                            : "hover:bg-secondary/50"
                        }`}
                      >
                        {log.obra}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Chat messages */}
          <div className="md:col-span-3">
            <Card className="bg-card border-none shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  {selectedProject ? `Mensagens: ${selectedProject}` : "Selecione um projeto"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLogs.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted">Nenhuma mensagem disponível</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedLogs.map((log, index) => (
                      <div
                        key={index}
                        className="max-w-xl bg-background p-4 rounded-lg shadow"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-primary font-medium">{log.remetente}</span>
                          <span className="text-xs text-muted">{log.data}</span>
                        </div>
                        <p className="mb-2">{log.mensagem}</p>
                        <div className="text-xs text-muted bg-secondary/30 rounded px-2 py-1 inline-block">
                          {log.origem}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatLog;
