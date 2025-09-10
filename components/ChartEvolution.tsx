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
  // Custom tooltip pour afficher les montants formatés
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-foreground mb-2">
            Mois {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span>{' '}
              {formatCurrency(entry.value)}
            </p>
          ))}
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
      <div className={`flex items-center justify-center h-64 bg-surface rounded-lg ${className}`}>
        <p className="text-muted">Aucune donnée à afficher</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
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
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            opacity={0.5}
          />
          
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={formatXAxis}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={{ stroke: '#d1d5db' }}
          />
          
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={formatYAxis}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={{ stroke: '#d1d5db' }}
            width={80}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
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
  );
}