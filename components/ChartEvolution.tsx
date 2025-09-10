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

// Configuration des scénarios avec couleurs épurées
const scenarios = [
  {
    key: 'pessimiste' as const,
    name: 'Conservateur (5%)',
    color: '#ef4444', // red-500
    strokeWidth: 2,
  },
  {
    key: 'normal' as const,
    name: 'Équilibré (8%)',
    color: '#6b7280', // gray-500
    strokeWidth: 3,
  },
  {
    key: 'optimiste' as const,
    name: 'Dynamique (10%)',
    color: '#3b82f6', // blue-500
    strokeWidth: 2,
  },
];

export default function ChartEvolution({ data, className = '' }: ChartEvolutionProps) {
  // Tooltip épuré et simple
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Mois {label}
          </p>
          <div className="space-y-2">
            {payload
              .sort((a: any, b: any) => b.value - a.value)
              .map((entry: any, index: number) => {
                const initialValue = data[0] ? data[0][entry.dataKey as keyof typeof data[0]] : 0;
                const gain = entry.value - initialValue;
                const gainPercentage = initialValue > 0 ? ((gain / initialValue) * 100).toFixed(1) : '0.0';
                return (
                  <div key={index} className="flex justify-between items-center min-w-48">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {entry.name.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(entry.value)}
                      </p>
                      <p className="text-xs text-gray-500">+{gainPercentage}%</p>
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
      <div className={`flex items-center justify-center h-80 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Graphique en attente des données</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Légende simple */}
      <div className="flex items-center justify-center space-x-8 mb-6 pb-4 border-b border-gray-100">
        {scenarios.map(scenario => (
          <div key={scenario.key} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: scenario.color }}
            ></div>
            <span className="text-sm font-medium text-gray-700">
              {scenario.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Graphique épuré */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="2 2" 
              stroke="#f3f4f6" 
              vertical={false}
            />
            
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatXAxis}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatYAxis}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              width={70}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
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
                  r: 4,
                  fill: scenario.color,
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}