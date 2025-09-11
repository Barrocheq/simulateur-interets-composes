// Logique des impacts sociaux et environnementaux
// Basé sur les montants d'investissement

export interface ImpactData {
  type: 'housing' | 'education' | 'mobility';
  title: string;
  description: string;
  quantity: number;
  unit: string;
  icon: string;
  color: string;
  gradient: string;
  costPerUnit: number;
}

export interface ImpactCalculation {
  housing: ImpactData;
  education: ImpactData;
  mobility: ImpactData;
}

// Coûts de référence pour les impacts sociaux
const IMPACT_COSTS = {
  housing: 10000,      // 10k€ pour loger une famille
  education: 6000,     // 6k€ pour l'éducation d'un enfant pendant 1 an
  mobility: 1000,      // 1k€ pour un scooter électrique par famille
} as const;

// Configuration des impacts
const IMPACT_CONFIG = {
  housing: {
    title: 'Familles logées',
    description: 'Familles bénéficiant d\'un logement décent grâce à votre investissement',
    unit: 'famille',
    icon: '🏠',
    color: 'var(--impact-housing)',
    gradient: 'var(--gradient-housing)',
    costPerUnit: 10000
  },
  education: {
    title: 'Enfants scolarisés',
    description: 'Enfants ayant accès à l\'éducation pendant une année complète',
    unit: 'enfant',
    icon: '📚',
    color: 'var(--impact-education)',
    gradient: 'var(--gradient-education)',
    costPerUnit: 6000
  },
  mobility: {
    title: 'Scooters électriques',
    description: 'Scooters électriques fournis pour faciliter l\'accès à l\'emploi',
    unit: 'scooter',
    icon: '🛵',
    color: 'var(--impact-mobility)',
    gradient: 'var(--gradient-mobility)',
    costPerUnit: 1000
  }
} as const;

/**
 * Calcule les impacts sociaux potentiels d'un montant d'investissement
 */
export function calculateImpacts(amount: number): ImpactCalculation {
  const housing: ImpactData = {
    type: 'housing',
    ...IMPACT_CONFIG.housing,
    quantity: Math.floor(amount / IMPACT_COSTS.housing)
  };

  const education: ImpactData = {
    type: 'education',
    ...IMPACT_CONFIG.education,
    quantity: Math.floor(amount / IMPACT_COSTS.education)
  };

  const mobility: ImpactData = {
    type: 'mobility',
    ...IMPACT_CONFIG.mobility,
    quantity: Math.floor(amount / IMPACT_COSTS.mobility)
  };

  return {
    housing,
    education,
    mobility
  };
}

/**
 * Récupère l'impact principal (le plus significatif) pour un montant donné
 */
export function getPrimaryImpact(amount: number): ImpactData {
  const impacts = calculateImpacts(amount);
  
  // Priorise selon l'ordre d'impact social
  if (impacts.housing.quantity >= 1) return impacts.housing;
  if (impacts.education.quantity >= 1) return impacts.education;
  if (impacts.mobility.quantity >= 1) return impacts.mobility;
  return impacts.housing; // Par défaut, retourne housing même avec quantité 0
}

/**
 * Formate la description d'un impact pour l'affichage
 */
export function formatImpactDescription(impact: ImpactData): string {
  if (impact.quantity === 0) {
    return `Participez à ${impact.description.toLowerCase()}`;
  }
  
  const plural = impact.quantity > 1 ? 's' : '';
  const unit = impact.quantity > 1 ? 
    (impact.unit === 'enfant' ? 'enfants' : 
     impact.unit === 'famille' ? 'familles' : 
     impact.unit + 's') : 
    impact.unit;
  
  return `${impact.quantity} ${unit} ${getActionVerb(impact.type)}`;
}

function getActionVerb(type: ImpactData['type']): string {
  switch (type) {
    case 'housing': return 'logée(s)';
    case 'education': return 'scolarisé(e)(s)';
    case 'mobility': return 'fourni(s)';
    default: return 'aidé(e)(s)';
  }
}

/**
 * Récupère les statistiques globales d'impact pour l'affichage
 */
export function getImpactStats(amount: number) {
  const impacts = calculateImpacts(amount);
  
  return {
    totalBeneficiaires: impacts.housing.quantity + impacts.education.quantity + impacts.mobility.quantity,
    primaryImpact: getPrimaryImpact(amount),
    allImpacts: impacts
  };
}