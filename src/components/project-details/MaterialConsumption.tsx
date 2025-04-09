
import { useState } from "react";

interface Material {
  usado: number;
  planejado: number;
}

interface MaterialsData {
  [key: string]: Material;
}

interface MaterialConsumptionProps {
  materials: MaterialsData;
}

export default function MaterialConsumption({ materials }: MaterialConsumptionProps) {
  const [materiais, setMateriais] = useState(materials);
  
  return (
    <div className="bg-card p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Consumo de Materiais</h2>
      <div className="space-y-4">
        {Object.entries(materiais).map(([material, { usado, planejado }]) => {
          const percentagem = Math.round((usado / planejado) * 100);
          const acimaPlanejado = usado > planejado;
          
          return (
            <div key={material}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="capitalize">{material}</span>
                  <span className="text-gray-400 text-sm ml-2">
                    {usado} de {planejado} planejados
                  </span>
                </div>
                {acimaPlanejado && (
                  <span className="text-[#FF6200] text-xs bg-[#FF6200]/10 px-2 py-0.5 rounded-full">
                    {Math.round((usado / planejado - 1) * 100)}% acima do planejado
                  </span>
                )}
              </div>
              <div className="w-full bg-[#333333] rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${acimaPlanejado ? 'bg-[#FF6200]' : 'bg-primary'}`} 
                  style={{ width: `${Math.min(percentagem, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
