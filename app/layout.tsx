import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Simulateur d\'Intérêts Composés',
  description: 'Simulez l\'évolution de votre capital avec différents scénarios de rendement',
  keywords: ['finance', 'intérêts composés', 'investissement', 'simulation'],
  authors: [{ name: 'IMpakt28' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}