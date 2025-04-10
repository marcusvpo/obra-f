
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { TimelineEvent } from "@/types/project";
import TimelineItem from "@/components/dashboard/TimelineItem";

export interface DelayHistoryProps {
  timeline: TimelineEvent[];
}

export default function DelayHistory({ timeline }: DelayHistoryProps) {
  return (
    <Card className="bg-card border-none shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock size={18} className="text-primary mr-2" />
          Histórico de Atrasos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {timeline && timeline.length > 0 ? (
          <div className="space-y-4 pl-2 pt-2">
            {timeline.map((event, index) => (
              <TimelineItem 
                key={event.id} 
                event={event} 
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted py-4">Nenhum atraso registrado</p>
        )}
      </CardContent>
    </Card>
  );
}
