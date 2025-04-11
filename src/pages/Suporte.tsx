
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Suporte = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de envio
    toast.success("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.");
    setNome("");
    setEmail("");
    setAssunto("");
    setMensagem("");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <AppLayout title="Suporte">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Como podemos ajudar?</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            custom={0} 
            initial="hidden" 
            animate="visible" 
            variants={cardVariants}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone size={20} className="mr-2 text-primary" />
                  Suporte por Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Nossa equipe está disponível para ajudar por telefone em horário comercial.
                </p>
                <p className="font-semibold">(11) 4567-8901</p>
                <p className="text-xs text-muted-foreground">
                  Segunda a Sexta, 9h às 18h
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            custom={1} 
            initial="hidden" 
            animate="visible" 
            variants={cardVariants}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail size={20} className="mr-2 text-primary" />
                  Suporte por Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Envie suas dúvidas por email e responderemos em até 24 horas.
                </p>
                <p className="font-semibold">suporte@construcoesramos.com.br</p>
                <p className="text-xs text-muted-foreground">
                  Atendimento 24/7
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            custom={2} 
            initial="hidden" 
            animate="visible" 
            variants={cardVariants}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare size={20} className="mr-2 text-primary" />
                  Chat Ao Vivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Converse em tempo real com nossos especialistas.
                </p>
                <Button className="w-full">
                  Iniciar Chat
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Disponível das 8h às 20h
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle size={20} className="mr-2 text-primary" />
                Envie sua mensagem
              </CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium">
                      Nome
                    </label>
                    <Input 
                      id="nome" 
                      value={nome} 
                      onChange={(e) => setNome(e.target.value)} 
                      placeholder="Seu nome completo" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="seu.email@exemplo.com" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="assunto" className="text-sm font-medium">
                    Assunto
                  </label>
                  <Input 
                    id="assunto" 
                    value={assunto} 
                    onChange={(e) => setAssunto(e.target.value)} 
                    placeholder="Assunto da mensagem" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="mensagem" className="text-sm font-medium">
                    Mensagem
                  </label>
                  <Textarea 
                    id="mensagem" 
                    value={mensagem} 
                    onChange={(e) => setMensagem(e.target.value)} 
                    placeholder="Descreva em detalhes como podemos ajudar..." 
                    rows={5} 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Suporte;
