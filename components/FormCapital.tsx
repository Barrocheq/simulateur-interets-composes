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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Montant en euros
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">€</span>
          </div>
          <input
            id="capital"
            type="text"
            value={capital}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="10 000"
            className={`input pl-8 ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : capital && isValid 
                  ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-gray-500 focus:ring-gray-200'
            }`}
            aria-describedby={error ? 'capital-error' : undefined}
            aria-invalid={!!error}
            disabled={isLoading}
          />
          
          {capital && isValid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {error && (
          <p id="capital-error" className="mt-1 text-sm text-red-600" role="alert">
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
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calcul en cours...
          </>
        ) : (
          'Calculer'
        )}
      </button>
      
      {capital && isValid && (
        <div className="text-center p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600">
            Capital saisi : <span className="font-semibold text-gray-900">
              {formatNumber(parseNumber(capital))} €
            </span>
          </p>
        </div>
      )}
    </form>
  );
}