'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { CompoundData } from '@/types';
import { formatCurrency } from '@/lib/format';

interface ChartEvolutionProps {
  data: CompoundData[];
  className?: string;
}

// Configuration des scénarios avec couleurs de la palette IMpakt28
const scenarios = [
  {
    key: 'pessimiste' as const,
    name: 'Pessimiste (5%)',
    color: '#DE1414', // Rouge
    strokeWidth: 2,
  },
  {
    key: 'normal' as const,
    name: 'Normal (8%)',
    color: '#FE5B24', // Orange (primary)
    strokeWidth: 3,
  },
  {
    key: 'optimiste' as const,
    name: 'Optimiste (10%)',
    color: '#7000F4', // Violet (secondary)
    strokeWidth: 2,
  },
];

export default function ChartEvolution({ data, className = '' }: ChartEvolutionProps) {
  // Tooltip moderne IMpakt28
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100 min-w-64">
          <div className="flex items-center mb-3">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm font-bold text-foreground">
              Mois {label} ({Math.round(label / 12 * 10) / 10} an{label > 12 ? 's' : ''})
            </p>
          </div>
          <div className="space-y-2">
            {payload
              .sort((a: any, b: any) => b.value - a.value)
              .map((entry: any, index: number) => {
                const initialValue = data[0] ? data[0][entry.dataKey as keyof typeof data[0]] : 0;
                const gain = entry.value - initialValue;
                const gainPercentage = initialValue > 0 ? ((gain / initialValue) * 100).toFixed(1) : '0.0';
                return (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-xs font-medium text-muted">
                        {entry.name.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: entry.color }}>
                        {formatCurrency(entry.value)}
                      </p>
                      <p className="text-xs text-muted">+{gainPercentage}%</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom formatter pour les axes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M€`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k€`;
    }
    return `${value}€`;
  };

  const formatXAxis = (value: number) => {
    if (value === 0) return '0';
    if (value % 12 === 0) return `${value / 12}an${value > 12 ? 's' : ''}`;
    return value.toString();
  };

  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-96 bg-gradient-to-br from-surface to-background rounded-xl ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
            <span className="text-white text-2xl">📊</span>
          </div>
          <p className="text-muted font-medium">En attente des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header avec légende interactive */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {scenarios.map(scenario => (
            <div key={scenario.key} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: scenario.color }}
              ></div>
              <span className="text-sm font-medium text-foreground">
                {scenario.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Graphique avec design moderne */}
      <div className="relative bg-gradient-to-br from-white to-surface/50 rounded-xl p-4 shadow-sm border border-gray-100">
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={data}
            margin={{
              top: 30,
              right: 40,
              left: 30,
              bottom: 30,
            }}
          >
            {/* Grille avec style moderne */}
            <CartesianGrid 
              strokeDasharray="2 4" 
              stroke="#f3f4f6" 
              opacity={0.8}
              vertical={false}
            />
            
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
              tickFormatter={formatXAxis}
              axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickMargin={10}
            />
            
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
              tickFormatter={formatYAxis}
              axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              tickLine={{ stroke: '#e5e7eb' }}
              width={70}
              tickMargin={10}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{
                stroke: '#FE5B24',
                strokeWidth: 1,
                strokeDasharray: '4 4',
                strokeOpacity: 0.5
              }}
            />
            
            {scenarios.map(scenario => (
              <Line
                key={scenario.key}
                type="monotone"
                dataKey={scenario.key}
                stroke={scenario.color}
                strokeWidth={scenario.strokeWidth}
                name={scenario.name}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: scenario.color,
                  stroke: '#fff',
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Gradient overlay pour l'effet moderne */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent rounded-b-xl pointer-events-none"></div>
      </div>
    </div>
  );
}