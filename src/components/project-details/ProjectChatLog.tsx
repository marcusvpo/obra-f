
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage } from "@/types/project";
import { MessageCircle } from "lucide-react";

interface ProjectChatLogProps {
  messages: ChatMessage[];
  limit?: number;
  showViewAllButton?: boolean;
}

export default function ProjectChatLog({ 
  messages, 
  limit = 0,
  showViewAllButton = false 
}: ProjectChatLogProps) {
  const [showAllMessages, setShowAllMessages] = useState(false);
  
  // Display only the specified number of messages or all if limit is 0
  const displayMessages = limit > 0 && !showAllMessages ? messages.slice(0, limit) : messages;

  return (
    <>
      <Card className="bg-card border-none shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">
            Histórico de Conversas
          </CardTitle>
          
          {showViewAllButton && messages.length > limit && (
            <Button 
              variant="outline" 
              onClick={() => setShowAllMessages(true)}
              className="text-sm"
            >
              <MessageCircle size={14} className="mr-2" />
              Ver Todos
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {displayMessages.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted">Nenhuma mensagem disponível</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayMessages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-full p-4 rounded-lg shadow ${index % 2 === 0 ? 'bg-[#444444]' : 'bg-background'}`}
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
              
              {limit > 0 && messages.length > limit && !showAllMessages && (
                <div className="flex justify-center mt-2">
                  <Button 
                    variant="link" 
                    className="text-primary" 
                    onClick={() => setShowAllMessages(true)}
                  >
                    Ver mais mensagens
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={showAllMessages} onOpenChange={setShowAllMessages}>
        <DialogContent className="bg-background border-border max-w-4xl">
          <DialogHeader>
            <DialogTitle>Histórico Completo de Conversas</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted">Nenhuma mensagem disponível</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow ${index % 2 === 0 ? 'bg-[#444444]' : 'bg-background'}`}
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
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
