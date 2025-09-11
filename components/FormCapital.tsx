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
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label 
          htmlFor="capital"
          className="block text-sm sm:text-base font-medium text-neutral-700 mb-2"
        >
          Montant à investir pour l'impact
        </label>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 text-lg">€</span>
          </div>
          <input
            id="capital"
            type="text"
            inputMode="numeric"
            value={capital}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="10 000"
            className={`w-full pl-10 pr-12 py-4 text-lg sm:text-xl font-medium rounded-xl border-2 transition-all duration-200 focus:outline-none ${
              error 
                ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-red-50' 
                : capital && isValid 
                  ? 'border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-green-50'
                  : 'border-neutral-200 focus:border-green-400 focus:ring-4 focus:ring-green-100 bg-white hover:border-green-300'
            }`}
            aria-describedby={error ? 'capital-error' : undefined}
            aria-invalid={!!error}
            disabled={isLoading}
            autoComplete="off"
          />
          
          {capital && isValid && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="mt-2 flex items-start space-x-2">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p id="capital-error" className="text-sm text-red-600" role="alert">
              {error}
            </p>
          </div>
        )}
      </div>
      
      {/* Bouton optimisé mobile */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold text-lg rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-4 focus:ring-green-300 hover:from-green-700 hover:to-green-800"
        aria-label="Calculer les projections d'impact social"
      >
        <div className="flex items-center justify-center">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calcul en cours...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Calculer l'Impact
            </>
          )}
        </div>
      </button>
      
      {/* Confirmation mobile-friendly */}
      {capital && isValid && (
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Capital saisi
              </p>
              <p className="text-lg font-bold text-green-900">
                {formatNumber(parseNumber(capital))} €
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}