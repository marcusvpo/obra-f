
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Check, MessageCircle, BarChart2, ClipboardList, Clock, Shield, Share2 } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Gerenciamento de obras <span className="text-primary">simplificado</span>
              </h1>
              <p className="text-lg md:text-xl text-muted mb-8 max-w-xl">
                Transformando o gerenciamento de obras com tecnologia inteligente e integração via WhatsApp para construtoras de todos os portes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/projetos">Conheça a Plataforma</Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="#contato">
                    <MessageCircle size={18} />
                    <span>Agende uma Demo</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative z-10">
              <div className="relative bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40"></div>
                <img 
                  src="/dashboard-preview.png" 
                  alt="Dashboard ObraFácil" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Dashboard+ObraF%C3%A1cil";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <a href="#beneficios" className="animate-bounce flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 px-4 md:px-8 lg:px-16 bg-secondary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Por que escolher o <span className="text-primary">ObraFácil</span>?
            </h2>
            <p className="text-lg text-muted">
              Nossa plataforma foi desenhada para resolver as principais dores das construtoras, trazendo simplicidade e eficiência para cada etapa do seu projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <BarChart2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Visualização em Tempo Real</h3>
                <p className="text-muted">
                  Acompanhe métricas e indicadores essenciais do seu projeto em tempo real, facilitando decisões rápidas e precisas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <ClipboardList className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Gerenciamento Simplificado</h3>
                <p className="text-muted">
                  Organize tarefas, recursos e cronogramas em uma interface intuitiva que reduz a complexidade do gerenciamento.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Integração com WhatsApp</h3>
                <p className="text-muted">
                  Comunique-se diretamente pelo WhatsApp, acesse atualizações e envie informações sem precisar acessar a plataforma.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Economia de Tempo</h3>
                <p className="text-muted">
                  Reduza em até 70% o tempo gasto com gerenciamento manual, permitindo que sua equipe foque no que realmente importa.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Redução de Riscos</h3>
                <p className="text-muted">
                  Identifique e antecipe problemas com nosso sistema de alertas inteligentes, reduzindo atrasos e custos extras.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="h-1 bg-primary"></div>
              <CardContent className="pt-6">
                <Share2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Colaboração Eficiente</h3>
                <p className="text-muted">
                  Promova uma comunicação transparente entre escritório e campo, eliminando ruídos e aumentando a produtividade.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dores que resolvemos */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-primary">Dores</span> que resolvemos
            </h2>
            <p className="text-lg text-muted">
              Sabemos que gerenciar uma obra pode ser desafiador. O ObraFácil foi desenvolvido para eliminar os principais problemas enfrentados por construtoras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold mb-6">Antes do ObraFácil</h3>
              <ul className="space-y-4">
                {[
                  "Comunicação fragmentada entre campo e escritório",
                  "Dificuldade no acompanhamento do cronograma",
                  "Retrabalhos frequentes por falta de informação",
                  "Perda de tempo com relatórios manuais",
                  "Decisões baseadas em dados desatualizados",
                  "Necessidade de visitas constantes à obra"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="min-w-5 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col bg-card rounded-lg p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-6">Com o ObraFácil</h3>
              <ul className="space-y-4">
                {[
                  "Comunicação centralizada e integrada ao WhatsApp",
                  "Monitoramento em tempo real do andamento da obra",
                  "Redução de 85% nos retrabalhos com informações claras",
                  "Geração automática de relatórios e dashboards",
                  "Tomada de decisões baseadas em dados atualizados",
                  "Acompanhamento remoto com fotos e atualizações diárias"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="min-w-5 mt-0.5">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Integration */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-background to-secondary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 order-2 lg:order-1">
              <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border p-2 max-w-sm mx-auto">
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">ObraFácil Bot</h4>
                      <p className="text-xs text-muted">Online</p>
                    </div>
                  </div>
                  
                  <div className="py-4 space-y-3">
                    <div className="bg-secondary/80 p-3 rounded-lg rounded-tl-none w-4/5">
                      <p className="text-sm">Bom dia! Como está o andamento da obra hoje?</p>
                      <p className="text-[10px] text-muted text-right mt-1">09:15</p>
                    </div>
                    
                    <div className="bg-primary/20 p-3 rounded-lg rounded-tr-none w-4/5 ml-auto">
                      <p className="text-sm">Concretagem finalizada. Enviando fotos.</p>
                      <p className="text-[10px] text-muted mt-1">09:17</p>
                    </div>
                    
                    <div className="bg-secondary/80 p-3 rounded-lg rounded-tl-none w-4/5">
                      <p className="text-sm">Recebido! Atualizei o progresso para 45%. Algum problema a relatar?</p>
                      <p className="text-[10px] text-muted text-right mt-1">09:18</p>
                    </div>
                    
                    <div className="bg-primary/20 p-3 rounded-lg rounded-tr-none w-4/5 ml-auto">
                      <p className="text-sm">Nenhum problema. Cronograma em dia.</p>
                      <p className="text-[10px] text-muted mt-1">09:20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Gerenciamento via <span className="text-primary">WhatsApp</span>
              </h2>
              
              <p className="text-lg mb-8">
                Nossa integração exclusiva com WhatsApp transforma a maneira como você interage com seu projeto. Sem precisar de aplicativos adicionais ou interfaces complexas.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Atualizações Instantâneas", 
                    desc: "Receba e envie atualizações sobre o progresso da obra diretamente pelo WhatsApp"
                  },
                  {
                    title: "Registro Automático", 
                    desc: "Todas as informações trocadas são automaticamente registradas no sistema"
                  },
                  {
                    title: "Alertas Inteligentes", 
                    desc: "Seja notificado sobre problemas, atrasos ou questões urgentes em tempo real"
                  },
                  {
                    title: "Comunicação Simplificada", 
                    desc: "Interface familiar para toda a equipe, eliminando barreiras tecnológicas"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-muted text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="py-20 px-4 md:px-8 lg:px-16 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para revolucionar o gerenciamento das suas obras?
          </h2>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Agende uma demonstração personalizada e descubra como o ObraFácil pode transformar a gestão dos seus projetos, economizando tempo e recursos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MessageCircle size={18} />
              <span>Agendar Demonstração</span>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/projetos">
                Explorar Plataforma
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-8 lg:px-16 bg-background border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
              <span className="text-xl font-bold">ObraFácil</span>
            </div>
            <div className="text-sm text-muted">
              © {new Date().getFullYear()} ObraFácil. Todos os direitos reservados.
            </div>
            <div className="flex gap-4">
              {["LinkedIn", "Instagram", "Twitter", "Email"].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-sm hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
