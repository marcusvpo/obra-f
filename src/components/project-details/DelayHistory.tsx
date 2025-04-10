
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { TimelineEvent } from "@/types/project";
import TimelineItem from "@/components/dashboard/TimelineItem";

export interface DelayHistoryProps {
  timeline: TimelineEvent[];
}

export default function DelayHistory({ timeline }: DelayHistoryProps) {
  // Se não houver timeline, criar alguns exemplos padrão
  const defaultTimeline: TimelineEvent[] = [
    {
      id: "delay1",
      date: "05/04/2025",
      title: "Atraso na concretagem",
      description: "Chuva forte causou atraso de 2 dias na concretagem do último andar",
      isDelayed: true
    },
    {
      id: "delay2",
      date: "28/03/2025",
      title: "Entrega de materiais atrasada",
      description: "Fornecedor atrasou a entrega dos materiais elétricos em 1 dia",
      isDelayed: true
    }
  ];
  
  const displayTimeline = timeline && timeline.length > 0 ? timeline : defaultTimeline;
  
  return (
    <Card className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock size={18} className="text-primary mr-2" />
          Histórico de Atrasos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[300px] overflow-y-auto pr-2">
          {displayTimeline.length > 0 ? (
            <div className="space-y-4 pl-2 pt-2">
              {displayTimeline.map((event, index) => (
                <TimelineItem 
                  key={event.id} 
                  event={event} 
                  isLast={index === displayTimeline.length - 1}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-4">Nenhum atraso registrado</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
