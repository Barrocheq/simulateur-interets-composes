import type { CompoundParams, CompoundData, SimulationResult } from '@/types';

/**
 * Calcule la valeur finale avec intérêts composés
 * Formule: A = P * (1 + r/n)^(n*t)
 * Avec capitalisation annuelle: A = P * (1 + r)^t
 */
export function compound({
  principal,
  annualRate,
  years,
  compoundingFrequency = 1, // Annuel par défaut
}: CompoundParams): number {
  if (principal < 0 || annualRate < 0 || years < 0) {
    throw new Error('Les paramètres ne peuvent pas être négatifs');
  }
  
  if (principal === 0) return 0;
  
  const amount = principal * Math.pow(1 + annualRate / compoundingFrequency, compoundingFrequency * years);
  
  if (!isFinite(amount)) {
    throw new Error('Résultat de calcul invalide');
  }
  
  return Math.round(amount * 100) / 100; // Arrondi à 2 décimales
}

/**
 * Génère une série de données mensuelles pour le graphique
 * Même si la capitalisation est annuelle, on calcule les valeurs intermédiaires
 */
export function generateMonthlySeries({
  principal,
  annualRate,
  totalMonths,
  compoundingFrequency = 1,
}: {
  principal: number;
  annualRate: number;
  totalMonths: number;
  compoundingFrequency?: number;
}): { month: number; value: number }[] {
  const series = [];
  
  for (let month = 0; month <= totalMonths; month++) {
    const years = month / 12;
    const value = compound({ principal, annualRate, years, compoundingFrequency });
    series.push({ month, value });
  }
  
  return series;
}

/**
 * Simule les 3 scénarios mensuels (conservateur 0.7%, équilibré 1%, dynamique 1.3%)
 */
export function simulateScenarios(principal: number): SimulationResult {
  const scenarios = [
    { key: 'pessimiste' as const, rate: 0.007 }, // 0.7% mensuel
    { key: 'normal' as const, rate: 0.01 },      // 1% mensuel
    { key: 'optimiste' as const, rate: 0.013 },  // 1.3% mensuel
  ];
  
  const monthlyData: CompoundData[] = [];
  const finalAmounts = { pessimiste: 0, normal: 0, optimiste: 0 };
  
  // Génération des données mensuelles pour 14 mois (durée standard d'investissement)
  for (let month = 0; month <= 14; month++) {
    const dataPoint: CompoundData = { month } as CompoundData;
    
    scenarios.forEach(({ key, rate }) => {
      // Calcul mensuel composé: (1 + taux_mensuel)^nb_mois
      const value = principal * Math.pow(1 + rate, month);
      dataPoint[key] = Math.round(value * 100) / 100;
      
      if (month === 14) {
        finalAmounts[key] = dataPoint[key];
      }
    });
    
    monthlyData.push(dataPoint);
  }
  
  return {
    finalAmount: finalAmounts.normal,
    totalInterest: finalAmounts.normal - principal,
    monthlyData,
  };
}

/**
 * Calcule les résultats pour l'horizon de 14 mois + équivalents annuels
 */
export function calculateTimeHorizons(principal: number) {
  const scenarios = [
    { name: 'Conservateur', rate: 0.007, key: 'pessimiste' as const, monthlyRate: '0,7%', annualEquivalent: 0.007 * 12 }, // 0.7% * 12 = 8.4%
    { name: 'Équilibré', rate: 0.01, key: 'normal' as const, monthlyRate: '1,0%', annualEquivalent: 0.01 * 12 }, // 1% * 12 = 12%
    { name: 'Dynamique', rate: 0.013, key: 'optimiste' as const, monthlyRate: '1,3%', annualEquivalent: 0.013 * 12 }, // 1.3% * 12 = 15.6%
  ];
  
  return scenarios.map(scenario => ({
    ...scenario,
    results: [
      {
        months: 14,
        finalAmount: principal * Math.pow(1 + scenario.rate, 14),
        monthlyReturn: scenario.rate,
        annualEquivalent: scenario.annualEquivalent,
        isLiquid: true, // Peut être revendu sur marché secondaire
      }
    ],
  }));
}