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
      {/* Header épuré et professionnel */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container section-hero">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 uppercase tracking-wider mb-8">
              Outil financier professionnel
            </div>
            
            <h1 className="text-hero text-gray-900 mb-6">
              Simulateur d'Intérêts Composés
            </h1>
            
            <p className="text-subtitle max-w-2xl mx-auto mb-12">
              Visualisez l'évolution de votre capital selon trois scénarios de rendement. 
              Un outil simple et précis pour vos projections financières.
            </p>
            
            {/* Indicateurs de scénarios minimalistes */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <span>Conservateur 5%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span>Équilibré 8%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Dynamique 10%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="section container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Formulaire */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Carte formulaire minimaliste */}
              <div className="card">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Capital initial
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Saisissez le montant à investir
                  </p>
                </div>
                
                <FormCapital onSubmit={handleCapitalSubmit} isLoading={isLoading} />
                
                {capital && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={resetSimulation}
                      className="btn-ghost text-sm"
                    >
                      ← Nouveau calcul
                    </button>
                  </div>
                )}
              </div>
              
              {/* Info éducative */}
              {!capital && (
                <div className="card bg-gray-50 border-gray-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Les intérêts composés</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      "La 8ème merveille du monde" selon Einstein. 
                      Vos gains génèrent à leur tour des gains.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zone de résultats */}
          <div className="lg:col-span-2">
            {!capital ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Vos résultats apparaîtront ici
                  </h3>
                  <p className="text-gray-600">
                    Entrez un capital initial pour visualiser l'évolution 
                    sur 12, 24 et 36 mois selon les trois scénarios.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Graphique */}
                <div className="card">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    📊 Évolution du capital sur 36 mois
                  </h2>
                  <ChartEvolution data={simulationData?.monthlyData || []} />
                </div>

                {/* Cartes de scénarios */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    🎯 Résultats par scénario
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {scenariosData.map((scenario) => (
                      <ScenarioCard
                        key={scenario.key}
                        name={scenario.name}
                        rate={scenario.rate}
                        color={
                          scenario.key === 'pessimiste' ? '#DE1414' :
                          scenario.key === 'normal' ? '#FE5B24' :
                          '#7000F4'
                        }
                        results={scenario.results}
                        principal={capital}
                      />
                    ))}
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

      {/* Footer minimaliste */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Simulateur d'Intérêts Composés
              </h3>
              <p className="text-gray-600 text-sm">
                Outil éducatif pour vos projections financières
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 mb-6">
              <span>Next.js 14</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Recharts</span>
              <span>•</span>
              <span>Tests unitaires</span>
            </div>
            
            <p className="text-xs text-gray-400">
              © 2024 - Ne constitue pas un conseil en investissement
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}