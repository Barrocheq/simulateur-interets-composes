'use client';

export default function ProjectsSection() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-12 sm:py-16">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800 mb-4">
            🌍 Impact social & environnemental
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Nos Projets d'Investissement à Impact
          </h2>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
            Chez Impakt28, chaque euro investi contribue à des projets concrets 
            qui transforment des vies et protègent notre planète.
          </p>
        </div>
        
        {/* Grille des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          
          {/* Projet Logement */}
          <div className="group bg-white rounded-2xl border border-green-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🏠
            </div>
            <h3 className="font-bold text-neutral-900 text-lg mb-2">
              Logement Social
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Construction et rénovation de logements abordables pour les familles à revenus modestes.
            </p>
            <div className="bg-green-50 rounded-lg p-3 text-sm">
              <div className="font-semibold text-green-800">10 000€ = 1 famille logée</div>
              <div className="text-green-600">Logement décent pendant 1 an</div>
            </div>
          </div>
          
          {/* Projet Éducation */}
          <div className="group bg-white rounded-2xl border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className="font-bold text-neutral-900 text-lg mb-2">
              Éducation Accessible
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Financement de la scolarisation d'enfants défavorisés avec fournitures et soutien pédagogique.
            </p>
            <div className="bg-blue-50 rounded-lg p-3 text-sm">
              <div className="font-semibold text-blue-800">6 000€ = 1 enfant scolarisé</div>
              <div className="text-blue-600">Éducation complète pendant 1 an</div>
            </div>
          </div>
          
          {/* Projet Mobilité */}
          <div className="group bg-white rounded-2xl border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🛵
            </div>
            <h3 className="font-bold text-neutral-900 text-lg mb-2">
              Mobilité Durable
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Distribution de scooters électriques pour faciliter l'accès à l'emploi et aux services.
            </p>
            <div className="bg-purple-50 rounded-lg p-3 text-sm">
              <div className="font-semibold text-purple-800">10 000€ = 10 familles équipées</div>
              <div className="text-purple-600">Transport écologique et autonomie</div>
            </div>
          </div>
          
          {/* Projet Nature */}
          <div className="group bg-white rounded-2xl border border-green-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🌱
            </div>
            <h3 className="font-bold text-neutral-900 text-lg mb-2">
              Reforestation
            </h3>
            <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
              Plantation d'arbres indigènes pour restaurer la biodiversité et capturer le CO2.
            </p>
            <div className="bg-green-50 rounded-lg p-3 text-sm">
              <div className="font-semibold text-green-800">500€ = 100 arbres plantés</div>
              <div className="text-green-600">Climat et biodiversité préservés</div>
            </div>
          </div>
        </div>
        
        {/* Section statistiques d'impact global */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
              Notre Impact Collectif
            </h3>
            <p className="text-neutral-600">
              Résultats concrets de nos investisseurs à impact depuis 2020
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">2,847</div>
              <div className="text-sm text-neutral-600">Familles logées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">4,521</div>
              <div className="text-sm text-neutral-600">Enfants scolarisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">1,236</div>
              <div className="text-sm text-neutral-600">Familles équipées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">847K</div>
              <div className="text-sm text-neutral-600">Arbres plantés</div>
            </div>
          </div>
        </div>
        
        {/* Call to action avec disclaimer */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-neutral-600 mb-4">
            Rejoignez une communauté d'investisseurs qui créent un monde plus juste et durable
          </p>
          <p className="text-xs text-neutral-500 mb-4 italic">
            *Ne constitue pas un conseil en investissement. Consultez un professionnel pour vos décisions financières.
          </p>
          <a 
            href="https://impakt28.vc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105"
          >
            Découvrir nos projets
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}