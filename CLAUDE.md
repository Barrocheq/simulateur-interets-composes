# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev                 # Start Next.js development server on localhost:3000

# Build and production
npm run build              # Build production version
npm run start              # Start production server

# Code quality
npm run lint               # Run ESLint
npm run test               # Run unit tests with Vitest  
npm run test:watch         # Run tests in watch mode

# Package management
npm install                # Install dependencies
```

## Architecture Overview

This is a Next.js 14 application using App Router for a compound interest simulator with 3 financial scenarios (5%, 8%, 10% annual returns).

### Core Structure
```
/app/                     # Next.js App Router pages
  layout.tsx             # Root layout with theme
  page.tsx               # Main simulator page
  globals.css            # Global styles and Tailwind imports

/components/             # React components
  FormCapital.tsx        # Capital input form with validation
  ChartEvolution.tsx     # Recharts interactive graph (36 months)
  ScenarioCard.tsx       # Results display cards

/lib/                    # Business logic utilities
  finance.ts             # Compound interest calculations
  format.ts              # French currency/number formatting

/types/                  # TypeScript interfaces
  index.ts               # Core types (CompoundData, Scenario, etc.)

/styles/                 # Design system
  theme.css              # Professional black/white/gray color tokens

/tests/                  # Unit tests
  finance.test.ts        # Financial calculation tests
  format.test.ts         # Formatting utility tests
```

### Key Types
- `CompoundData`: Monthly data points for chart (pessimiste, normal, optimiste)
- `Scenario`: Scenario configuration (name, rate, color, key)
- `CompoundParams`: Compound interest calculation parameters
- `SimulationResult`: Complete simulation output with monthly data

### Financial Logic
- **Formula**: A = P × (1 + r)^t (annual compounding)
- **Scenarios**: 5% pessimistic, 8% normal, 10% optimistic
- **Time horizons**: 12, 24, 36 months
- **French formatting**: "1 234 567,89 €" format
- **Validation**: Handles edge cases (negative values, zero principal, infinite results)

## Design System

Uses a professional monochrome palette defined in `/styles/theme.css`:
- Primary: #000000 (pure black)
- Background: #ffffff (pure white) 
- Grays: --gray-50 through --gray-900
- Semantic colors: error (#e53e3e), success (#38a169), warning (#d69e2e)

Tailwind extends these CSS custom properties for consistent theming across components.

## Key Conventions

### Formatting
- Use `formatCurrency()` for all monetary displays
- Use `formatPercentage()` for rates
- French locale formatting throughout (fr-FR)

### Financial Calculations
- Annual compounding frequency (n=1) is the default
- All calculations in `/lib/finance.ts`
- Input validation for negative values and edge cases
- Results rounded to 2 decimal places

### Component Patterns
- TypeScript strict mode enabled
- Recharts for interactive charts
- Form validation with real-time feedback
- Mobile-first responsive design
- Accessibility with ARIA labels and focus rings

### Testing
- Vitest for unit tests
- Focus on financial calculation accuracy
- Test edge cases (zero principal, high values, etc.)
- French formatting validation

## Mobile-First Design

The application is optimized for mobile devices first with:
- Responsive breakpoints using Tailwind
- Touch-friendly interface elements
- Scalable typography and spacing
- Professional, accessible color contrasts

## Configuration Points

### Modifying Scenarios
Edit rates in `/lib/finance.ts`:
```typescript
const scenarios = [
  { key: 'pessimiste', rate: 0.05 },  // 5%
  { key: 'normal', rate: 0.08 },      // 8%  
  { key: 'optimiste', rate: 0.10 },   // 10%
];
```

### Customizing Colors
Update CSS custom properties in `/styles/theme.css`

### Time Horizons
Modify the horizons array in `calculateTimeHorizons()` function

Visual Development & Testing

Design System

The project follows S-Tier SaaS design standards inspired by Stripe, Airbnb, and Linear. All UI development must adhere to:

Design Principles: /context/design-principles.md - Comprehensive checklist for world-class UI
Component Library: NextUI with custom Tailwind configuration
Quick Visual Check

IMMEDIATELY after implementing any front-end change:

Identify what changed - Review the modified components/pages
Navigate to affected pages - Use mcp__playwright__browser_navigate to visit each changed view
Verify design compliance - Compare against /context/design-principles.md
Validate feature implementation - Ensure the change fulfills the user's specific request
Check acceptance criteria - Review any provided context files or requirements
Capture evidence - Take full page screenshot at desktop viewport (1440px) of each changed view
Check for errors - Run mcp__playwright__browser_console_messages ⚠️
This verification ensures changes meet design standards and user requirements.

Comprehensive Design Review

For significant UI changes or before merging PRs, use the design review agent:

# Option 1: Use the slash command
/design-review

# Option 2: Invoke the agent directly
@agent-design-review
The design review agent will:

Test all interactive states and user flows
Verify responsiveness (desktop/tablet/mobile)
Check accessibility (WCAG 2.1 AA compliance)
Validate visual polish and consistency
Test edge cases and error states
Provide categorized feedback (Blockers/High/Medium/Nitpicks)
Playwright MCP Integration

Essential Commands for UI Testing

// Navigation & Screenshots
mcp__playwright__browser_navigate(url); // Navigate to page
mcp__playwright__browser_take_screenshot(); // Capture visual evidence
mcp__playwright__browser_resize(
  width,
  height
); // Test responsiveness

// Interaction Testing
mcp__playwright__browser_click(element); // Test clicks
mcp__playwright__browser_type(
  element,
  text
); // Test input
mcp__playwright__browser_hover(element); // Test hover states

// Validation
mcp__playwright__browser_console_messages(); // Check for errors
mcp__playwright__browser_snapshot(); // Accessibility check
mcp__playwright__browser_wait_for(
  text / element
); // Ensure loading
Design Compliance Checklist

When implementing UI features, verify:

 Visual Hierarchy: Clear focus flow, appropriate spacing
 Consistency: Uses design tokens, follows patterns
 Responsiveness: Works on mobile (375px), tablet (768px), desktop (1440px)
 Accessibility: Keyboard navigable, proper contrast, semantic HTML
 Performance: Fast load times, smooth animations (150-300ms)
 Error Handling: Clear error states, helpful messages
 Polish: Micro-interactions, loading states, empty states
When to Use Automated Visual Testing

Use Quick Visual Check for:

Every front-end change, no matter how small
After implementing new components or features
When modifying existing UI elements
After fixing visual bugs
Before committing UI changes
Use Comprehensive Design Review for:

Major feature implementations
Before creating pull requests with UI changes
When refactoring component architecture
After significant design system updates
When accessibility compliance is critical
Skip Visual Testing for:

Backend-only changes (API, database)
Configuration file updates
Documentation changes
Test file modifications
Non-visual utility functions


Additional Context

Design review agent configuration: /.claude/agents/design-review-agent.md
Design principles checklist: /context/design-principles.md
Custom slash commands: /context/design-review-slash-command.md