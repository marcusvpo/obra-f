
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Settings, Shield, Bell, Database } from "lucide-react";

export default function Configuracoes() {
  const [loading, setLoading] = useState(false);
  
  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Configurações redefinidas com sucesso!");
    }, 1500);
  };
  
  return (
    <AppLayout title="Configurações">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Segurança</CardTitle>
              </div>
              <CardDescription>
                Configure opções de segurança e permissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Autenticação em duas etapas</p>
                    <p className="text-xs text-muted-foreground">Aumente a segurança da sua conta</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Gerenciar permissões</p>
                    <p className="text-xs text-muted-foreground">Controle o acesso às funcionalidades</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notificações</CardTitle>
              </div>
              <CardDescription>
                Gerencie suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Notificações por email</p>
                    <p className="text-xs text-muted-foreground">Receba atualizações por email</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Alertas do sistema</p>
                    <p className="text-xs text-muted-foreground">Configure alertas importantes</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Dados e armazenamento</CardTitle>
              </div>
              <CardDescription>
                Gerencie seus dados e preferências de armazenamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Fazer backup</p>
                    <p className="text-xs text-muted-foreground">Exporte seus dados para um arquivo</p>
                  </div>
                  <Button variant="outline" size="sm">Exportar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Limpar cache</p>
                    <p className="text-xs text-muted-foreground">Remover dados temporários</p>
                  </div>
                  <Button variant="outline" size="sm">Limpar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>Geral</CardTitle>
              </div>
              <CardDescription>
                Configurações gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Idioma</p>
                    <p className="text-xs text-muted-foreground">Português (Brasil)</p>
                  </div>
                  <Button variant="outline" size="sm">Alterar</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Redefinir</p>
                    <p className="text-xs text-muted-foreground">Restaurar configurações padrão</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={loading}
                    onClick={handleReset}
                  >
                    {loading ? "Processando..." : "Redefinir"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
