'use client';

import { useState, useMemo } from 'react';
import FormCapital from '@/components/FormCapital';
import ChartEvolution from '@/components/ChartEvolution';
import ScenarioCard from '@/components/ScenarioCard';
import { simulateScenarios, calculateTimeHorizons } from '@/lib/finance';

export default function HomePage() {
  const [capital, setCapital] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calculs mémorisés pour éviter les recalculs inutiles
  const simulationData = useMemo(() => {
    if (!capital) return null;
    
    return simulateScenarios(capital);
  }, [capital]);

  const scenariosData = useMemo(() => {
    if (!capital) return [];
    
    return calculateTimeHorizons(capital);
  }, [capital]);

  const handleCapitalSubmit = async (newCapital: number) => {
    setIsLoading(true);
    
    // Simulation d'un délai pour l'UX (optionnel)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCapital(newCapital);
    setIsLoading(false);
  };

  const resetSimulation = () => {
    setCapital(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header mobile-optimized */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="px-4 py-6 sm:py-8 md:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wider mb-4 sm:mb-6">
              Impakt28
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Simulateur d'Intérêt
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Visualisez l'évolution de votre capital selon trois scénarios de rendement.
            </p>
            
            {/* Indicateurs responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="font-medium">Conservateur 5%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="font-medium">Équilibré 8%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="font-medium">Dynamique 10%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal mobile-first */}
      <main className="px-4 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Mobile: Stack vertical, Desktop: Grid 3 colonnes */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Formulaire - Full width mobile, sidebar desktop */}
          <div className="lg:col-span-1 order-1">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Carte formulaire mobile-optimized */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    💰 Capital initial
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Montant que vous souhaitez investir
                  </p>
                </div>
                
                <FormCapital onSubmit={handleCapitalSubmit} isLoading={isLoading} />
                
                {capital && (
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={resetSimulation}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Nouveau calcul
                    </button>
                  </div>
                )}
              </div>
              
              {/* Info éducative - Masquée sur petit mobile si capital saisi */}
              {!capital && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Intérêts composés</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Vos gains génèrent à leur tour des gains.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zone de résultats - Mobile: ordre 2, Desktop: à droite */}
          <div className="lg:col-span-2 order-2">
            {!capital ? (
              <div className="flex items-center justify-center py-12 sm:py-16">
                <div className="text-center max-w-sm px-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    Vos résultats ici
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Saisissez un montant pour découvrir l'évolution sur 1, 2 et 3 ans.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {/* Cartes de scénarios - Mobile: 1 colonne, Tablet: 2, Desktop: 3 */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 px-1">
                    🎯 Résultats par scénario
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {scenariosData.map((scenario) => (
                      <ScenarioCard
                        key={scenario.key}
                        name={scenario.name}
                        rate={scenario.rate}
                        color={
                          scenario.key === 'pessimiste' ? '#ef4444' :
                          scenario.key === 'normal' ? '#6b7280' :
                          '#3b82f6'
                        }
                        results={scenario.results}
                        principal={capital}
                      />
                    ))}
                  </div>
                </div>

                {/* Graphique mobile-optimized */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    📈 Évolution sur 36 mois
                  </h2>
                  <div className="-mx-2 sm:mx-0">
                    <ChartEvolution data={simulationData?.monthlyData || []} />
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="card bg-surface border-l-4 border-l-accent">
                  <div className="flex items-start space-x-3">
                    <div className="text-accent text-xl">⚠️</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Avertissement
                      </h3>
                      <p className="text-sm text-muted">
                        Cette simulation est fournie à titre informatif uniquement. 
                        Les rendements passés ne garantissent pas les performances futures. 
                        Consultez un conseiller financier pour des décisions d'investissement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer mobile-optimized */}
      <footer className="border-t border-gray-100 bg-gray-50 mt-8 sm:mt-16">
        <div className="px-4 py-8 sm:py-12 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Impakt28 - Simulateur d'Intérêt
              </h3>
              <p className="text-gray-600 text-sm">
                Outil éducatif pour vos projections financières
              </p>
            </div>
            
            {/* Technologies - Mobile: 2x2 grid, Desktop: inline */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-center sm:space-x-6 text-xs text-gray-500 mb-4 sm:mb-6">
              <span className="font-medium">Next.js 14</span>
              <span className="font-medium">TypeScript</span>
              <span className="font-medium">Recharts</span>
              <span className="font-medium">Tests unitaires</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-400">
              <span>© 2024 Impakt28</span>
              <span className="hidden sm:inline">•</span>
              <span>Ne constitue pas un conseil en investissement</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}