'use client';

import { formatCurrency, formatPercentage } from '@/lib/format';

interface ScenarioResult {
  months: number;
  finalAmount: number;
  monthlyReturn: number;
  annualEquivalent: number;
  isLiquid: boolean;
}

interface ScenarioCardProps {
  name: string;
  rate: number;
  color: string;
  results: ScenarioResult[];
  principal: number;
  monthlyRate: string;
  className?: string;
}

export default function ScenarioCard({
  name,
  rate,
  color,
  results,
  principal,
  monthlyRate,
  className = '',
}: ScenarioCardProps) {
  const finalResult = results[results.length - 1];
  const totalGain = finalResult ? finalResult.finalAmount - principal : 0;
  const totalGainPercentage = principal > 0 ? (totalGain / principal) * 100 : 0;
  
  // Couleurs écologiques et professionnelles
  const getColor = (scenarioName: string) => {
    if (scenarioName.toLowerCase().includes('conservateur')) return 'rgb(46, 125, 50)'; // green-600
    if (scenarioName.toLowerCase().includes('équilibré')) return 'rgb(22, 160, 133)'; // teal-600
    return 'rgb(34, 197, 94)'; // green-500
  };
  
  const scenarioColor = getColor(name);
  
  return (
    <div className={`bg-white rounded-xl border border-green-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {/* Header mobile-optimized */}
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenarioColor }}></div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{name}</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500">Taux mensuel</p>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold" style={{ color: scenarioColor }}>
            {monthlyRate}
          </div>
          <div className="text-xs text-neutral-500">
            {formatPercentage(finalResult?.annualEquivalent || 0)} /an
          </div>
        </div>
      </div>
      
      {/* Résultat final - Mobile optimized */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 mb-4 sm:mb-6">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-neutral-600 mb-2 font-medium">Capital final (14 mois)</p>
          <p className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
            {formatCurrency(finalResult?.finalAmount || 0)}
          </p>
          <div className="flex flex-col items-center gap-2 text-sm mb-3">
            <div className="flex items-center gap-4">
              <span className="text-neutral-600">
                Gain : <span className="font-bold" style={{ color: scenarioColor }}>
                  +{formatCurrency(totalGain)}
                </span>
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600 font-bold">
                +{totalGainPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          {finalResult?.isLiquid && (
            <p className="text-xs text-neutral-500 italic leading-relaxed">
              *Liquidité sur marché secondaire sous réserve de trouver un acheteur
            </p>
          )}
        </div>
      </div>
      
      {/* Détail des rendements - Mobile simplified */}
      <div className="space-y-2 sm:space-y-3">
        <h4 className="text-sm font-semibold text-neutral-700 mb-2 sm:mb-3">
          📊 Détail des Rendements
        </h4>
        
        {results.map((result) => {
          const gain = result.finalAmount - principal;
          const gainPercentage = principal > 0 ? (gain / principal) * 100 : 0;
          
          return (
            <div key={result.months} className="bg-neutral-50 rounded-lg p-4">
              {/* Header avec durée et taux mensuel */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
                <span className="text-sm font-semibold text-neutral-900">
                  Durée standard: {result.months} mois
                </span>
                <span className="text-sm font-medium text-neutral-600">
                  {formatPercentage(result.monthlyReturn)} par mois
                </span>
              </div>
              
              {/* Grille des rendements */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="text-neutral-500 text-xs uppercase tracking-wide mb-1">Rendement total</div>
                  <div className="font-bold text-lg text-neutral-900">
                    +{gainPercentage.toFixed(1)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-500 text-xs uppercase tracking-wide mb-1">Équivalent annuel</div>
                  <div className="font-bold text-lg" style={{ color: scenarioColor }}>
                    {formatPercentage(result.annualEquivalent)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer discret */}
      <div className="mt-4 pt-3 border-t border-neutral-100">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-3 h-3 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-neutral-500 font-medium">
            Capitalisation mensuelle
          </p>
        </div>
      </div>
    </div>
  );
}