
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
  ClipboardCheck,
  Clock,
  FileCheck,
  FileText,
  ArrowDown
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

const OpeningSlide = () => (
  <Slide title="Abertura Impactante" icon={<FileText className="text-white" size={24} />}>
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
        Você ainda está <span className="text-[#FF6200]">perdendo tempo e dinheiro</span> com a gestão da sua obra?
      </h1>
      
      <h2 className="text-2xl text-center text-gray-300">
        Existe uma forma mais simples, eficiente e econômica de controlar tudo.
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
        <div className="bg-[#444444] p-4 rounded-lg relative">
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ANTES
          </div>
          <div className="w-full h-48 bg-[#3A3A3A] rounded flex items-center justify-center">
            <img src="/placeholder.svg" alt="Canteiro de obra desorganizado" className="object-cover w-full h-full opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg font-bold bg-black bg-opacity-50 p-2 rounded">Caos e Desorganização</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#444444] p-4 rounded-lg relative">
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            DEPOIS
          </div>
          <div className="w-full h-48 bg-[#3A3A3A] rounded flex items-center justify-center overflow-hidden">
            <img src="/placeholder.svg" alt="Dashboard ObraFácil" className="object-cover w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-lg font-bold bg-black bg-opacity-50 p-2 rounded">Controle Total</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="animate-bounce mt-4">
        <ArrowDown className="text-[#FF6200]" size={32} />
      </div>
    </div>
  </Slide>
);

const PainSlide = () => (
  <Slide title="A Dor" icon={<MessageSquare className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold text-[#FF6200] mb-2">Você já viveu isso?</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center text-center">
          <div className="text-4xl mb-4">🔧</div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Equipes que não se comunicam</h4>
          <p>Informações importantes se perdendo entre o escritório e o campo</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center text-center">
          <div className="text-4xl mb-4">🕒</div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Atrasos que viram prejuízo</h4>
          <p>Cronogramas estourados e multas contratuais inesperadas</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center text-center">
          <div className="text-4xl mb-4">📉</div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Materiais sumindo sem controle</h4>
          <p>Estoque impreciso e desperdício de materiais importantes</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center text-center">
          <div className="text-4xl mb-4">🔁</div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Retrabalho por falta de informação</h4>
          <p>Serviços refeitos por erro de comunicação ou especificações incorretas</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center text-center">
          <div className="text-4xl mb-4">😤</div>
          <h4 className="font-bold mb-2 text-[#FF6200]">Clientes insatisfeitos</h4>
          <p>Reclamações constantes por falta de transparência e atualizações</p>
        </div>
      </div>
      
      <div className="mt-8 bg-[#3A3A3A] p-8 rounded-lg text-center">
        <p className="text-xl italic">
          "A gente entende. E você não está sozinho. <span className="text-[#FF6200] font-bold">8 a cada 10 obras</span> sofrem com esses mesmos problemas todos os dias."
        </p>
      </div>
    </div>
  </Slide>
);

const CostSlide = () => (
  <Slide title="O Custo Invisível do Caos" icon={<BarChart className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2 text-center">O problema não é só operacional. É financeiro.</h3>
        <p className="text-lg mb-6 text-center text-gray-300">Quanto está custando a desorganização da sua obra?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">25%</div>
          <p className="text-center">do custo total da obra vem de retrabalho por falhas de comunicação</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">2 semanas</div>
          <p className="text-center">perdidas por obra apenas para resolver problemas de comunicação</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg flex flex-col items-center">
          <div className="text-4xl font-bold text-[#FF6200] mb-2">R$35 mil</div>
          <p className="text-center">desperdiçados em média por mês por falta de controle em cada obra</p>
        </div>
      </div>
      
      <div className="mt-8 bg-[#3A3A3A] p-6 rounded-lg">
        <h4 className="font-bold mb-4 text-[#FF6200] text-center">Impacto Anual em Uma Construtora Média:</h4>
        
        <div className="w-full bg-[#444444] h-16 rounded-lg relative overflow-hidden mb-4">
          <div className="absolute top-0 left-0 h-full bg-[#FF6200]" style={{ width: "37%" }}></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            37% de lucro perdido anualmente
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-lg mb-1">Aumento médio do prazo de entrega</p>
            <p className="text-2xl font-bold text-[#FF6200]">38%</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-lg mb-1">Taxa de retrabalho típica</p>
            <p className="text-2xl font-bold text-[#FF6200]">22%</p>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const WhatIfSlide = () => (
  <Slide title="A Virada: Como Seria Se..." icon={<Rocket className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold text-[#FF6200] mb-2">E se tudo isso mudasse a partir de agora?</h3>
        <p className="text-lg text-gray-300">Imagine um novo cenário para suas obras</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#444444] p-6 rounded-lg">
          <div className="flex gap-4 mb-6 items-center">
            <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-xl">Equipes integradas em tempo real</h4>
              <p className="text-gray-300">Todos com acesso às mesmas informações, atualizadas instantaneamente</p>
            </div>
          </div>
          
          <div className="flex gap-4 mb-6 items-center">
            <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-xl">Visão total da obra no celular</h4>
              <p className="text-gray-300">Acompanhe tudo a distância, como se estivesse presente na obra</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-xl">Zero papelada, 100% automatizado</h4>
              <p className="text-gray-300">Adeus às planilhas e papéis que se perdem facilmente</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg">
          <div className="flex gap-4 mb-6 items-center">
            <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-xl">Controle de materiais, gastos e atrasos</h4>
              <p className="text-gray-300">Monitore todos os aspectos críticos de cada projeto</p>
            </div>
          </div>
          
          <div className="flex gap-4 mb-6 items-center">
            <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-xl">Cliente satisfeito, equipe eficiente</h4>
              <p className="text-gray-300">Aumento da produtividade e satisfação de todos os envolvidos</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-xl">Decisões baseadas em dados reais</h4>
              <p className="text-gray-300">Relatórios e insights que ajudam a prevenir problemas</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-[#3A3A3A] p-6 rounded-lg text-center">
        <p className="text-xl font-bold mb-2">Resultado:</p>
        <div className="flex flex-col md:flex-row justify-around items-center gap-4">
          <div>
            <p className="text-[#FF6200] text-2xl font-bold">+24%</p>
            <p>de produtividade</p>
          </div>
          <div>
            <p className="text-[#FF6200] text-2xl font-bold">-32%</p>
            <p>nos custos operacionais</p>
          </div>
          <div>
            <p className="text-[#FF6200] text-2xl font-bold">+40%</p>
            <p>na satisfação dos clientes</p>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const SolutionSlide = () => (
  <Slide title="A Solução: ObraFácil" icon={<ClipboardCheck className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold text-[#FF6200] mb-4">Conheça o ObraFácil</h3>
        <h4 className="text-xl text-white">Sua obra no controle, do começo ao fim.</h4>
      </div>
      
      <div className="bg-[#444444] p-6 rounded-lg text-center mb-6">
        <p className="text-lg">
          "Uma plataforma que centraliza toda a gestão da obra, com comunicação por WhatsApp e monitoramento em tempo real."
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#3A3A3A] p-6 rounded-lg h-80 flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <img src="/placeholder.svg" alt="Dashboard ObraFácil" className="w-full rounded-lg shadow-lg" />
            <div className="absolute -top-4 -right-4 bg-[#FF6200] text-white px-3 py-1 rounded-full text-sm font-bold">
              Dashboard Web
            </div>
          </div>
        </div>
        
        <div className="bg-[#3A3A3A] p-6 rounded-lg h-80 flex items-center justify-center">
          <div className="relative w-48">
            <div className="border-8 border-black rounded-3xl overflow-hidden">
              <img src="/placeholder.svg" alt="WhatsApp integrado" className="w-full" />
            </div>
            <div className="absolute -top-4 -right-4 bg-[#FF6200] text-white px-3 py-1 rounded-full text-sm font-bold">
              WhatsApp Integrado
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-[#444444] p-4 rounded-lg text-center">
          <h4 className="font-bold mb-2 text-[#FF6200]">Simples</h4>
          <p className="text-sm">Implementação em apenas 24 horas, sem necessidade de treinamento extensivo</p>
        </div>
        <div className="bg-[#444444] p-4 rounded-lg text-center">
          <h4 className="font-bold mb-2 text-[#FF6200]">Completo</h4>
          <p className="text-sm">Todos os recursos que você precisa para gerenciar sua obra de ponta a ponta</p>
        </div>
        <div className="bg-[#444444] p-4 rounded-lg text-center">
          <h4 className="font-bold mb-2 text-[#FF6200]">Acessível</h4>
          <p className="text-sm">Planos adequados para construtoras de todos os tamanhos</p>
        </div>
      </div>
    </div>
  </Slide>
);

const HowItWorksSlide = () => (
  <Slide title="Funciona Assim" icon={<Clock className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Veja como é fácil usar o ObraFácil</h3>
        <p className="text-gray-300">Um fluxo simples que qualquer equipe pode adotar rapidamente</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-[#FF6200] -translate-x-1/2 hidden md:block"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative">
          <div className="md:text-right">
            <div className="bg-[#444444] p-6 rounded-lg relative">
              <div className="absolute -right-5 top-1/2 w-9 h-9 bg-[#FF6200] rounded-full -translate-y-1/2 flex items-center justify-center font-bold text-white hidden md:flex">1</div>
              <div className="md:hidden w-9 h-9 bg-[#FF6200] rounded-full flex items-center justify-center font-bold text-white mb-2">1</div>
              <h4 className="font-bold mb-2 text-[#FF6200]">Sua equipe envia mensagens pelo WhatsApp</h4>
              <p>Fotos, atualizações, problemas e relatórios diários usando o app que todos já têm no celular</p>
            </div>
          </div>
          
          <div className="md:mt-32">
            <div className="bg-[#444444] p-6 rounded-lg relative">
              <div className="absolute -left-5 top-1/2 w-9 h-9 bg-[#FF6200] rounded-full -translate-y-1/2 flex items-center justify-center font-bold text-white hidden md:flex">2</div>
              <div className="md:hidden w-9 h-9 bg-[#FF6200] rounded-full flex items-center justify-center font-bold text-white mb-2">2</div>
              <h4 className="font-bold mb-2 text-[#FF6200]">A plataforma organiza tudo automaticamente</h4>
              <p>Nossa IA categoriza mensagens, detecta problemas e atualiza cronogramas sem precisar de intervenção manual</p>
            </div>
          </div>
          
          <div className="md:text-right md:mt-32">
            <div className="bg-[#444444] p-6 rounded-lg relative">
              <div className="absolute -right-5 top-1/2 w-9 h-9 bg-[#FF6200] rounded-full -translate-y-1/2 flex items-center justify-center font-bold text-white hidden md:flex">3</div>
              <div className="md:hidden w-9 h-9 bg-[#FF6200] rounded-full flex items-center justify-center font-bold text-white mb-2">3</div>
              <h4 className="font-bold mb-2 text-[#FF6200]">Você acompanha cada detalhe pelo dashboard</h4>
              <p>Tenha uma visão completa de todas as suas obras em tempo real, com gráficos e métricas importantes</p>
            </div>
          </div>
          
          <div className="md:mt-32">
            <div className="bg-[#444444] p-6 rounded-lg relative">
              <div className="absolute -left-5 top-1/2 w-9 h-9 bg-[#FF6200] rounded-full -translate-y-1/2 flex items-center justify-center font-bold text-white hidden md:flex">4</div>
              <div className="md:hidden w-9 h-9 bg-[#FF6200] rounded-full flex items-center justify-center font-bold text-white mb-2">4</div>
              <h4 className="font-bold mb-2 text-[#FF6200]">Receba alertas instantâneos de atrasos ou problemas</h4>
              <p>Seja notificado quando algo sai do planejado, permitindo ações preventivas rápidas</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-[#3A3A3A] p-6 rounded-lg text-center">
        <h4 className="font-bold mb-4 text-[#FF6200] text-xl">Tudo isso sem precisar:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-lg">❌ Instalar novos aplicativos</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-lg">❌ Treinamentos complexos</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-lg">❌ Mudar seus processos atuais</p>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const ResultsSlide = () => (
  <Slide title="Resultados Reais" icon={<FileCheck className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Construtoras que usam ObraFácil já estão vendo a diferença</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#444444] p-6 rounded-lg text-center">
          <div className="text-5xl font-bold text-[#FF6200] mb-2">⏱</div>
          <h4 className="text-2xl font-bold mb-2">Redução de 30%</h4>
          <p>no tempo total de obra</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg text-center">
          <div className="text-5xl font-bold text-[#FF6200] mb-2">💰</div>
          <h4 className="text-2xl font-bold mb-2">Economia de R$18k</h4>
          <p>em média por projeto</p>
        </div>
        <div className="bg-[#444444] p-6 rounded-lg text-center">
          <div className="text-5xl font-bold text-[#FF6200] mb-2">😍</div>
          <h4 className="text-2xl font-bold mb-2">92% de satisfação</h4>
          <p>entre clientes e engenheiros</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <div className="flex flex-col h-full justify-between">
            <div className="text-lg italic mb-4">
              "Hoje eu consigo dormir tranquilo sabendo que minha obra está no meu celular. O ObraFácil reduziu nossos atrasos em 70% e melhorou a comunicação com clientes."
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#444444] rounded-full flex items-center justify-center overflow-hidden">
                <img src="/placeholder.svg" alt="Foto do João" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold">João Silva</p>
                <p className="text-sm text-gray-400">Engenheiro Civil, Construções Exemplo</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#3A3A3A] p-6 rounded-lg">
          <div className="flex flex-col h-full justify-between">
            <div className="text-lg italic mb-4">
              "A integração com WhatsApp foi um divisor de águas. Nossa equipe de campo não precisou mudar nada na rotina, mas agora temos controle total sobre tudo."
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#444444] rounded-full flex items-center justify-center overflow-hidden">
                <img src="/placeholder.svg" alt="Foto da Maria" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold">Maria Oliveira</p>
                <p className="text-sm text-gray-400">Diretora de Operações, Construtora Inovação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-[#444444] p-6 rounded-lg">
        <h4 className="font-bold mb-4 text-[#FF6200] text-xl text-center">Impacto Médio por Tamanho de Empresa</h4>
        <div className="w-full bg-[#3A3A3A] h-12 rounded-lg relative overflow-hidden mb-4">
          <div className="absolute top-0 left-0 h-full bg-[#FF6200]" style={{ width: "65%" }}></div>
          <div className="absolute inset-0 flex items-center px-4 justify-between text-white">
            <span className="font-bold">Pequenas Construtoras</span>
            <span className="font-bold">65% de aumento na eficiência</span>
          </div>
        </div>
        
        <div className="w-full bg-[#3A3A3A] h-12 rounded-lg relative overflow-hidden mb-4">
          <div className="absolute top-0 left-0 h-full bg-[#FF6200]" style={{ width: "48%" }}></div>
          <div className="absolute inset-0 flex items-center px-4 justify-between text-white">
            <span className="font-bold">Médias Construtoras</span>
            <span className="font-bold">48% de aumento na eficiência</span>
          </div>
        </div>
        
        <div className="w-full bg-[#3A3A3A] h-12 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#FF6200]" style={{ width: "35%" }}></div>
          <div className="absolute inset-0 flex items-center px-4 justify-between text-white">
            <span className="font-bold">Grandes Construtoras</span>
            <span className="font-bold">35% de aumento na eficiência</span>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const UrgencySlide = () => (
  <Slide title="Por Que Agora?" icon={<Clock className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-3xl font-bold text-[#FF6200] mb-2">O tempo da obra não espera. E sua concorrência também não.</h3>
      </div>
      
      <div className="bg-[#444444] p-8 rounded-lg text-center">
        <p className="text-xl mb-6">
          "Enquanto você ainda gerencia sua obra com papel, outros já estão otimizando tudo com inteligência. Não fique para trás."
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#3A3A3A] p-4 rounded-lg">
            <div className="text-4xl text-[#FF6200] mb-2">82%</div>
            <p className="text-sm">das construtoras que não digitalizaram perderam projetos para concorrentes em 2023</p>
          </div>
          <div className="bg-[#3A3A3A] p-4 rounded-lg">
            <div className="text-4xl text-[#FF6200] mb-2">3.5x</div>
            <p className="text-sm">mais rápido o crescimento de construtoras que adotaram tecnologia nos últimos 2 anos</p>
          </div>
          <div className="bg-[#3A3A3A] p-4 rounded-lg">
            <div className="text-4xl text-[#FF6200] mb-2">68%</div>
            <p className="text-sm">dos clientes escolhem construtoras com sistemas de acompanhamento online</p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#3A3A3A] p-6 rounded-lg border-2 border-[#FF6200] text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            ⚠️
          </div>
        </div>
        <h4 className="text-xl font-bold mb-4">ATENÇÃO: VAGAS LIMITADAS</h4>
        <p className="text-lg mb-4">
          Estamos abrindo apenas <span className="text-[#FF6200] font-bold">10 vagas</span> para novos clientes no plano de implementação assistida.
        </p>
        <div className="flex justify-center">
          <div className="bg-[#444444] px-6 py-3 rounded-lg">
            <div className="text-sm text-gray-300 mb-1">Vagas restantes:</div>
            <div className="text-4xl font-bold text-[#FF6200]">3</div>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const PlansSlide = () => (
  <Slide title="Escolha Seu Plano" icon={<Users className="text-white" size={24} />}>
    <div className="flex flex-col gap-8">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#FF6200] mb-2">Temos um plano ideal para o tamanho da sua obra</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#444444] p-6 rounded-lg border border-gray-600 flex flex-col">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold mb-1">Starter</h4>
            <div className="text-[#FF6200] text-3xl font-bold mb-2">R$297<span className="text-sm text-gray-300">/mês</span></div>
            <p className="text-sm text-gray-300">Para até 3 obras simultâneas</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Dashboard completo
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Integração WhatsApp básica
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Relatórios semanais
            </li>
            <li className="flex items-center opacity-50">
              <div className="w-5 h-5 mr-2 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">✗</div>
              Análise de riscos
            </li>
            <li className="flex items-center opacity-50">
              <div className="w-5 h-5 mr-2 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">✗</div>
              Suporte prioritário
            </li>
          </ul>
          
          <Button variant="outline" className="w-full border-[#FF6200] text-[#FF6200] hover:bg-[#FF6200] hover:text-white">
            Começar Agora
          </Button>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg border-2 border-[#FF6200] flex flex-col relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF6200] text-white px-3 py-1 rounded-full text-sm font-bold">
            Mais Popular
          </div>
          
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold mb-1">Profissional</h4>
            <div className="text-[#FF6200] text-3xl font-bold mb-2">R$597<span className="text-sm text-gray-300">/mês</span></div>
            <p className="text-sm text-gray-300">Monitoramento completo</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Dashboard completo
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Integração WhatsApp avançada
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Relatórios diários
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Análise de riscos em tempo real
            </li>
            <li className="flex items-center opacity-50">
              <div className="w-5 h-5 mr-2 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">✗</div>
              Suporte prioritário
            </li>
          </ul>
          
          <Button className="w-full bg-[#FF6200] hover:bg-[#FF7D33]">
            Escolher Plano
          </Button>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg border border-gray-600 flex flex-col">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold mb-1">Enterprise</h4>
            <div className="text-[#FF6200] text-3xl font-bold mb-2">Personalizado</div>
            <p className="text-sm text-gray-300">Para construtoras maiores</p>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Dashboard personalizado
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Integração WhatsApp premium
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Relatórios personalizados
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Análise de riscos avançada
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 mr-2 bg-[#FF6200] rounded-full flex items-center justify-center text-white text-xs">✓</div>
              Suporte prioritário 24/7
            </li>
          </ul>
          
          <Button variant="outline" className="w-full border-[#FF6200] text-[#FF6200] hover:bg-[#FF6200] hover:text-white">
            Falar com Consultor
          </Button>
        </div>
      </div>
      
      <div className="mt-4 bg-[#3A3A3A] p-6 rounded-lg text-center">
        <h4 className="font-bold mb-4 text-[#FF6200]">Sem fidelidade. Sem burocracia. Comece em menos de 24h.</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-sm">✅ Suporte técnico gratuito</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-sm">✅ Cancele quando quiser</p>
          </div>
          <div className="bg-[#444444] p-4 rounded-lg">
            <p className="text-sm">✅ 14 dias de garantia</p>
          </div>
        </div>
      </div>
    </div>
  </Slide>
);

const CtaSlide = () => (
  <Slide title="Chamada para Ação" icon={<MessageSquare className="text-white" size={24} />}>
    <div className="flex flex-col items-center justify-center h-full text-center gap-8">
      <h2 className="text-4xl font-bold">
        Quer transformar a <span className="text-[#FF6200]">gestão da sua obra</span>?
      </h2>
      
      <p className="text-xl max-w-2xl">
        Solicite uma demonstração gratuita agora mesmo e veja o ObraFácil funcionando com sua equipe.
      </p>
      
      <Button className="bg-[#FF6200] hover:bg-[#FF7D33] text-white text-lg px-8 py-6 rounded-lg">
        Agendar Demonstração
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-xl mt-4">
        <div className="bg-[#444444] p-6 rounded-lg text-center flex flex-col items-center">
          <div className="text-[#FF6200] mb-2">
            <MessageSquare size={32} />
          </div>
          <h3 className="font-bold mb-1">WhatsApp Comercial</h3>
          <p className="text-xl font-bold">(11) 99999-8888</p>
        </div>
        
        <div className="bg-[#444444] p-6 rounded-lg text-center flex flex-col items-center">
          <div className="text-[#FF6200] mb-2">
            <MessageSquare size={32} />
          </div>
          <h3 className="font-bold mb-1">Email</h3>
          <p className="text-xl font-bold">comercial@obrafacil.com</p>
        </div>
      </div>
      
      <div className="mt-6 bg-[#3A3A3A] p-6 rounded-lg max-w-2xl">
        <h4 className="font-bold mb-4 text-center">Nossa Garantia</h4>
        <p className="text-center">
          Se em 14 dias você não perceber melhorias na gestão da sua obra, devolvemos 100% do seu investimento, sem questionamentos.
        </p>
      </div>
    </div>
  </Slide>
);

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <OpeningSlide key="opening" />,
    <PainSlide key="pain" />,
    <CostSlide key="cost" />,
    <WhatIfSlide key="what-if" />,
    <SolutionSlide key="solution" />,
    <HowItWorksSlide key="how-it-works" />,
    <ResultsSlide key="results" />,
    <UrgencySlide key="urgency" />,
    <PlansSlide key="plans" />,
    <CtaSlide key="cta" />
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
    <AppLayout title="ObraFácil - Apresentação">
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
