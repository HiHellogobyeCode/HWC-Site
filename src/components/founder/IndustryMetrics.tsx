
import React from 'react';
import { useData } from '@/context/DataContext';
import { cn } from '@/lib/utils';
import DotMatrixAccent from '../ui/DotMatrixAccent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Cell from './Cell';

const IndustryMetrics: React.FC = () => {
  const { founderData } = useData();
  
  // Data for the efficiency chart
  const chartData = [
    { name: 'Manufacturing', value: 17.5, color: '#05B4FF' }, // cyan
    { name: 'Healthcare', value: 90, color: '#FF1CF7' },     // magenta
    { name: 'Finance', value: 20, color: '#FFE814' },        // yellow
    { name: 'Transport', value: 15, color: '#05B4FF' },      // cyan
    { name: 'Retail', value: 11, color: '#FF1CF7' },         // magenta
    { name: 'Agriculture', value: 15, color: '#FFE814' }     // yellow
  ];

  return (
    <section className="glass-card p-6 transition-all duration-700 delay-200 bg-black/60 border border-gray-900 space-y-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="text-dot-cyan mr-2">Industry Efficiency Metrics</span>
        <div className="h-px bg-gray-900 flex-grow ml-2"></div>
      </h3>
      
      {/* Chart */}
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#666', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: '#666' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#111', 
                border: '1px solid #333',
                borderRadius: '4px'
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="value" name="Efficiency %" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="absolute -bottom-2 -right-2">
          <DotMatrixAccent color="yellow" size="sm" />
        </div>
      </div>
      
      {/* Industry metrics table */}
      <div className="space-y-6 mt-8">
        {founderData?.industryMetrics && founderData.industryMetrics.length > 0 ? (
          founderData.industryMetrics.map((industry, index) => (
            <div key={index} className="border border-gray-800 rounded-md overflow-hidden">
              <div className={cn(
                "px-4 py-2 font-medium",
                index % 3 === 0 ? "bg-dot-cyan/10" : 
                index % 3 === 1 ? "bg-dot-magenta/10" : 
                "bg-dot-yellow/10"
              )}>
                <span className={cn(
                  "text-md",
                  index % 3 === 0 ? "text-dot-cyan" : 
                  index % 3 === 1 ? "text-dot-magenta" : 
                  "text-dot-yellow"
                )}>
                  {industry.industry}
                </span>
              </div>
              <div className="p-4 space-y-3">
                {industry.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-4 md:col-span-3 text-gray-400">{metric}:</div>
                    <div className="col-span-8 md:col-span-9 text-gray-300">{industry.numbers[mIndex]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center py-4">No industry metrics available</div>
        )}
      </div>
    </section>
  );
};

export default IndustryMetrics;
