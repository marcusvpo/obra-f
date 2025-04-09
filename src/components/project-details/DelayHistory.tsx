
interface DelayHistoryProps {
  delays: string[];
}

export default function DelayHistory({ delays }: DelayHistoryProps) {
  return (
    <div className="bg-card p-5 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Histórico de Atrasos</h2>
      {delays.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum atraso registrado</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#444444] text-left">
                <th className="pb-2">Data</th>
                <th className="pb-2">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {delays.map((atraso, index) => {
                const [data, ...restoParts] = atraso.split(': ');
                const resto = restoParts.join(': ');
                
                return (
                  <tr key={index} className="border-b border-[#333333]">
                    <td className="py-3">{data}</td>
                    <td className="py-3">{resto}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
