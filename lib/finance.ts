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
 * Simule les 3 scénarios (pessimiste 5%, normal 8%, optimiste 10%)
 */
export function simulateScenarios(principal: number): SimulationResult {
  const scenarios = [
    { key: 'pessimiste' as const, rate: 0.05 },
    { key: 'normal' as const, rate: 0.08 },
    { key: 'optimiste' as const, rate: 0.10 },
  ];
  
  const monthlyData: CompoundData[] = [];
  const finalAmounts = { pessimiste: 0, normal: 0, optimiste: 0 };
  
  // Génération des données mensuelles pour 36 mois
  for (let month = 0; month <= 36; month++) {
    const dataPoint: CompoundData = { month } as CompoundData;
    
    scenarios.forEach(({ key, rate }) => {
      const years = month / 12;
      const value = compound({ principal, annualRate: rate, years });
      dataPoint[key] = value;
      
      if (month === 36) {
        finalAmounts[key] = value;
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
 * Calcule les résultats pour les horizons 12, 24, 36 mois
 */
export function calculateTimeHorizons(principal: number) {
  const scenarios = [
    { name: 'Pessimiste', rate: 0.05, key: 'pessimiste' as const },
    { name: 'Normal', rate: 0.08, key: 'normal' as const },
    { name: 'Optimiste', rate: 0.10, key: 'optimiste' as const },
  ];
  
  const timeHorizons = [12, 24, 36];
  
  return scenarios.map(scenario => ({
    ...scenario,
    results: timeHorizons.map(months => ({
      months,
      years: months / 12,
      finalAmount: compound({
        principal,
        annualRate: scenario.rate,
        years: months / 12,
      }),
    })),
  }));
}