'use client';

import { getImpactStats } from '@/lib/impact';

interface ImpactSummaryProps {
  amount: number;
}

export default function ImpactSummary({ amount }: ImpactSummaryProps) {
  const stats = getImpactStats(amount);
  const { primaryImpact, totalBeneficiaires } = stats;
  
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 sm:p-6">
      <div className="flex items-start space-x-4">
        {/* Icône principale */}
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
          {primaryImpact.icon}
        </div>
        
        {/* Contenu principal */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-bold text-green-800 text-lg mb-1">
                Votre Impact Principal
              </h3>
              <p className="text-green-700 font-medium">
                {primaryImpact.quantity > 0 
                  ? `${primaryImpact.quantity.toLocaleString('fr-FR')} ${primaryImpact.unit}${primaryImpact.quantity > 1 ? 's' : ''} ${getActionVerb(primaryImpact.type)}`
                  : 'Contribuez à un impact social positif'
                }
              </p>
            </div>
            
            {/* Statistiques rapides */}
            <div className="flex space-x-4 text-sm">
              {totalBeneficiaires > 0 && (
                <div className="text-center">
                  <div className="font-bold text-green-800">{totalBeneficiaires}</div>
                  <div className="text-green-600">bénéficiaires</div>
                </div>
              )}
              {primaryImpact.costPerUnit && (
                <div className="text-center">
                  <div className="font-bold text-green-800">{primaryImpact.costPerUnit.toLocaleString('fr-FR')}€</div>
                  <div className="text-green-600">par {primaryImpact.unit}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Message d'encouragement avec disclaimer */}
          <p className="text-sm text-green-600 mt-2">
            Avec Impakt28, votre investissement génère un impact social et environnemental mesurable.
          </p>
          <p className="text-xs text-neutral-500 mt-1 italic">
            *Ces projections sont illustratives et ne constituent pas un conseil en investissement.
          </p>
        </div>
      </div>
    </div>
  );
}

function getActionVerb(type: string): string {
  switch (type) {
    case 'housing': return 'logées';
    case 'education': return 'scolarisés';
    case 'mobility': return 'équipées';
    case 'nature': return 'plantés';
    default: return 'aidés';
  }
}