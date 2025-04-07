
import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function KpiCard({ title, value, icon, trend }: KpiCardProps) {
  return (
    <div className="bg-card rounded-lg p-5 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-muted">{title}</h3>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      
      <div className="flex items-end justify-between mt-1">
        <div className="text-xl font-semibold">{value}</div>
        
        {trend && (
          <div className={`text-xs flex items-center ${trend.isPositive ? 'text-green-500' : 'text-primary'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}
