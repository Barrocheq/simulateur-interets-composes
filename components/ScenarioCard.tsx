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
  
  // Couleurs simplifiées et professionnelles
  const getColor = (scenarioName: string) => {
    if (scenarioName.toLowerCase().includes('pessimiste')) return 'rgb(239, 68, 68)'; // red-500
    if (scenarioName.toLowerCase().includes('normal')) return 'rgb(107, 114, 128)'; // gray-500
    return 'rgb(59, 130, 246)'; // blue-500
  };
  
  const scenarioColor = getColor(name);
  
  return (
    <div className={`card ${className}`}>
      {/* Header épuré */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">Taux annuel</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: scenarioColor }}>
            {formatPercentage(rate)}
          </div>
        </div>
      </div>
      
      {/* Résultat final mis en avant */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Capital final (3 ans)</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {formatCurrency(finalResult?.finalAmount || 0)}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="text-gray-600">
              Gain : <span className="font-medium" style={{ color: scenarioColor }}>
                +{formatCurrency(totalGain)}
              </span>
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              +{totalGainPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Détail par horizon simplifie */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Évolution par année
        </h4>
        
        {results.map(({ months, years, finalAmount }) => {
          const gain = finalAmount - principal;
          const gainPercentage = principal > 0 ? (gain / principal) * 100 : 0;
          
          return (
            <div key={months} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Année {years}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {formatCurrency(finalAmount)}
                </div>
                <div className="text-xs text-gray-500">
                  +{gainPercentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-center text-gray-500">
          Capitalisation annuelle
        </p>
      </div>
    </div>
  );
}