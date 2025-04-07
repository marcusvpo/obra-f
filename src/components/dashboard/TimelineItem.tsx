
import { cn } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  isDelayed?: boolean;
}

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

export default function TimelineItem({ event, isLast }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-3 h-3 rounded-full z-10",
          event.isDelayed ? "bg-primary" : "bg-green-500"
        )} />
        {!isLast && <div className="w-0.5 bg-secondary flex-grow mt-1" />}
      </div>
      
      <div className={cn(
        "pb-6 flex-1",
        isLast ? "pb-0" : ""
      )}>
        <div className="text-xs text-muted">{event.date}</div>
        <div className={cn(
          "font-medium mt-0.5",
          event.isDelayed ? "text-primary" : ""
        )}>
          {event.title}
        </div>
        {event.description && (
          <div className="text-sm mt-1 text-muted">{event.description}</div>
        )}
      </div>
    </div>
  );
}
