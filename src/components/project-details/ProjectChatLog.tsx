
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage } from "@/types/project";

interface ProjectChatLogProps {
  messages: ChatMessage[];
}

export default function ProjectChatLog({ messages }: ProjectChatLogProps) {
  const [selectedMessages, setSelectedMessages] = useState<ChatMessage[]>(messages);

  return (
    <div className="mt-6">
      <Card className="bg-card border-none shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            Histórico de Conversas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedMessages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted">Nenhuma mensagem disponível</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-xl p-4 rounded-lg shadow ${index % 2 === 0 ? 'bg-[#444444]' : 'bg-background'}`}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-primary font-medium">{message.remetente}</span>
                    <span className="text-xs text-muted">
                      {message.data} {message.hora ? `às ${message.hora}` : ''}
                    </span>
                  </div>
                  <p className="mb-2">{message.mensagem}</p>
                  {message.origem && (
                    <div className="text-xs text-muted bg-secondary/30 rounded px-2 py-1 inline-block">
                      {message.origem}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
