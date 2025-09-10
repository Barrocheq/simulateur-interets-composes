'use client';

import { formatCurrency, formatPercentage } from '@/lib/format';

interface ScenarioResult {
  months: number;
  years: number;
  finalAmount: number;
}

interface ScenarioCardProps {
  name: string;
  rate: number;
  color: string;
  results: ScenarioResult[];
  principal: number;
  className?: string;
}

export default function ScenarioCard({
  name,
  rate,
  color,
  results,
  principal,
  className = '',
}: ScenarioCardProps) {
  return (
    <div className={`card ${className}`}>
      {/* Header avec nom et taux */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <div 
          className="px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {formatPercentage(rate)}
        </div>
      </div>
      
      {/* Résultats par horizon */}
      <div className="space-y-3">
        {results.map(({ months, years, finalAmount }) => {
          const gain = finalAmount - principal;
          const gainPercentage = principal > 0 ? (gain / principal) * 100 : 0;
          
          return (
            <div 
              key={months}
              className="flex justify-between items-center p-3 bg-surface rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {months} mois ({years} an{years > 1 ? 's' : ''})
                </p>
                <p className="text-xs text-muted">
                  +{formatCurrency(gain)} ({gainPercentage.toFixed(1)}%)
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(finalAmount)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Gain total sur 36 mois en highlight */}
      {results.length > 0 && (
        <div 
          className="mt-4 p-3 rounded-lg text-white"
          style={{ backgroundColor: color }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Gain total (3 ans)</span>
            <span className="text-lg font-bold">
              +{formatCurrency(results[results.length - 1].finalAmount - principal)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}