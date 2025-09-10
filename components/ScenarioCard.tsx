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
    <div className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {/* Header mobile-optimized */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenarioColor }}></div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{name}</h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Taux annuel</p>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold" style={{ color: scenarioColor }}>
            {formatPercentage(rate)}
          </div>
        </div>
      </div>
      
      {/* Résultat final - Mobile optimized */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4 sm:mb-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Capital final (3 ans)</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {formatCurrency(finalResult?.finalAmount || 0)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
            <span className="text-gray-600 text-center">
              Gain : <span className="font-semibold" style={{ color: scenarioColor }}>
                +{formatCurrency(totalGain)}
              </span>
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-600 font-semibold">
              +{totalGainPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Détail par horizon - Mobile simplified */}
      <div className="space-y-2 sm:space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
          📅 Évolution année par année
        </h4>
        
        {results.map(({ months, years, finalAmount }) => {
          const gain = finalAmount - principal;
          const gainPercentage = principal > 0 ? (gain / principal) * 100 : 0;
          
          return (
            <div key={months} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scenarioColor }}></div>
                <span className="text-sm font-medium text-gray-900">
                  Année {years}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base font-bold text-gray-900">
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
      
      {/* Footer discret */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-gray-500 font-medium">
            Capitalisation annuelle
          </p>
        </div>
      </div>
    </div>
  );
}