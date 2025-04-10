
import RiskIndicator from "@/components/dashboard/RiskIndicator";
import ProductivityIndicator from "@/components/dashboard/ProductivityIndicator";
import AlertList from "@/components/dashboard/AlertList";
import MaintenanceList from "@/components/dashboard/MaintenanceList";
import { toast } from "sonner";
import { AlertItem, MaintenanceItem } from "@/types/project";

interface RiskInfo {
  percentage: number;
  days: number;
  reason: string;
}

export interface ProjectRiskInfoProps {
  delayRisk?: RiskInfo;
  teamProductivity?: number;
  safetyAlerts?: AlertItem[];
  qualityIssues?: AlertItem[];
  postConstructionMaintenance?: MaintenanceItem[];
  isCompleted?: boolean;
  onHandleRiskUpdated: () => void;
}

export default function ProjectRiskInfo({
  delayRisk,
  teamProductivity,
  safetyAlerts,
  qualityIssues,
  postConstructionMaintenance,
  isCompleted,
  onHandleRiskUpdated
}: ProjectRiskInfoProps) {
  
  const handleResolveAlert = (index: number, type: 'safety' | 'quality') => {
    onHandleRiskUpdated();
    toast.success(`Alerta resolvido com sucesso!`);
  };

  const handleCompleteMaintenance = (index: number) => {
    onHandleRiskUpdated();
    toast.success("Tarefa de manutenção concluída!");
  };
  
  return (
    <>
      {delayRisk && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RiskIndicator 
            percentage={delayRisk.percentage}
            days={delayRisk.days}
            reason={delayRisk.reason}
          />
          
          {teamProductivity !== undefined && (
            <ProductivityIndicator productivity={teamProductivity} />
          )}
        </div>
      )}
      
      {(safetyAlerts?.length || qualityIssues?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {safetyAlerts?.length > 0 && (
            <AlertList 
              title="Alertas de Segurança"
              alerts={safetyAlerts}
              type="safety"
              onResolve={(index) => handleResolveAlert(index, 'safety')}
            />
          )}
          
          {qualityIssues?.length > 0 && (
            <AlertList 
              title="Problemas de Qualidade"
              alerts={qualityIssues}
              type="quality"
              onResolve={(index) => handleResolveAlert(index, 'quality')}
            />
          )}
        </div>
      )}
      
      {isCompleted && postConstructionMaintenance && postConstructionMaintenance.length > 0 && (
        <MaintenanceList 
          maintenance={postConstructionMaintenance}
          onComplete={handleCompleteMaintenance}
        />
      )}
    </>
  );
}
