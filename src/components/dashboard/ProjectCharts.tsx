
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProgressChartProps {
  plannedDays: number;
  actualDays: number;
}

interface HoursChartProps {
  plannedHours: string;
  workedHours: string;
}

export function ProgressTimeChart({ plannedDays, actualDays }: ProgressChartProps) {
  const data = [
    {
      name: '25%',
      planejado: plannedDays * 0.25,
      real: actualDays * 0.25,
    },
    {
      name: '50%',
      planejado: plannedDays * 0.5,
      real: actualDays * 0.5,
    },
    {
      name: '75%',
      planejado: plannedDays * 0.75,
      real: actualDays * 0.75,
    },
    {
      name: '100%',
      planejado: plannedDays,
      real: actualDays,
    },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
          <XAxis dataKey="name" stroke="#BBBBBB" />
          <YAxis stroke="#BBBBBB" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333333', borderColor: '#444444', color: '#FFFFFF' }}
            labelStyle={{ color: '#FFFFFF' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="planejado" 
            stackId="1" 
            stroke="#BBBBBB" 
            fill="#BBBBBB" 
            name="Prazo Planejado (dias)"
          />
          <Area 
            type="monotone" 
            dataKey="real" 
            stackId="2" 
            stroke="#FF6200" 
            fill="#FF6200" 
            name="Prazo Real (dias)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HoursWorkedChart({ plannedHours, workedHours }: HoursChartProps) {
  // Extract numbers from strings like "680h de 1000h planejadas"
  const extractHours = (str: string): number => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  
  const worked = extractHours(workedHours);
  const planned = parseInt(plannedHours, 10);
  const remaining = planned - worked;
  
  const data = [
    {
      name: 'Horas',
      trabalhadas: worked,
      restantes: remaining > 0 ? remaining : 0,
    },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
          <XAxis type="number" stroke="#BBBBBB" />
          <YAxis dataKey="name" type="category" stroke="#BBBBBB" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333333', borderColor: '#444444', color: '#FFFFFF' }}
            labelStyle={{ color: '#FFFFFF' }}
          />
          <Legend />
          <Bar 
            dataKey="trabalhadas" 
            stackId="a" 
            fill="#FF6200" 
            name="Horas Trabalhadas" 
          />
          <Bar 
            dataKey="restantes" 
            stackId="a" 
            fill="#BBBBBB" 
            name="Horas Restantes" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
