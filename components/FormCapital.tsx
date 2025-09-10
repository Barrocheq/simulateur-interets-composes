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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label 
          htmlFor="capital"
          className="block text-sm font-semibold text-foreground"
        >
          Montant à investir
        </label>
        
        {/* Input avec design IMpakt28 */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-muted text-lg">€</span>
          </div>
          <input
            id="capital"
            type="text"
            value={capital}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="10 000"
            className={`input pl-10 text-lg font-medium ${
              error 
                ? 'border-error focus:ring-error shadow-red-100' 
                : capital && isValid 
                  ? 'border-primary focus:ring-primary shadow-orange-100' 
                  : ''
            }`}
            aria-describedby={error ? 'capital-error' : undefined}
            aria-invalid={!!error}
            disabled={isLoading}
          />
          
          {/* Indicateur de validation */}
          {capital && isValid && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="flex items-start space-x-2">
            <div className="text-error mt-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p id="capital-error" className="text-sm text-error" role="alert">
              {error}
            </p>
          </div>
        )}
      </div>
      
      {/* Bouton avec design IMpakt28 */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="btn btn-primary w-full text-lg py-4 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
        aria-label="Calculer les projections d'intérêts composés"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        )}
        
        <span className="flex items-center justify-center">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calcul en cours...
            </>
          ) : (
            <>
              <span className="mr-2">📊</span>
              Calculer mes gains
            </>
          )}
        </span>
      </button>
      
      {/* Confirmation visuelle */}
      {capital && isValid && (
        <div className="bg-surface/50 rounded-lg p-4 border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Capital à investir</p>
              <p className="text-lg font-bold text-primary">
                {formatNumber(parseNumber(capital))} €
              </p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
      )}
    </form>
  );
}