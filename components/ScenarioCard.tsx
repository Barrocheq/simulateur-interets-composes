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
  const finalResult = results[results.length - 1];
  const totalGain = finalResult ? finalResult.finalAmount - principal : 0;
  const totalGainPercentage = principal > 0 ? (totalGain / principal) * 100 : 0;
  
  return (
    <div className={`card group hover:scale-105 transition-all duration-300 ${className}`}>
      {/* Header moderne avec icône */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
            >
              <span className="text-white font-bold text-lg">
                {name.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
          </div>
          
          <div 
            className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            {formatPercentage(rate)}
          </div>
        </div>
        
        {/* Gain total highlight */}
        <div className="bg-gradient-to-r from-surface to-transparent p-3 rounded-lg border-l-4" style={{ borderColor: color }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wide">Gain total sur 3 ans</p>
              <p className="text-2xl font-bold text-foreground">+{formatCurrency(totalGain)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">Performance</p>
              <p className="text-lg font-bold" style={{ color }}>
                +{totalGainPercentage.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Détail par horizon avec timeline */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">
          Évolution par étape
        </h4>
        
        {results.map(({ months, years, finalAmount }, index) => {
          const gain = finalAmount - principal;
          const gainPercentage = principal > 0 ? (gain / principal) * 100 : 0;
          const isLast = index === results.length - 1;
          
          return (
            <div key={months} className="relative">
              {/* Timeline */}
              <div className="flex items-center">
                <div className="flex flex-col items-center mr-4">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      isLast ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{ 
                      backgroundColor: color,
                      ...(isLast ? { '--tw-ring-color': color } as React.CSSProperties : {})
                    }}
                  ></div>
                  {!isLast && (
                    <div 
                      className="w-0.5 h-6 mt-2"
                      style={{ backgroundColor: `${color}30` }}
                    ></div>
                  )}
                </div>
                
                {/* Contenu */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {years} an{years > 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-muted">
                        +{formatCurrency(gain)} ({gainPercentage.toFixed(1)}%)
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <p className={`font-bold ${
                        isLast ? 'text-lg' : 'text-base'
                      }`} style={{ color: isLast ? color : undefined }}>
                        {formatCurrency(finalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Call-to-action subtil */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-muted">
            Simulation avec capitalisation annuelle
          </p>
        </div>
      </div>
    </div>
  );
}