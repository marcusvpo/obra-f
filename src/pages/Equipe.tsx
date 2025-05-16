
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Phone, MessageCircle, Edit, Trash2, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import TeamPerformance from "@/components/workers/TeamPerformance";
import { TeamMember } from "@/types/worker";

const Equipe = () => {
  const [activeTab, setActiveTab] = useState("trabalhadores");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<{ nome: string; numero: string }>({
    nome: "",
    numero: ""
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      id: "1", 
      nome: "João Silva", 
      numero: "(11) 999999999", 
      ultimaMensagem: "07/04: Fundações concluídas" 
    },
    { 
      id: "2", 
      nome: "Maria Oliveira", 
      numero: "(11) 988888888", 
      ultimaMensagem: "06/04: Iniciando instalações elétricas" 
    },
    { 
      id: "3", 
      nome: "Pedro Santos", 
      numero: "(11) 977777777", 
      ultimaMensagem: "05/04: Problema com entrega de material" 
    },
    { 
      id: "4", 
      nome: "Ana Costa", 
      numero: "(11) 966666666", 
      ultimaMensagem: "07/04: Concluindo a fundação" 
    }
  ]);

  const handleAddMember = () => {
    if (!newMember.nome || !newMember.numero) {
      toast.error("Preencha todos os campos");
      return;
    }

    const id = (teamMembers.length + 1).toString();
    const member: TeamMember = {
      id,
      nome: newMember.nome,
      numero: newMember.numero,
      ultimaMensagem: "Nenhuma mensagem ainda"
    };

    setTeamMembers([...teamMembers, member]);
    setNewMember({ nome: "", numero: "" });
    setIsAddDialogOpen(false);
    toast.success("Trabalhador adicionado com sucesso!");
  };

  const handleEditMember = () => {
    if (!selectedMember) return;
    
    setTeamMembers(teamMembers.map(member => 
      member.id === selectedMember.id ? selectedMember : member
    ));
    
    setIsEditDialogOpen(false);
    toast.success("Informações atualizadas com sucesso!");
  };

  const handleDeleteMember = () => {
    if (!selectedMember) return;
    
    setTeamMembers(teamMembers.filter(member => member.id !== selectedMember.id));
    setIsDeleteDialogOpen(false);
    toast.success("Trabalhador removido com sucesso!");
  };

  const openEditDialog = (member: TeamMember) => {
    setSelectedMember({...member});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AppLayout title="Equipe">
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-[#333333]">
              <TabsTrigger value="trabalhadores">Trabalhadores</TabsTrigger>
              <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-[#FF6200] text-white hover:bg-[#FF6200]/80"
            >
              <UserPlus size={18} className="mr-2" />
              Adicionar Trabalhador
            </Button>
          </div>

          <TabsContent value="trabalhadores" className="mt-0">
            {teamMembers.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg">
                <p className="text-muted">Nenhum trabalhador cadastrado</p>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  variant="outline"
                  className="mt-4"
                >
                  Adicionar trabalhador
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                  <Card key={member.id} className="bg-[#444444] border-0">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{member.nome}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#333333]"
                            onClick={() => openEditDialog(member)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                            onClick={() => openDeleteDialog(member)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={14} className="text-[#FF6200]" />
                          <span>{member.numero}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MessageCircle size={14} className="text-[#FF6200] mt-1" />
                          <div>
                            <p className="text-xs text-gray-400">Última mensagem:</p>
                            <p>{member.ultimaMensagem}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="desempenho" className="mt-0">
            <TeamPerformance teamMembers={teamMembers} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Adicionar Trabalhador</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsAddDialogOpen(false)}
              className="absolute right-4 top-4"
            >
              <X size={16} />
            </Button>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={newMember.nome}
                onChange={(e) => setNewMember({...newMember, nome: e.target.value})}
                placeholder="Nome do trabalhador"
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input 
                id="phone" 
                value={newMember.numero}
                onChange={(e) => setNewMember({...newMember, numero: e.target.value})}
                placeholder="Ex: (00) 123456789"
                className="bg-secondary"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleAddMember}
              className="bg-[#FF6200] text-white hover:bg-[#FF6200]/80"
            >
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Editar Trabalhador</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsEditDialogOpen(false)}
              className="absolute right-4 top-4"
            >
              <X size={16} />
            </Button>
          </DialogHeader>

          {selectedMember && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome</Label>
                <Input 
                  id="edit-name" 
                  value={selectedMember.nome}
                  onChange={(e) => setSelectedMember({...selectedMember, nome: e.target.value})}
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input 
                  id="edit-phone" 
                  value={selectedMember.numero}
                  onChange={(e) => setSelectedMember({...selectedMember, numero: e.target.value})}
                  className="bg-secondary"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleEditMember}
              className="bg-[#FF6200] text-white hover:bg-[#FF6200]/80"
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle>Remover Trabalhador</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="absolute right-4 top-4"
            >
              <X size={16} />
            </Button>
          </DialogHeader>

          {selectedMember && (
            <div className="py-4">
              <p>Você tem certeza que deseja remover <strong>{selectedMember.nome}</strong> da equipe?</p>
              <p className="text-sm text-muted mt-2">Esta ação não pode ser desfeita.</p>
            </div>
          )}

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteMember}
              variant="destructive"
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Equipe;
