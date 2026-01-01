import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  isLoading: boolean;
  itemCount: number;
}

const DataIngestionStatus: React.FC<Props> = ({ isLoading, itemCount }) => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isLoading) {
      setLogs(['Initializing search agents...', 'Querying global opportunity databases...', 'Validating deadlines...', 'Categorizing via Gemini AI...']);
    } else if (itemCount > 0) {
      setLogs(prev => [...prev, `Successfully ingested ${itemCount} active opportunities.`]);
    }
  }, [isLoading, itemCount]);

  if (!isLoading && logs.length === 0) return null;

  return (
    <div className="bg-slate-900 text-baby-100 rounded-lg p-4 font-mono text-xs mb-6 shadow-md border border-slate-800">
      <div className="flex items-center gap-2 mb-2 text-baby-300 border-b border-slate-700 pb-2">
        <Terminal className="w-4 h-4" />
        <span>System Logs (Backend Simulation)</span>
      </div>
      <div className="space-y-1 h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center gap-2 animate-pulse">
            <span className="text-love-400">➜</span>
            <span>{log}</span>
            {i === logs.length - 1 && isLoading && <Loader2 className="w-3 h-3 animate-spin ml-2" />}
            {i < logs.length - 1 && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-auto" />}
          </div>
        ))}
        {!isLoading && itemCount > 0 && (
           <div className="flex items-center gap-2 text-emerald-400">
            <span>➜ Ready.</span>
           </div>
        )}
      </div>
    </div>
  );
};

export default DataIngestionStatus;