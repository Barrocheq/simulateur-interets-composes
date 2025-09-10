# 📈 Simulateur d'Intérêts Composés

Un simulateur moderne et responsive pour visualiser l'évolution d'un capital avec des intérêts composés selon 3 scénarios (pessimiste 5%, normal 8%, optimiste 10%).

## ✨ Fonctionnalités

- **Formulaire de saisie** avec validation en temps réel
- **Calculs financiers précis** avec capitalisation annuelle
- **Graphique interactif** montrant l'évolution sur 36 mois
- **Cartes de résultats** pour les horizons 12, 24, 36 mois
- **Design moderne** inspiré de la palette IMpakt28
- **100% responsive** et accessible
- **TypeScript strict** et tests unitaires

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet (si depuis un repo git)
git clone <url-du-repo>
cd simulateur-interets-composes

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### Commandes disponibles

```bash
npm run dev      # Développement
npm run build    # Build de production
npm run start    # Démarrer la version de production
npm run lint     # Linter ESLint
npm run test     # Tests unitaires
npm run test:watch  # Tests en mode watch
```

## 🏗️ Architecture

```
/app                 # Pages Next.js (App Router)
  /layout.tsx       # Layout principal
  /page.tsx         # Page d'accueil
  /globals.css      # Styles globaux

/components          # Composants React
  /FormCapital.tsx  # Formulaire de saisie
  /ChartEvolution.tsx # Graphique Recharts
  /ScenarioCard.tsx # Carte de résultats

/lib                 # Utilitaires et logique métier
  /finance.ts       # Calculs financiers
  /format.ts        # Formatage (devise, nombres)

/styles             # Design system
  /theme.css        # Tokens de couleurs CSS

/types              # Types TypeScript
  /index.ts         # Interfaces principales

/tests              # Tests unitaires
  /finance.test.ts  # Tests des calculs
  /format.test.ts   # Tests du formatage
```

## 🎨 Design System

### Palette de couleurs (inspirée IMpakt28)

```css
--color-primary: #FE5B24     /* Orange énergique */
--color-secondary: #7000F4   /* Violet moderne */
--color-accent: #FFD800      /* Jaune vif */
--color-background: #FFFFFE  /* Blanc cassé */
--color-foreground: #000001  /* Noir profond */
--color-muted: #444444       /* Gris texte secondaire */
--color-error: #DE1414       /* Rouge erreurs */
--color-surface: #FAFBFD     /* Surface légèrement teintée */
```

### Classes utilitaires Tailwind

```css
.btn           /* Bouton de base */
.btn-primary   /* Bouton principal */
.btn-accent    /* Bouton accent */
.input         /* Champ de saisie */
.card          /* Carte/conteneur */
```

## 🧮 Formules et logique

### Intérêts composés (capitalisation annuelle)

```
A = P × (1 + r)^t

Où :
- A = montant final
- P = capital initial 
- r = taux annuel (0.05, 0.08, 0.10)
- t = temps en années
```

### Scénarios

| Scénario | Taux annuel | Couleur |
|----------|-------------|---------|
| Pessimiste | 5% | Rouge (#DE1414) |
| Normal | 8% | Orange (#FE5B24) |
| Optimiste | 10% | Violet (#7000F4) |

### Horizons temporels

- **12 mois** (1 an)
- **24 mois** (2 ans) 
- **36 mois** (3 ans)

## 🧪 Tests

Les tests couvrent :

- ✅ Calculs financiers avec cas limites
- ✅ Formatage monétaire français
- ✅ Validation des entrées
- ✅ Génération des séries de données

```bash
# Lancer les tests
npm test

# Tests en mode watch
npm run test:watch
```

## 📱 Responsive & Accessibilité

- **Mobile-first** avec breakpoints Tailwind
- **Focus rings** visibles pour la navigation clavier
- **Labels et ARIA** pour les lecteurs d'écran
- **Contrastes** conformes WCAG 2.1 AA
- **Texte scalable** et lisible

## ⚠️ Points d'attention

### Validation confirmée avec le client

- ✅ **Capitalisation annuelle** (n=1)
- ✅ **Format monétaire français** (1 234 567,89 €)
- ✅ **Palette IMpakt28** validée
- ✅ **Taux annuels composés annuellement**

### Limites actuelles

- Capital maximum : 999 999 999 €
- Pas de gestion des taux variables
- Simulation limitée à 36 mois
- Pas de sauvegarde des calculs

## 🔧 Configuration personnalisée

### Modifier les taux de scénarios

Dans `/lib/finance.ts` :

```typescript
const scenarios = [
  { key: 'pessimiste', rate: 0.05 }, // 5%
  { key: 'normal', rate: 0.08 },     // 8%
  { key: 'optimiste', rate: 0.10 },  // 10%
];
```

### Personnaliser la palette

Dans `/styles/theme.css` :

```css
:root {
  --color-primary: #VOTRE_COULEUR;
  /* etc... */
}
```

## 📦 Technologies utilisées

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (design system)
- **Recharts** (graphiques)
- **Vitest** (tests unitaires)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commiter les changements
4. Lancer les tests : `npm test`
5. Créer une Pull Request

## 📄 Licence

MIT - Voir le fichier `LICENSE` pour plus de détails.

---

*Développé avec ❤️ et Next.js*