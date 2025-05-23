
import { AlertTriangle, AlertCircle } from "lucide-react";
import { AlertItem } from "@/types/project";

interface AlertListProps {
  title: string;
  alerts: AlertItem[];
  type: 'safety' | 'quality';
  onResolve?: (index: number) => void;
}

export default function AlertList({ title, alerts, type }: AlertListProps) {
  const getIcon = () => {
    if (type === 'safety') return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };
  
  return (
    <div className="bg-[#3A3A3A] p-4 rounded-lg">
      <h3 className="font-medium flex items-center gap-2 mb-3">
        {getIcon()}
        {title} ({alerts.length})
      </h3>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={index} 
            className="bg-card rounded p-3"
          >
            <div>
              <p className="text-sm font-medium">{alert.title}</p>
              <p className="text-xs text-gray-400">{alert.date}</p>
              <p className="text-sm mt-1">{alert.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
