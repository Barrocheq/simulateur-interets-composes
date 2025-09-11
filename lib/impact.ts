// Logique des impacts sociaux et environnementaux
// Basé sur les montants d'investissement

export interface ImpactData {
  type: 'housing' | 'education' | 'mobility' | 'nature';
  title: string;
  description: string;
  quantity: number;
  unit: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface ImpactCalculation {
  housing: ImpactData;
  education: ImpactData;
  mobility: ImpactData;
  nature: ImpactData;
}

// Coûts de référence pour les impacts sociaux
const IMPACT_COSTS = {
  housing: 10000,      // 10k€ pour loger une famille
  education: 6000,     // 6k€ pour l'éducation d'un enfant pendant 1 an
  mobility: 1000,      // 1k€ pour un scooter électrique par famille (10k€ pour 10 familles)
  nature: 500,         // 500€ pour planter 100 arbres
} as const;

// Configuration des impacts
const IMPACT_CONFIG = {
  housing: {
    title: 'Familles logées',
    description: 'Familles bénéficiant d\'un logement décent grâce à votre investissement',
    unit: 'famille',
    icon: '🏠',
    color: 'var(--impact-housing)',
    gradient: 'var(--gradient-housing)'
  },
  education: {
    title: 'Enfants scolarisés',
    description: 'Enfants ayant accès à l\'éducation pendant une année complète',
    unit: 'enfant',
    icon: '📚',
    color: 'var(--impact-education)',
    gradient: 'var(--gradient-education)'
  },
  mobility: {
    title: 'Familles équipées',
    description: 'Familles bénéficiant de moyens de transport électriques durables',
    unit: 'famille',
    icon: '🛵',
    color: 'var(--impact-mobility)',
    gradient: 'var(--gradient-mobility)'
  },
  nature: {
    title: 'Arbres plantés',
    description: 'Arbres plantés pour la reforestation et la biodiversité',
    unit: 'arbre',
    icon: '🌱',
    color: 'var(--impact-nature)',
    gradient: 'var(--gradient-housing)'
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
    quantity: Math.floor(amount / IMPACT_COSTS.mobility / 10) // 10 scooters par "famille équipée"
  };

  const nature: ImpactData = {
    type: 'nature',
    ...IMPACT_CONFIG.nature,
    quantity: Math.floor(amount / IMPACT_COSTS.nature) * 100 // 100 arbres par tranche
  };

  return {
    housing,
    education,
    mobility,
    nature
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
  return impacts.nature;
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
    case 'mobility': return 'équipée(s)';
    case 'nature': return 'planté(s)';
    default: return 'aidé(e)(s)';
  }
}

/**
 * Récupère les statistiques globales d'impact pour l'affichage
 */
export function getImpactStats(amount: number) {
  const impacts = calculateImpacts(amount);
  
  return {
    totalBeneficiaries: impacts.housing.quantity + impacts.education.quantity + impacts.mobility.quantity,
    treesPlanted: impacts.nature.quantity,
    primaryImpact: getPrimaryImpact(amount),
    allImpacts: impacts
  };
}