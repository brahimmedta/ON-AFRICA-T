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
      <section className="py-20 bg-gray-50">
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
      <section className="py-20 bg-gray-50">
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
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Partenaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous collaborons avec des partenaires de confiance pour garantir l'excellence de nos projets
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {partnerCategories.map((category, categoryIndex) => {
          const categoryKey = partnerFiles[categoryIndex].split('/').pop()?.replace('.json', '') as keyof typeof categoryIcons;
          const IconComponent = categoryIcons[categoryKey] || Building2;
          const categoryTitle = categoryTitles[categoryKey] || 'Partenaires';

          if (!category.partners || category.partners.length === 0) {
            return null;
          }

          return (
            <div key={categoryIndex} className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">{categoryTitle}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center group"
                  >
                    <div className="mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-16 w-auto mx-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {partner.description}
                    </p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        Visiter le site →
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