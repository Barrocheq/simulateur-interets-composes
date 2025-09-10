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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-light-bg) 100%)' }}>
      {/* Header Hero - Style IMpakt28 */}
      <header className="relative overflow-hidden section-hero bg-gradient-primary">
        {/* Effet de superposition subtil */}
        <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.05)' }}></div>
        
        {/* Motifs décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-gradient-creative rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-gradient-diagonal rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative container">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              Simulateur financier moderne
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Simulateur d'Intérêts 
              <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                Composés
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Découvrez le pouvoir des intérêts composés et visualisez l'évolution de votre capital 
              avec nos <strong>3 scénarios de rendement</strong>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                Pessimiste 5%
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
                Normal 8%
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                Optimiste 10%
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="section container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar Formulaire */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Carte formulaire avec effet IMpakt28 */}
              <div className="card hover:shadow-xl transition-all duration-500">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-lg">💰</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Capital initial
                    </h2>
                  </div>
                  <p className="text-muted text-sm">
                    Entrez le montant que vous souhaitez investir
                  </p>
                </div>
                
                <FormCapital onSubmit={handleCapitalSubmit} isLoading={isLoading} />
                
                {capital && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={resetSimulation}
                      className="flex items-center text-sm text-muted hover:text-primary transition-colors font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Nouveau calcul
                    </button>
                  </div>
                )}
              </div>
              
              {/* Info Box */}
              {!capital && (
                <div className="card mt-6" style={{ background: 'var(--color-light-bg)' }}>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">📈</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Pourquoi les intérêts composés ?</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Einstein les appelait la "8e merveille du monde". 
                      Vos gains génèrent à leur tour des gains !
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zone de résultats */}
          <div className="lg:col-span-2">
            {!capital ? (
              <div className="text-center py-20">
                {/* État vide avec design moderne */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-primary rounded-full opacity-10 blur-xl"></div>
                  </div>
                  <div className="relative">
                    <div className="text-8xl mb-6 filter drop-shadow-sm">📊</div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      Prêt à découvrir votre potentiel ?
                    </h3>
                    <p className="text-lg text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
                      Entrez votre capital initial et visualisez instantanément son évolution 
                      sur <strong>12, 24 et 36 mois</strong> selon nos 3 scénarios de rendement.
                    </p>
                    
                    {/* Indicateurs visuels */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                        <div className="text-xs text-muted font-medium">Conservateur</div>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-primary mx-auto mb-1"></div>
                        <div className="text-xs text-muted font-medium">Équilibré</div>
                      </div>
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-secondary mx-auto mb-1"></div>
                        <div className="text-xs text-muted font-medium">Dynamique</div>
                      </div>
                    </div>
                  </div>
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

      {/* Footer moderne IMpakt28 */}
      <footer className="section bg-foreground text-background relative overflow-hidden">
        {/* Motifs décoratifs */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-gradient-primary rounded-full blur-2xl"></div>
        </div>
        
        <div className="container relative">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Simulateur d'Intérêts Composés</h3>
              <p className="text-background/70">
                Développé avec passion pour démocratiser la finance
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-background/60">
              <div className="flex items-center">
                <span className="mr-2">⚡</span>
                Next.js 14
              </div>
              <div className="flex items-center">
                <span className="mr-2">🎨</span>
                Design IMpakt28
              </div>
              <div className="flex items-center">
                <span className="mr-2">📊</span>
                Recharts
              </div>
              <div className="flex items-center">
                <span className="mr-2">🧪</span>
                Tests unitaires
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-background/10">
              <p className="text-xs text-background/50">
                © 2024 - Outil éducatif. Ne constitue pas un conseil financier.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}