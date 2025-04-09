import { ChatLogEntry, ChatMessage } from "@/types/project";

export const chatLogs: ChatLogEntry[] = [
  { 
    obra: "Condomínio Villa Verde", 
    logs: [
      { data: "09/04/2025", hora: "15:30", remetente: "João (+5511999999999)", mensagem: "Finalizada instalação elétrica em 5 apartamentos do bloco B", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "14:15", remetente: "João (+5511999999999)", mensagem: "Iniciando instalação elétrica no bloco B", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "10:20", remetente: "Maria (+5511988888888)", mensagem: "Entregue novo lote de materiais elétricos", origem: "Atualização de materiais" },
      { data: "07/04/2025", hora: "16:45", remetente: "João (+5511999999999)", mensagem: "Instalações elétricas iniciadas no bloco A", origem: "Status no dashboard" },
      { data: "05/04/2025", hora: "11:30", remetente: "Maria (+5511988888888)", mensagem: "Recebemos os materiais elétricos e hidráulicos hoje", origem: "Atualização de materiais" },
      { data: "02/04/2025", hora: "17:20", remetente: "João (+5511999999999)", mensagem: "Estrutura de concreto do último andar finalizada", origem: "Status no dashboard" },
      { data: "28/03/2025", hora: "09:15", remetente: "Maria (+5511988888888)", mensagem: "Tivemos que pausar a concretagem por causa da chuva forte. Atraso de 1 dia.", origem: "Alerta de atraso" }
    ]
  },
  { 
    obra: "Edifício Solaris", 
    logs: [
      { data: "09/04/2025", hora: "10:45", remetente: "Ana (+5511966666666)", mensagem: "Recebemos parte do concreto com atraso", origem: "Status no dashboard" },
      { data: "06/04/2025", hora: "14:30", remetente: "Pedro (+5511977777777)", mensagem: "Problemas com o fornecedor de concreto. Vamos atrasar 2 dias.", origem: "Alerta de atraso" },
      { data: "04/04/2025", hora: "16:15", remetente: "Pedro (+5511977777777)", mensagem: "Concretagem do 2º andar concluída com sucesso", origem: "Status no dashboard" },
      { data: "01/04/2025", hora: "08:45", remetente: "Ana (+5511966666666)", mensagem: "Iniciamos a montagem das formas para o 3º andar hoje", origem: "Status no dashboard" }
    ]
  },
  {
    obra: "Residencial Monte Alto",
    logs: [
      { data: "09/04/2025", hora: "14:15", remetente: "Carlos (+5511955555555)", mensagem: "Acabamento de 70% dos apartamentos concluído", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "09:30", remetente: "Carlos (+5511955555555)", mensagem: "Recebemos os materiais para finalização", origem: "Atualizaço de materiais" },
      { data: "07/04/2025", hora: "13:00", remetente: "Carlos (+5511955555555)", mensagem: "Acabamentos avançando conforme planejado", origem: "Status no dashboard" }
    ]
  },
  {
    obra: "Shopping Center Plaza",
    logs: [
      { data: "08/04/2025", hora: "16:20", remetente: "Roberto (+5511944444444)", mensagem: "Fundações concluídas, mas com 5 dias de atraso", origem: "Status no dashboard" },
      { data: "05/04/2025", hora: "11:45", remetente: "Roberto (+5511944444444)", mensagem: "Problemas na fundação estão causando atrasos significativos", origem: "Alerta de atraso" }
    ]
  },
  {
    obra: "Hospital Regional",
    logs: [
      { data: "09/04/2025", hora: "11:10", remetente: "Paula (+5511933333333)", mensagem: "Instalações hidráulicas no 2º andar concluídas", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "10:05", remetente: "Paula (+5511933333333)", mensagem: "Recebemos novos materiais hidráulicos", origem: "Atualização de materiais" },
      { data: "07/04/2025", hora: "15:30", remetente: "Paula (+5511933333333)", mensagem: "Iniciando instalações hidráulicas no 2º andar", origem: "Status no dashboard" }
    ]
  },
  {
    obra: "Escola Municipal",
    logs: [
      { data: "09/04/2025", hora: "16:45", remetente: "Marcelo (+5511922222222)", mensagem: "Pintura externa concluída 100%", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "14:30", remetente: "Marcelo (+5511922222222)", mensagem: "95% da pintura externa finalizada", origem: "Status no dashboard" },
      { data: "09/04/2025", hora: "11:45", remetente: "Marcelo (+5511922222222)", mensagem: "Recebemos mais tinta para finalização", origem: "Atualização de materiais" },
      { data: "09/04/2025", hora: "09:20", remetente: "Marcelo (+5511922222222)", mensagem: "Iniciando último dia de pintura externa", origem: "Status no dashboard" },
      { data: "07/04/2025", hora: "17:10", remetente: "Marcelo (+5511922222222)", mensagem: "85% da pintura externa finalizada", origem: "Status no dashboard" }
    ]
  }
];

export function getProjectUpdatesForToday() {
  const today = "09/04/2025"; // Current date
  const updates: Record<string, number> = {};
  
  chatLogs.forEach(log => {
    const todayLogs = log.logs.filter(l => l.data === today);
    updates[log.obra] = todayLogs.length;
  });
  
  return updates;
}
