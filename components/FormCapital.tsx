'use client';

import { useState } from 'react';
import { parseNumber, formatNumber } from '@/lib/format';

interface FormCapitalProps {
  onSubmit: (capital: number) => void;
  isLoading?: boolean;
}

export default function FormCapital({ onSubmit, isLoading = false }: FormCapitalProps) {
  const [capital, setCapital] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateCapital = (value: string): string | null => {
    if (!value.trim()) {
      return 'Le capital initial est requis';
    }
    
    const parsed = parseNumber(value);
    
    if (isNaN(parsed) || !isFinite(parsed)) {
      return 'Veuillez entrer un montant valide';
    }
    
    if (parsed < 0) {
      return 'Le capital ne peut pas être négatif';
    }
    
    if (parsed === 0) {
      return 'Le capital doit être supérieur à 0';
    }
    
    if (parsed > 999999999) {
      return 'Le montant ne peut pas dépasser 999 999 999 €';
    }
    
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCapital(value);
    
    // Validation en temps réel (optionnelle, moins intrusive)
    if (value && error) {
      const validationError = validateCapital(value);
      if (!validationError) {
        setError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateCapital(capital);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    const parsedCapital = parseNumber(capital);
    setError('');
    onSubmit(parsedCapital);
  };

  const handleBlur = () => {
    if (capital) {
      const validationError = validateCapital(capital);
      setError(validationError || '');
    }
  };

  const isValid = capital && !validateCapital(capital);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label 
          htmlFor="capital"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Capital initial (€)
        </label>
        <input
          id="capital"
          type="text"
          value={capital}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: 10 000"
          className={`input ${error ? 'border-error focus:ring-error' : ''}`}
          aria-describedby={error ? 'capital-error' : undefined}
          aria-invalid={!!error}
          disabled={isLoading}
        />
        {error && (
          <p id="capital-error" className="mt-1 text-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Calculer les projections d'intérêts composés"
      >
        {isLoading ? 'Calcul en cours...' : 'Calculer'}
      </button>
      
      {capital && isValid && (
        <p className="text-sm text-muted text-center">
          Capital saisi : <span className="font-medium text-foreground">
            {formatNumber(parseNumber(capital))} €
          </span>
        </p>
      )}
    </form>
  );
}