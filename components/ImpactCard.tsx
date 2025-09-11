'use client';

import { ImpactData, formatImpactDescription } from '@/lib/impact';

interface ImpactCardProps {
  impact: ImpactData;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export default function ImpactCard({ impact, isHighlighted = false, onClick }: ImpactCardProps) {
  const hasImpact = impact.quantity > 0;
  
  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-300 
        ${onClick ? 'cursor-pointer' : ''}
        ${isHighlighted 
          ? 'border-green-400 shadow-lg scale-105' 
          : 'border-neutral-200 hover:border-green-300 hover:shadow-md'
        }
        ${hasImpact ? 'bg-white' : 'bg-neutral-50'}
        ${onClick ? 'hover:scale-102 active:scale-98' : ''}
      `}
      style={{
        background: hasImpact ? `linear-gradient(135deg, white 0%, ${impact.gradient?.replace('var(--gradient-', '').replace(')', '')}20 100%)` : undefined
      }}
      onClick={onClick}
    >
      {/* Indicateur d'impact en haut à droite */}
      {hasImpact && (
        <div className="absolute top-3 right-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header avec icône et type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div 
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-lg
                ${hasImpact ? 'bg-green-100' : 'bg-neutral-100'}
              `}
            >
              {impact.icon}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">
                {impact.title}
              </h3>
            </div>
          </div>
        </div>
        
        {/* Quantité d'impact */}
        {hasImpact ? (
          <div className="mb-3">
            <div className="text-2xl sm:text-3xl font-bold text-green-700 mb-1">
              {impact.quantity.toLocaleString('fr-FR')}
            </div>
            <div className="text-xs sm:text-sm text-neutral-600">
              {formatImpactDescription(impact)}
            </div>
          </div>
        ) : (
          <div className="mb-3">
            <div className="text-lg text-neutral-500 font-medium mb-1">
              Potentiel d'impact
            </div>
            <div className="text-xs sm:text-sm text-neutral-500">
              {formatImpactDescription(impact)}
            </div>
          </div>
        )}
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          {impact.description}
        </p>
        
        {/* Coût par unité avec bouton d'action */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-neutral-500 font-medium">
            {impact.costPerUnit.toLocaleString('fr-FR')}€ par {impact.unit}
          </div>
          {onClick && (
            <button className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center">
              Investir 
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Barre de progression visuelle si impact > 0 */}
        {hasImpact && (
          <div className="mt-4">
            <div className="w-full bg-neutral-200 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  backgroundColor: impact.color,
                  width: `${Math.min(100, (impact.quantity / getMaxQuantity(impact.type)) * 100)}%`
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getMaxQuantity(type: ImpactData['type']): number {
  switch (type) {
    case 'housing': return 10;
    case 'education': return 15;
    case 'mobility': return 50;
    default: return 10;
  }
}