
import React from 'react';

export interface ChatMessage {
  remetente: string;
  data: string;
  hora: string;
  mensagem: string;
}

interface ChatLogSectionProps {
  messages: ChatMessage[];
  projectName: string;
}

const ChatLogSection: React.FC<ChatLogSectionProps> = ({ messages, projectName }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="bg-[#444444] rounded-md p-4 mt-4">
        <h2 className="text-lg font-medium text-white mb-2">ChatLog</h2>
        <p className="text-sm text-gray-400">Nenhuma mensagem registrada para este projeto.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#444444] rounded-md p-4 mt-4">
      <h2 className="text-lg font-medium text-white mb-3">ChatLog</h2>
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="bg-[#333333] rounded-md p-3">
            <div className="flex justify-between items-start">
              <span className="text-[#FF6200] text-sm font-medium">{msg.remetente}</span>
              <span className="text-xs text-gray-400">{msg.data} às {msg.hora}</span>
            </div>
            <p className="text-sm mt-1">{msg.mensagem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLogSection;
