import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impakt28 - Gamification à intérêt',
  description: 'Découvrez comment votre investissement peut générer des rendements financiers tout en créant un impact social et environnemental positif',
  keywords: ['finance', 'intérêts composés', 'investissement', 'simulation', 'Impakt28'],
  authors: [{ name: 'Impakt28' }],
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