import React, { useEffect, useState } from 'react';
import { loadCollectionData, type PartnerData } from '../utils/dataLoader';

const Partners = () => {
  const [partners, setPartners] = useState<PartnerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadCollectionData<PartnerData>('partners');
        setPartners(data);
      } catch (error) {
        console.error('Error loading partners:', error);
        // Fallback to default partners if loading fails
        setPartners(defaultPartners);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Default partners as fallback
  const defaultPartners: PartnerData[] = [
    {
      name: 'Partenaires Internationaux',
      description: 'Collaboration avec des entreprises mondiales pour des projets d\'envergure',
      logo: 'https://i.postimg.cc/HLwm2xp1/9d4f801b.jpg',
      partnership_type: 'Partenaire technique'
    },
    {
      name: 'Partenaires Locaux',
      description: 'Réseau solide de partenaires mauritaniens et africains',
      logo: 'https://i.postimg.cc/2SvNk6LL/d3bf859c.jpg',
      partnership_type: 'Partenaire technique'
    },
    {
      name: 'Institutions Publiques',
      description: 'Collaboration avec les organismes gouvernementaux et publics',
      logo: 'https://i.postimg.cc/QCPvsGXq/c981b834.jpg',
      partnership_type: 'Client'
    },
    {
      name: 'Partenaires Financiers',
      description: 'Relations privilégiées avec les institutions financières',
      logo: 'https://i.postimg.cc/Rh3bgscJ/05cc3b44.jpg',
      partnership_type: 'Partenaire financier'
    }
  ];

  const partnersToRender = partners.length > 0 ? partners : defaultPartners;

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37bdf8] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des partenaires...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title - Fixed Layout */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-block bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-2xl px-8 py-4 mb-8 transform hover:scale-105 transition-transform duration-500 shadow-lg">
            <h2 className="text-3xl lg:text-4xl font-bold text-white whitespace-nowrap">
              Nos Partenaires
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Notre succès repose sur un réseau solide de partenaires de confiance, 
            tant au niveau local qu'international, qui nous permettent de réaliser 
            des projets d'excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {partnersToRender.map((partner, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 border border-gray-100 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-2 transform group-hover:scale-105 transition-transform duration-300">
                    {partner.name}
                  </h3>
                  <span className="bg-[#37bdf8] text-white text-xs px-3 py-1 rounded-full">
                    {partner.partnership_type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 mb-4">
                  {partner.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#37bdf8] hover:text-[#08295f] text-sm font-medium transition-colors duration-300"
                    >
                      🌐 Site web
                    </a>
                  )}
                  {partner.email && (
                    <a
                      href={`mailto:${partner.email}`}
                      className="text-[#37bdf8] hover:text-[#08295f] text-sm font-medium transition-colors duration-300"
                    >
                      📧 Contact
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300 animate-fadeInUp delay-500">
          <h3 className="text-2xl font-bold text-[#08295f] mb-4">
            Devenir Partenaire
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Vous souhaitez collaborer avec ON AFRICA TP ? Nous sommes toujours 
            à la recherche de nouveaux partenaires pour développer ensemble 
            des projets innovants et durables.
          </p>
          <button className="bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white px-8 py-4 rounded-full font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;