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
    <div className="min-h-screen bg-gradient-to-br from-background to-surface">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simulateur d'Intérêts Composés
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Découvrez comment votre capital peut évoluer avec différents scénarios de rendement
            </p>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                💰 Capital initial
              </h2>
              <FormCapital onSubmit={handleCapitalSubmit} isLoading={isLoading} />
              
              {capital && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={resetSimulation}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    ← Nouveau calcul
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Résultats */}
          <div className="lg:col-span-2">
            {!capital ? (
              <div className="card text-center py-16">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Prêt à simuler ?
                </h3>
                <p className="text-muted max-w-md mx-auto">
                  Entrez votre capital initial pour voir l'évolution selon 3 scénarios : 
                  pessimiste (5%), normal (8%) et optimiste (10%).
                </p>
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

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Simulateur d'intérêts composés - Développé avec ❤️ et Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}