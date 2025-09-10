import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercentage, formatNumber, parseNumber } from '@/lib/format';

describe('Formatage', () => {
  describe('formatCurrency', () => {
    it('formate correctement les montants en euros', () => {
      expect(formatCurrency(1234.56)).toBe('1 234,56 €');
      expect(formatCurrency(1000)).toBe('1 000,00 €');
      expect(formatCurrency(0)).toBe('0,00 €');
      expect(formatCurrency(999999.99)).toBe('999 999,99 €');
    });

    it('gère les valeurs infinies et NaN', () => {
      expect(formatCurrency(Infinity)).toBe('0,00 €');
      expect(formatCurrency(-Infinity)).toBe('0,00 €');
      expect(formatCurrency(NaN)).toBe('0,00 €');
    });
  });

  describe('formatPercentage', () => {
    it('formate correctement les pourcentages', () => {
      expect(formatPercentage(0.08)).toBe('8 %');
      expect(formatPercentage(0.1)).toBe('10 %');
      expect(formatPercentage(0.05)).toBe('5 %');
      expect(formatPercentage(0.125)).toBe('12,5 %');
    });
  });

  describe('formatNumber', () => {
    it('formate les nombres avec séparateurs français', () => {
      expect(formatNumber(1234)).toBe('1 234');
      expect(formatNumber(1234567)).toBe('1 234 567');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('parseNumber', () => {
    it('parse correctement les formats français', () => {
      expect(parseNumber('1 234,56')).toBe(1234.56);
      expect(parseNumber('1234.56')).toBe(1234.56);
      expect(parseNumber('1 000')).toBe(1000);
      expect(parseNumber('0')).toBe(0);
    });

    it('gère les chaînes invalides', () => {
      expect(parseNumber('abc')).toBe(0);
      expect(parseNumber('')).toBe(0);
      expect(parseNumber('   ')).toBe(0);
    });

    it('gère les types non-string', () => {
      expect(parseNumber(123 as any)).toBe(0);
      expect(parseNumber(null as any)).toBe(0);
    });
  });
});