import React from 'react';
import { Building2, Globe, Handshake, Users } from 'lucide-react';
import { useMultipleDataLoader } from '../utils/dataLoader';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  category: string;
}

interface PartnerCategory {
  partners: Partner[];
}

const categoryIcons = {
  'partenaires-locaux': Building2,
  'partenaires-internationaux': Globe,
  'partenaires-financiers': Handshake,
  'institutions-publiques': Users,
};

const categoryTitles = {
  'partenaires-locaux': 'Partenaires Locaux',
  'partenaires-internationaux': 'Partenaires Internationaux',
  'partenaires-financiers': 'Partenaires Financiers',
  'institutions-publiques': 'Institutions Publiques',
};

const Partners: React.FC = () => {
  const partnerFiles = [
    'data/partners/partenaires-locaux.json',
    'data/partners/partenaires-internationaux.json',
    'data/partners/partenaires-financiers.json',
    'data/partners/institutions-publiques.json'
  ];

  const { data: partnerCategories, loading, error } = useMultipleDataLoader<PartnerCategory>(partnerFiles);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-32 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Erreur de chargement des partenaires: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!partnerCategories || partnerCategories.length === 0) {
    return null;
  }

  return (
    <section id="partners" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#08295f] mb-8 transform hover:scale-105 transition-transform duration-500">
            Nos Partenaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Nous collaborons avec des partenaires de confiance pour garantir l'excellence de nos projets
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto mt-6"></div>
        </div>

        {partnerCategories.map((category, categoryIndex) => {
          const categoryKey = partnerFiles[categoryIndex].split('/').pop()?.replace('.json', '') as keyof typeof categoryIcons;
          const IconComponent = categoryIcons[categoryKey] || Building2;
          const categoryTitle = categoryTitles[categoryKey] || 'Partenaires';

          if (!category.partners || category.partners.length === 0) {
            return null;
          }

          return (
            <div key={categoryIndex} className="mb-16 animate-fadeInUp" style={{ animationDelay: `${categoryIndex * 200}ms` }}>
              <div className="flex items-center justify-center mb-8 group">
                <div className="bg-gradient-to-r from-[#08295f] to-[#37bdf8] p-3 rounded-xl mr-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <IconComponent className="h-8 w-8 text-white group-hover:animate-bounce" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#08295f] group-hover:text-[#37bdf8] transition-colors duration-300">
                  {categoryTitle}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.partners.map((partner, partnerIndex) => (
                  <div
                    key={partner.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 text-center border border-gray-100 transform hover:-translate-y-2 hover:rotate-1"
                    style={{ animationDelay: `${(categoryIndex * 4 + partnerIndex) * 100}ms` }}
                  >
                    <div className="mb-6 relative">
                      {/* 3D background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#37bdf8]/20 to-[#08295f]/20 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                      
                      <div className="relative bg-gray-50 rounded-xl p-4 group-hover:bg-white transition-colors duration-300 transform group-hover:scale-105">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-16 w-auto mx-auto object-contain group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                        />
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-[#08295f] mb-2 group-hover:text-[#37bdf8] transition-colors duration-300 transform group-hover:scale-105">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                      {partner.description}
                    </p>
                    
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#37bdf8] hover:text-[#08295f] text-sm font-medium transition-colors duration-300 transform hover:scale-105 group"
                      >
                        Visiter le site 
                        <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Partners;