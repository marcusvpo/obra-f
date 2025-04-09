
import { AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertListProps {
  title: string;
  alerts: string[];
  type: 'safety' | 'quality';
  onResolve?: (index: number) => void;
}

export default function AlertList({ title, alerts, type, onResolve }: AlertListProps) {
  const getColor = () => {
    return type === 'safety' ? 'text-red-500 border-red-500' : 'text-yellow-500 border-yellow-500';
  };
  
  const getIcon = () => {
    return type === 'safety' ? 
      <AlertTriangle className="text-red-500" size={20} /> : 
      <AlertTriangle className="text-yellow-500" size={20} />;
  };

  return (
    <div className="bg-card rounded-lg p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {getIcon()}
        {title}
      </h2>
      
      {alerts.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum alerta disponível</p>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index} 
              className={`p-3 border-l-2 ${getColor()} bg-[#3A3A3A] rounded-r-md flex justify-between items-start`}
            >
              <div>
                <p className="text-sm whitespace-pre-wrap">{alert}</p>
              </div>
              
              {onResolve && (
                <Button 
                  onClick={() => onResolve(index)}
                  variant="ghost"
                  size="sm"
                  className="text-green-500 hover:bg-green-500/10 hover:text-green-400 min-w-[80px] h-7"
                >
                  <Check size={14} className="mr-1" />
                  Resolver
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
