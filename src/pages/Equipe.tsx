
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle } from "lucide-react";

interface TeamMember {
  id: string;
  nome: string;
  numero: string;
  projetos: string[];
  ultimaMensagem?: string;
}

const Equipe = () => {
  const teamMembers: TeamMember[] = [
    { 
      id: "1", 
      nome: "João Silva", 
      numero: "+5511999999999", 
      projetos: ["Casa 1"],
      ultimaMensagem: "07/04: Fundações concluídas" 
    },
    { 
      id: "2", 
      nome: "Maria Oliveira", 
      numero: "+5511988888888", 
      projetos: ["Edifício Solaris"],
      ultimaMensagem: "06/04: Iniciando instalações elétricas" 
    },
    { 
      id: "3", 
      nome: "Pedro Santos", 
      numero: "+5511977777777", 
      projetos: ["Hospital Regional"],
      ultimaMensagem: "05/04: Problema com entrega de material" 
    },
    { 
      id: "4", 
      nome: "Ana Costa", 
      numero: "+5511966666666", 
      projetos: ["Casa 1", "Edifício Solaris"],
      ultimaMensagem: "07/04: Concluindo a fundação" 
    }
  ];

  return (
    <AppLayout title="Equipe">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Equipe</h2>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-10 bg-card rounded-md">
            <p className="text-muted">Nenhum membro de equipe cadastrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <Card key={member.id} className="bg-[#444444] border-0">
                <CardContent className="p-4">
                  <div>
                    <h3 className="font-medium text-base">{member.nome}</h3>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone size={12} className="text-[#FF6200]" />
                      <span>{member.numero}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-xs">
                      <MessageCircle size={12} className="text-[#FF6200] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">Projetos:</p>
                        <p>{member.projetos.join(", ")}</p>
                      </div>
                    </div>
                    
                    {member.ultimaMensagem && (
                      <div className="mt-2 pt-2 border-t border-[#555555] text-xs text-gray-400">
                        <p>Última mensagem:</p>
                        <p className="text-white">{member.ultimaMensagem}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Equipe;
