'use client';

import { useState, useMemo } from 'react';
import FormCapital from '@/components/FormCapital';
import ChartEvolution from '@/components/ChartEvolution';
import ScenarioCard from '@/components/ScenarioCard';
import ImpactCard from '@/components/ImpactCard';
import ImpactSummary from '@/components/ImpactSummary';
import ProjectsSection from '@/components/ProjectsSection';
import { simulateScenarios, calculateTimeHorizons } from '@/lib/finance';
import { calculateImpacts, getPrimaryImpact } from '@/lib/impact';

export default function HomePage() {
  const [capital, setCapital] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);

  // Calculs mémorisés pour éviter les recalculs inutiles
  const simulationData = useMemo(() => {
    if (!capital) return null;
    
    return simulateScenarios(capital);
  }, [capital]);

  const scenariosData = useMemo(() => {
    if (!capital) return [];
    
    return calculateTimeHorizons(capital);
  }, [capital]);

  const impactData = useMemo(() => {
    if (!capital) return null;
    
    return calculateImpacts(capital);
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
    setSelectedInvestment(null);
  };

  const handleInvestmentSelect = (investmentType: string, amount: number) => {
    setSelectedInvestment(investmentType);
    setCapital(amount);
  };

  // Descriptions des investissements
  const getInvestmentDescription = (type: string) => {
    const descriptions = {
      housing: "Investissement dans le logement social - Financement de la construction et rénovation de logements abordables pour les familles à revenus modestes. Impact direct sur la réduction de la précarité résidentielle.",
      education: "Investissement dans l'éducation - Financement de la scolarisation d'enfants défavorisés avec fournitures scolaires, soutien pédagogique et suivi personnalisé. Création d'opportunités d'avenir durables.",
      mobility: "Investissement dans la mobilité durable - Distribution de scooters électriques pour faciliter l'accès à l'emploi et aux services essentiels. Réduction de l'empreinte carbone et amélioration de l'autonomie."
    };
    return descriptions[type as keyof typeof descriptions] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-green-50">
      {/* Header Impact - compact */}
      <header className="border-b border-green-100 bg-gradient-to-r from-white to-green-50 sticky top-0 z-10">
        <div className="px-4 py-3 sm:py-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full text-xs sm:text-sm font-medium text-green-800 mb-2 sm:mb-3">
              🌱 Impakt28 - Investissement à Impact
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
              Simulateur d'Impact Social
            </h1>
            
            <p className="text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto mb-2 px-2">
              Découvrez comment votre investissement peut générer des rendements financiers 
              tout en créant un impact social et environnemental positif.
            </p>
            <p className="text-xs text-neutral-500 max-w-xl mx-auto mb-3 px-2 italic">
              *Outil de simulation éducative - Ne constitue pas un conseil en investissement
            </p>
            
            {/* Indicateurs d'impact - compact */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="font-medium">Logement</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="font-medium">Éducation</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="font-medium">Mobilité</span>
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
              <div className="bg-white rounded-xl border border-green-200 p-4 sm:p-6 shadow-sm">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-1 sm:mb-2">
                    🌱 Capital d'Impact
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    Montant que vous souhaitez investir à impact
                  </p>
                </div>
                
                <FormCapital onSubmit={handleCapitalSubmit} isLoading={isLoading} />
                
                {capital && (
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-green-100">
                    <button
                      onClick={resetSimulation}
                      className="text-sm text-neutral-500 hover:text-green-600 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Nouveau calcul
                    </button>
                  </div>
                )}
              </div>
              
              {/* Info éducative - Impact social */}
              {!capital && (
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 p-4 sm:p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Impact Social & Financier</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Générez des rendements tout en créant un impact social positif.
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
                <div className="text-center max-w-lg px-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2 sm:mb-3">
                    Votre Impact Personnalisé
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    Saisissez un montant pour découvrir l'impact social concret de votre investissement et visualiser vos rendements sur 1, 2 et 3 ans.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {/* Impact Summary - Mise en avant */}
                <ImpactSummary amount={capital} />
                
                {/* Cartes d'impact social - Mobile: 2 colonnes, Desktop: 4 */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 sm:mb-6 px-1">
                    🌍 Votre Impact Social Concret
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {impactData && Object.entries(impactData).map(([key, impact]) => (
                      <ImpactCard
                        key={key}
                        impact={impact}
                        isHighlighted={getPrimaryImpact(capital).type === impact.type}
                        onClick={() => handleInvestmentSelect(impact.type, impact.costPerUnit)}
                      />
                    ))}
                  </div>

                  {/* Description de l'investissement sélectionné */}
                  {selectedInvestment && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-4 sm:p-6 mt-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          💡
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800 mb-2">
                            Focus sur votre investissement à impact
                          </h3>
                          <p className="text-sm text-green-700 leading-relaxed">
                            {getInvestmentDescription(selectedInvestment)}
                          </p>
                          <button
                            onClick={() => setSelectedInvestment(null)}
                            className="mt-3 text-xs text-green-600 hover:text-green-800 underline"
                          >
                            Voir tous les impacts
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Cartes de scénarios financiers - Mobile: 1 colonne, Tablet: 2, Desktop: 3 */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 sm:mb-6 px-1">
                    💰 Projections Financières
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {scenariosData.map((scenario) => (
                      <ScenarioCard
                        key={scenario.key}
                        name={scenario.name}
                        rate={scenario.rate}
                        color={
                          scenario.key === 'pessimiste' ? '#2e7d32' :
                          scenario.key === 'normal' ? '#16a085' :
                          '#22c55e'
                        }
                        results={scenario.results}
                        principal={capital}
                        monthlyRate={scenario.monthlyRate}
                      />
                    ))}
                  </div>
                </div>

                {/* Graphique mobile-optimized */}
                <div className="bg-white rounded-xl border border-green-200 p-4 sm:p-6 shadow-sm">
                  <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4 sm:mb-6">
                    📈 Évolution de votre Capital sur 14 mois
                  </h2>
                  <div className="-mx-2 sm:mx-0">
                    <ChartEvolution data={simulationData?.monthlyData || []} />
                  </div>
                </div>

                {/* Disclaimer écologique */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-yellow-600 text-xl">⚠️</div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        Avertissement - Investissement Responsable
                      </h3>
                      <p className="text-sm text-neutral-700 mb-2">
                        Cette simulation est fournie à titre informatif uniquement. 
                        Les rendements passés ne garantissent pas les performances futures.
                      </p>
                      <p className="text-sm text-neutral-700">
                        Les projets d'impact social présentés sont des exemples. 
                        Consultez un conseiller financier spécialisé en investissement responsable pour vos décisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Section Projets Impakt28 */}
      <ProjectsSection />

      {/* Footer mobile-optimized */}
      <footer className="border-t border-green-100 bg-gradient-to-r from-green-50 to-neutral-50 mt-8 sm:mt-16">
        <div className="px-4 py-8 sm:py-12 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                🌱 Impakt28 - Investissement à Impact Social
              </h3>
              <p className="text-neutral-600 text-sm">
                Simulateur d'impact pour vos projections financières responsables
              </p>
            </div>
            
            {/* Technologies - Mobile: 2x2 grid, Desktop: inline */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-center sm:space-x-6 text-xs text-neutral-500 mb-4 sm:mb-6">
              <span className="font-medium">Next.js 14</span>
              <span className="font-medium">TypeScript</span>
              <span className="font-medium">Recharts</span>
              <span className="font-medium">Calculs d'Impact</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-neutral-400">
              <span>© 2024 Impakt28</span>
              <span className="hidden sm:inline">•</span>
              <span>Ne constitue pas un conseil en investissement</span>
              <span className="hidden sm:inline">•</span>
              <span>Investissement responsable et durable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}