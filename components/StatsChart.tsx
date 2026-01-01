import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Opportunity } from '../types';

interface Props {
  opportunities: Opportunity[];
}

// Pastel Palette: Baby Blue, Light Pink, Lavender, Mint, Soft Yellow, Peach
const COLORS = ['#38bdf8', '#f472b6', '#a78bfa', '#34d399', '#fde047', '#fb923c', '#94a3b8'];

const StatsChart: React.FC<Props> = ({ opportunities }) => {
  // Aggregate data by category
  const dataMap = opportunities.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(dataMap).map(key => ({
    name: key,
    value: dataMap[key]
  })).filter(d => d.value > 0);

  if (opportunities.length === 0) return null;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-baby-100 mb-8 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-baby-900 mb-2">Market Insights</h3>
        <p className="text-slate-500 mb-4">
          Visual breakdown of the current opportunity landscape based on your search.
        </p>
        <div className="flex flex-wrap gap-2">
          {data.slice(0, 3).map((d, i) => (
             <div key={i} className="px-3 py-1 bg-baby-50 rounded-lg text-xs font-semibold text-baby-600 border border-baby-200">
               {d.name}: {d.value}
             </div>
          ))}
        </div>
      </div>
      <div className="h-64 w-full md:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e0f2fe', background: '#ffffff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
                itemStyle={{ color: '#0c4a6e', fontWeight: 600, fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsChart;