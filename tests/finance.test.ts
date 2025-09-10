import { describe, it, expect } from 'vitest';
import { compound, generateMonthlySeries, simulateScenarios, calculateTimeHorizons } from '@/lib/finance';

describe('Calculs financiers', () => {
  describe('compound', () => {
    it('calcule correctement les intérêts composés annuels', () => {
      // Test 1: 1000€ à 10% sur 1 an
      const result1 = compound({
        principal: 1000,
        annualRate: 0.10,
        years: 1,
        compoundingFrequency: 1,
      });
      expect(result1).toBeCloseTo(1100, 2);

      // Test 2: 1000€ à 8% sur 3 ans
      const result2 = compound({
        principal: 1000,
        annualRate: 0.08,
        years: 3,
        compoundingFrequency: 1,
      });
      expect(result2).toBeCloseTo(1259.71, 2);

      // Test 3: 10000€ à 5% sur 2 ans
      const result3 = compound({
        principal: 10000,
        annualRate: 0.05,
        years: 2,
        compoundingFrequency: 1,
      });
      expect(result3).toBeCloseTo(11025, 2);
    });

    it('gère les cas limites', () => {
      // Capital zéro
      expect(compound({ principal: 0, annualRate: 0.08, years: 1 })).toBe(0);

      // Taux zéro
      expect(compound({ principal: 1000, annualRate: 0, years: 1 })).toBe(1000);

      // Temps zéro
      expect(compound({ principal: 1000, annualRate: 0.08, years: 0 })).toBe(1000);
    });

    it('lance une erreur pour des valeurs négatives', () => {
      expect(() => compound({ principal: -1000, annualRate: 0.08, years: 1 }))
        .toThrow('Les paramètres ne peuvent pas être négatifs');

      expect(() => compound({ principal: 1000, annualRate: -0.08, years: 1 }))
        .toThrow('Les paramètres ne peuvent pas être négatifs');

      expect(() => compound({ principal: 1000, annualRate: 0.08, years: -1 }))
        .toThrow('Les paramètres ne peuvent pas être négatifs');
    });
  });

  describe('generateMonthlySeries', () => {
    it('génère une série mensuelle correcte', () => {
      const series = generateMonthlySeries({
        principal: 1000,
        annualRate: 0.12, // 12% pour simplifier
        totalMonths: 12,
      });

      expect(series).toHaveLength(13); // 0 à 12 mois inclus
      expect(series[0].month).toBe(0);
      expect(series[0].value).toBe(1000);
      expect(series[12].month).toBe(12);
      expect(series[12].value).toBeCloseTo(1120, 2); // 1000 * 1.12
    });

    it('a des valeurs croissantes dans le temps', () => {
      const series = generateMonthlySeries({
        principal: 1000,
        annualRate: 0.08,
        totalMonths: 24,
      });

      for (let i = 1; i < series.length; i++) {
        expect(series[i].value).toBeGreaterThan(series[i - 1].value);
      }
    });
  });

  describe('simulateScenarios', () => {
    it('simule les 3 scénarios correctement', () => {
      const result = simulateScenarios(10000);

      expect(result.monthlyData).toHaveLength(37); // 0 à 36 mois
      expect(result.monthlyData[0].pessimiste).toBe(10000);
      expect(result.monthlyData[0].normal).toBe(10000);
      expect(result.monthlyData[0].optimiste).toBe(10000);

      // À 36 mois (3 ans)
      const final = result.monthlyData[36];
      expect(final.pessimiste).toBeCloseTo(11576.25, 1); // 10000 * 1.05^3
      expect(final.normal).toBeCloseTo(12597.12, 1);     // 10000 * 1.08^3
      expect(final.optimiste).toBeCloseTo(13310, 1);     // 10000 * 1.10^3
    });

    it('calcule correctement les intérêts totaux', () => {
      const result = simulateScenarios(10000);
      
      expect(result.finalAmount).toBeCloseTo(12597.12, 1);
      expect(result.totalInterest).toBeCloseTo(2597.12, 1);
    });
  });

  describe('calculateTimeHorizons', () => {
    it('calcule les horizons temporels corrects', () => {
      const result = calculateTimeHorizons(10000);

      expect(result).toHaveLength(3); // 3 scénarios
      
      const normal = result.find(s => s.key === 'normal');
      expect(normal).toBeDefined();
      expect(normal!.results).toHaveLength(3); // 12, 24, 36 mois

      // Vérification 12 mois (1 an) à 8%
      const oneYear = normal!.results[0];
      expect(oneYear.months).toBe(12);
      expect(oneYear.years).toBe(1);
      expect(oneYear.finalAmount).toBeCloseTo(10800, 1);
    });

    it('a des montants croissants dans le temps', () => {
      const result = calculateTimeHorizons(10000);

      result.forEach(scenario => {
        for (let i = 1; i < scenario.results.length; i++) {
          expect(scenario.results[i].finalAmount)
            .toBeGreaterThan(scenario.results[i - 1].finalAmount);
        }
      });
    });
  });
});