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

  // Responsive height based on screen size
  const getChartHeight = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 280; // Mobile
      if (window.innerWidth < 1024) return 320; // Tablet
      return 400; // Desktop
    }
    return 320;
  };

  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 sm:h-80 bg-gray-50 rounded-lg ${className}`}>
        <div className="text-center px-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Graphique des projections</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Légende mobile-responsive */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pb-4 border-b border-gray-100">
          {scenarios.map(scenario => (
            <div key={scenario.key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                style={{ backgroundColor: scenario.color }}
              ></div>
              <span className="text-sm sm:text-base font-medium text-gray-700">
                {scenario.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Graphique mobile-optimized */}
      <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-4 overflow-hidden">
        <div className="w-full" style={{ minHeight: getChartHeight() }}>
          <ResponsiveContainer width="100%" height={getChartHeight()}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: window?.innerWidth < 640 ? 10 : 20,
                left: window?.innerWidth < 640 ? 5 : 10,
                bottom: 10,
              }}
            >
              <CartesianGrid 
                strokeDasharray="2 2" 
                stroke="#f3f4f6" 
                vertical={false}
              />
              
              <XAxis
                dataKey="month"
                tick={{ fontSize: window?.innerWidth < 640 ? 10 : 12, fill: '#6b7280' }}
                tickFormatter={formatXAxis}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
                interval={window?.innerWidth < 640 ? 2 : 'preserveStartEnd'}
              />
              
              <YAxis
                tick={{ fontSize: window?.innerWidth < 640 ? 10 : 12, fill: '#6b7280' }}
                tickFormatter={formatYAxis}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
                width={window?.innerWidth < 640 ? 50 : 70}
              />
              
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{
                  stroke: '#9ca3af',
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
              />
              
              {scenarios.map(scenario => (
                <Line
                  key={scenario.key}
                  type="monotone"
                  dataKey={scenario.key}
                  stroke={scenario.color}
                  strokeWidth={window?.innerWidth < 640 ? scenario.strokeWidth : scenario.strokeWidth + 1}
                  name={scenario.name}
                  dot={false}
                  activeDot={{
                    r: window?.innerWidth < 640 ? 6 : 5,
                    fill: scenario.color,
                    stroke: '#fff',
                    strokeWidth: 2,
                  }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Instructions tactiles pour mobile */}
      <div className="mt-3 sm:hidden">
        <p className="text-xs text-center text-gray-500 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3" />
          </svg>
          Touchez le graphique pour voir le détail
        </p>
      </div>
    </div>
  );
}