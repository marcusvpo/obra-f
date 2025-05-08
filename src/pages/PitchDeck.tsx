
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Rocket, 
  PieChart, 
  BarChart, 
  Users, 
  Briefcase,
  Lightbulb,
  Target
} from "lucide-react";

interface SlideProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const Slide = ({ title, children, icon }: SlideProps) => (
  <Card className="bg-[#333333] border-[#444444] w-full max-w-5xl mx-auto h-[calc(100vh-180px)] overflow-hidden shadow-lg">
    <div className="flex items-center gap-2 bg-[#444444] border-b border-[#555555] p-4">
      <div className="bg-[#FF6200] p-2 rounded-md">{icon}</div>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <CardContent className="p-8 h-[calc(100%-64px)] overflow-y-auto">
      {children}
    </CardContent>
  </Card>
);

const ProblemSlide = () => (
  <Slide title="O Problema" icon={<MessageSquare className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Gerenciamento de Obras Ineficiente</h3>
        <p className="text-lg mb-6">O setor da construção civil enfrenta desafios significativos no gerenciamento de projetos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">72%</div>
          <p className="text-center">das construtoras relatam problemas de comunicação entre campo e escritório</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">36%</div>
          <p className="text-center">é a taxa média de retrabalho por falhas de comunicação</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">1.5M</div>
          <p className="text-center">profissionais lutam com controle de projetos fragmentado</p>
        </div>
      </div>
      
      <div className="mt-8 bg-[#3A3A3A] p-6 rounded-lg border-l-4 border-[#FF6200]">
        <h4 className="font-bold mb-2">Principais Desafios:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comunicação fragmentada entre equipes e clientes</li>
          <li>Dificuldade em monitorar o progresso das obras</li>
          <li>Gestão ineficiente de recursos e materiais</li>
          <li>Alta taxa de retrabalho e falhas de execução</li>
        </ul>
      </div>
    </div>
  </Slide>
);

const SolutionSlide = () => (
  <Slide title="A Solução" icon={<Lightbulb className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">ObraFácil: Gestão Integrada de Construções</h3>
        <p className="text-lg mb-6">Uma plataforma centralizada que conecta o escritório com o campo via WhatsApp, simplificando todo o processo de gerenciamento de obras</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#444444] p-6 rounded-lg">
          <div className="w-full h-48 bg-[#3A3A3A] mb-4 rounded flex items-center justify-center">
            <img src="/placeholder.svg" alt="Dashboard ObraFácil" className="max-h-full object-contain" />
          </div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Dashboard Unificado</h4>
          <p>Visão completa de todos os projetos e métricas relevantes em um só lugar</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg">
          <div className="w-full h-48 bg-[#3A3A3A] mb-4 rounded flex items-center justify-center">
            <img src="/placeholder.svg" alt="Integração WhatsApp" className="max-h-full object-contain" />
          </div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Integração WhatsApp</h4>
          <p>Comunicação direta com a equipe em campo sem precisar de aplicativos adicionais</p>
        </div>
      </div>
      
      <div className="mt-6 bg-[#3A3A3A] p-6 rounded-lg border-l-4 border-[#FF6200]">
        <h4 className="font-bold mb-2">Diferencial-Chave:</h4>
        <p>Enquanto outras soluções exigem aplicativos específicos e treinamento extensivo, o ObraFácil integra-se ao WhatsApp - ferramenta que suas equipes já usam diariamente, eliminando barreiras de adoção.</p>
      </div>
    </div>
  </Slide>
);

const MarketSlide = () => (
  <Slide title="Tamanho de Mercado" icon={<PieChart className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Um Mercado Massivo em Digitalização</h3>
        <p className="text-lg mb-4">A construção civil representa 7% do PIB brasileiro com crescente adoção digital</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">R$500B</div>
          <p className="text-center">Valor do mercado de construção civil no Brasil (TAM)</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">R$85B</div>
          <p className="text-center">Mercado de gerenciamento de projetos de construção (SAM)</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">R$12B</div>
          <p className="text-center">Mercado inicial de foco: pequenas e médias construtoras (SOM)</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Crescimento do Mercado</h4>
          <div className="w-full h-40 bg-[#444444] rounded mb-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <BarChart className="text-[#FF6200]" size={120} />
            </div>
          </div>
          <p>Taxa de crescimento anual do mercado de software para construção: 18%</p>
        </div>
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Por que Agora?</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Crescente adoção de soluções digitais pós-pandemia</li>
            <li>Penetração de smartphones em 97% das equipes de campo</li>
            <li>Pressão por redução de custos e aumento de eficiência</li>
            <li>WhatsApp como ferramenta universal no setor</li>
          </ul>
        </div>
      </div>
    </div>
  </Slide>
);

const BusinessModelSlide = () => (
  <Slide title="Modelo de Negócio" icon={<Briefcase className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Modelo de Assinatura Simples e Escalável</h3>
      </div>
      
      <div className="bg-[#444444] p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="bg-[#3A3A3A] p-6 rounded-lg flex-1">
            <h4 className="text-xl font-bold text-[#FF6200] mb-4 text-center">Como Geramos Receita</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center">1</div>
                <div>
                  <p className="font-semibold">Modelo SaaS por Projetos</p>
                  <p className="text-sm text-gray-300">Assinatura baseada no número de projetos simultâneos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center">2</div>
                <div>
                  <p className="font-semibold">Versão Básica Gratuita</p>
                  <p className="text-sm text-gray-300">Para atração de clientes e expansão da base de usuários</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center">3</div>
                <div>
                  <p className="font-semibold">Recursos Avançados Premium</p>
                  <p className="text-sm text-gray-300">Análise de dados, IA e integrações personalizadas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#3A3A3A] p-6 rounded-lg flex-1">
            <h4 className="text-xl font-bold text-[#FF6200] mb-4 text-center">Unidade Econômica</h4>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[#555555] pb-2">
                <span>CAC Médio:</span>
                <span className="font-bold">R$ 800</span>
              </div>
              <div className="flex justify-between border-b border-[#555555] pb-2">
                <span>LTV Médio:</span>
                <span className="font-bold">R$ 8.400</span>
              </div>
              <div className="flex justify-between border-b border-[#555555] pb-2">
                <span>LTV/CAC Ratio:</span>
                <span className="font-bold text-[#FF6200]">10.5x</span>
              </div>
              <div className="flex justify-between">
                <span>Tempo médio de recuperação de CAC:</span>
                <span className="font-bold">4 meses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#3A3A3A] p-6 rounded-lg border-l-4 border-[#FF6200]">
        <h4 className="font-bold mb-2">Proposta de Valor Clara:</h4>
        <p>Para cada R$1 investido no ObraFácil, o cliente economiza em média R$4,70 em custos operacionais, retrabalhos evitados e eficiência aumentada.</p>
      </div>
    </div>
  </Slide>
);

const TractionSlide = () => (
  <Slide title="Tração" icon={<BarChart className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Crescimento Consistente</h3>
        <p className="text-lg mb-4">Métricas que demonstram a validação do mercado</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#444444] p-6 rounded-lg">
          <h4 className="font-bold mb-4 text-center">Crescimento de Usuários</h4>
          <div className="w-full h-60 bg-[#3A3A3A] rounded mb-4 relative overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="h-full flex items-end justify-around">
                <div className="w-6 bg-[#FF6200] h-[15%] rounded-t"></div>
                <div className="w-6 bg-[#FF6200] h-[25%] rounded-t"></div>
                <div className="w-6 bg-[#FF6200] h-[40%] rounded-t"></div>
                <div className="w-6 bg-[#FF6200] h-[60%] rounded-t"></div>
                <div className="w-6 bg-[#FF6200] h-[90%] rounded-t"></div>
              </div>
              <div className="absolute bottom-2 left-0 right-0 flex justify-around text-xs">
                <span>JAN</span>
                <span>FEV</span>
                <span>MAR</span>
                <span>ABR</span>
                <span>MAI</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#FF6200]">+28% MoM</p>
            <p>Crescimento médio mensal de usuários</p>
          </div>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg">
          <h4 className="font-bold mb-4 text-center">Engajamento</h4>
          <div className="space-y-4">
            <div className="bg-[#3A3A3A] p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Projetos gerenciados:</span>
                <span className="font-bold text-[#FF6200]">320</span>
              </div>
              <div className="w-full bg-[#555555] rounded-full h-2">
                <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            
            <div className="bg-[#3A3A3A] p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Taxa de retenção:</span>
                <span className="font-bold text-[#FF6200]">92%</span>
              </div>
              <div className="w-full bg-[#555555] rounded-full h-2">
                <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            
            <div className="bg-[#3A3A3A] p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>NPS:</span>
                <span className="font-bold text-[#FF6200]">78</span>
              </div>
              <div className="w-full bg-[#555555] rounded-full h-2">
                <div className="bg-[#FF6200] h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#3A3A3A] p-6 rounded-lg">
        <h4 className="font-bold mb-4 text-[#FF6200]">Casos de Sucesso</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-sm italic">"Reduzimos o tempo de comunicação entre escritório e campo em 65% desde que implementamos o ObraFácil."</p>
            <p className="text-right text-[#FF6200] mt-2">- Construtora Exemplo</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-sm italic">"O retrabalho caiu 42% em apenas 3 meses de uso da plataforma."</p>
            <p className="text-right text-[#FF6200] mt-2">- Engenharia & Cia</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-sm italic">"Conseguimos gerenciar 30% mais projetos com a mesma equipe graças ao ObraFácil."</p>
            <p className="text-right text-[#FF6200] mt-2">- Construções Brasil</p>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const CompetitionSlide = () => (
  <Slide title="Concorrência" icon={<Target className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Nosso Diferencial Competitivo</h3>
        <p className="text-lg mb-4">Enquanto a concorrência cria barreiras, nós eliminamos fricção</p>
      </div>
      
      <div className="bg-[#444444] p-6 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pb-4">Característica</th>
                <th className="text-center pb-4 text-[#FF6200]">ObraFácil</th>
                <th className="text-center pb-4">Software A</th>
                <th className="text-center pb-4">Software B</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[#555555]">
                <td className="py-3">Integração WhatsApp</td>
                <td className="text-center text-[#FF6200]">✓</td>
                <td className="text-center">✗</td>
                <td className="text-center">✗</td>
              </tr>
              <tr className="border-b border-[#555555]">
                <td className="py-3">Sem necessidade de app adicional</td>
                <td className="text-center text-[#FF6200]">✓</td>
                <td className="text-center">✗</td>
                <td className="text-center">✗</td>
              </tr>
              <tr className="border-b border-[#555555]">
                <td className="py-3">Tempo de implementação</td>
                <td className="text-center text-[#FF6200]">1 dia</td>
                <td className="text-center">2 semanas</td>
                <td className="text-center">1 mês</td>
              </tr>
              <tr className="border-b border-[#555555]">
                <td className="py-3">Facilidade de uso</td>
                <td className="text-center text-[#FF6200]">★★★★★</td>
                <td className="text-center">★★★☆☆</td>
                <td className="text-center">★★☆☆☆</td>
              </tr>
              <tr>
                <td className="py-3">Análise de riscos em tempo real</td>
                <td className="text-center text-[#FF6200]">✓</td>
                <td className="text-center">Limitada</td>
                <td className="text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Por Que Outras Soluções Falham</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Exigem treinamento extensivo da equipe</li>
            <li>Aplicativos adicionais que consomem memória do celular</li>
            <li>Interfaces complexas e pouco intuitivas</li>
            <li>Alto custo de implementação</li>
            <li>Resistência dos trabalhadores em campo para adoção</li>
          </ul>
        </div>
        
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Nossa Vantagem Única</h4>
          <p className="mb-4">Integramos com o WhatsApp, ferramenta que:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Já é usada por 99% dos trabalhadores da construção</li>
            <li>Não exige treinamento adicional</li>
            <li>Funciona mesmo em áreas com conexão limitada</li>
            <li>Permite compartilhamento de fotos, vídeos e documentos</li>
            <li>É familiar tanto para gestores quanto para equipes de campo</li>
          </ul>
        </div>
      </div>
    </div>
  </Slide>
);

const TeamSlide = () => (
  <Slide title="Equipe" icon={<Users className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Quem Está Por Trás do ObraFácil</h3>
        <p className="text-lg mb-4">Time multidisciplinar com experiência em construção civil e tecnologia</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#444444] p-6 rounded-lg text-center">
          <div className="w-32 h-32 bg-[#3A3A3A] rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
            <img src="/placeholder.svg" alt="CEO" className="w-full h-full object-cover" />
          </div>
          <h4 className="font-bold text-[#FF6200]">Ana Silva</h4>
          <p className="text-sm mb-2">CEO & Fundadora</p>
          <p className="text-sm mb-4">Engenheira Civil com 15 anos de experiência em gestão de obras</p>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center">
              <span className="text-xs">In</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg text-center">
          <div className="w-32 h-32 bg-[#3A3A3A] rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
            <img src="/placeholder.svg" alt="CTO" className="w-full h-full object-cover" />
          </div>
          <h4 className="font-bold text-[#FF6200]">Carlos Mendes</h4>
          <p className="text-sm mb-2">CTO</p>
          <p className="text-sm mb-4">Ex-líder de engenharia no iFood, especialista em desenvolvimento mobile</p>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center">
              <span className="text-xs">In</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg text-center">
          <div className="w-32 h-32 bg-[#3A3A3A] rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
            <img src="/placeholder.svg" alt="COO" className="w-full h-full object-cover" />
          </div>
          <h4 className="font-bold text-[#FF6200]">Rafael Costa</h4>
          <p className="text-sm mb-2">COO</p>
          <p className="text-sm mb-4">10 anos na indústria de construção, ex-diretor operacional de construtora de médio porte</p>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center">
              <span className="text-xs">In</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Nossa Experiência</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>+25 anos combinados em gestão de projetos de construção</li>
            <li>+10 anos de experiência em desenvolvimento de software</li>
            <li>Vivência prática dos problemas que estamos resolvendo</li>
            <li>Rede de contatos no setor de construção civil</li>
          </ul>
        </div>
        
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Conselho Consultivo</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#444444] rounded-full flex items-center justify-center">
                <img src="/placeholder.svg" alt="Advisor" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <p className="font-semibold">Roberto Almeida</p>
                <p className="text-sm">Ex-presidente da Associação Brasileira de Construtoras</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#444444] rounded-full flex items-center justify-center">
                <img src="/placeholder.svg" alt="Advisor" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <p className="font-semibold">Luiza Santos</p>
                <p className="text-sm">Investidora anjo com portfolio em ConTech</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const GoToMarketSlide = () => (
  <Slide title="Estratégia de Entrada no Mercado" icon={<Rocket className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Como Vamos Escalar</h3>
        <p className="text-lg mb-4">Estratégia de três fases para conquistar o mercado</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-[#444444] p-6 rounded-lg flex-1">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-[#FF6200] rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl font-bold">1</span>
            </div>
            <h4 className="font-bold">Fase Inicial</h4>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Foco em construtoras de pequeno e médio porte</li>
            <li>Marketing de conteúdo direcionado a problemas específicos</li>
            <li>Programa "Indique e Ganhe" para crescimento orgânico</li>
            <li>Piloto gratuito por 30 dias</li>
          </ul>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg flex-1">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-[#FF6200] rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl font-bold">2</span>
            </div>
            <h4 className="font-bold">Crescimento</h4>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Expansão para construtoras de grande porte</li>
            <li>Parcerias estratégicas com fornecedores de materiais</li>
            <li>Integração com sistemas de ERP populares no setor</li>
            <li>Equipe de vendas especializada</li>
          </ul>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg flex-1">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-[#FF6200] rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl font-bold">3</span>
            </div>
            <h4 className="font-bold">Expansão</h4>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Entrada em mercados internacionais (América Latina)</li>
            <li>Desenvolvimento de módulos específicos por nicho</li>
            <li>Plataforma de marketplace para serviços complementares</li>
            <li>Modelo white-label para grandes construtoras</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Métricas de Aquisição</h4>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Custo de Aquisição de Cliente (CAC):</span>
              <span className="font-bold">R$ 800</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Conversão (Trial para Pago):</span>
              <span className="font-bold">32%</span>
            </div>
            <div className="flex justify-between">
              <span>Tempo Médio de Ciclo de Vendas:</span>
              <span className="font-bold">21 dias</span>
            </div>
          </div>
        </div>
        
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <h4 className="font-bold mb-2 text-[#FF6200]">Parcerias Estratégicas</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-[#444444] h-16 rounded flex items-center justify-center">
              <span className="text-xs">Parceiro 1</span>
            </div>
            <div className="bg-[#444444] h-16 rounded flex items-center justify-center">
              <span className="text-xs">Parceiro 2</span>
            </div>
            <div className="bg-[#444444] h-16 rounded flex items-center justify-center">
              <span className="text-xs">Parceiro 3</span>
            </div>
            <div className="bg-[#444444] h-16 rounded flex items-center justify-center">
              <span className="text-xs">Parceiro 4</span>
            </div>
            <div className="bg-[#444444] h-16 rounded flex items-center justify-center">
              <span className="text-xs">Parceiro 5</span>
            </div>
            <div className="bg-[#444444] h-16 rounded flex items-center justify-center">
              <span className="text-xs">Parceiro 6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <ProblemSlide key="problem" />,
    <SolutionSlide key="solution" />,
    <MarketSlide key="market" />,
    <BusinessModelSlide key="business" />,
    <TractionSlide key="traction" />,
    <CompetitionSlide key="competition" />,
    <TeamSlide key="team" />,
    <GoToMarketSlide key="go-to-market" />
  ];
  
  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  return (
    <AppLayout title="Pitch Deck ObraFácil">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">
          {slides[currentSlide]}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <Button 
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>
          
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#FF6200]' : 'bg-[#555555]'}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            Próximo
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default PitchDeck;
