import React from 'react';
import { Building, Hammer, Sprout, Droplets, Truck, Wrench, Plus } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: 'Construction de bâtiments',
      description: 'Réalisation de bâtiments publics, privés et industriels avec des standards de qualité élevés et des finitions soignées.',
      image: 'https://i.postimg.cc/HLwm2xp1/9d4f801b.jpg'
    },
    {
      icon: Hammer,
      title: 'Travaux de terrassement et de voirie',
      description: 'Terrassement, nivellement et aménagement de voiries pour tous types de projets d\'infrastructure.',
      image: 'https://i.postimg.cc/2SvNk6LL/d3bf859c.jpg'
    },
    {
      icon: Sprout,
      title: 'Aménagements agricoles',
      description: 'Création de pistes rurales et aménagement de périmètres irrigués pour soutenir le développement agricole.',
      image: 'https://i.postimg.cc/QCPvsGXq/c981b834.jpg'
    },
    {
      icon: Droplets,
      title: 'Adduction d\'eau potable',
      description: 'Réalisation de forages et installation de réseaux hydrauliques pour l\'approvisionnement en eau potable.',
      image: 'https://i.postimg.cc/Rh3bgscJ/05cc3b44.jpg'
    },
    {
      icon: Truck,
      title: 'Logistique et transport de marchandises',
      description: 'Services de transport et de logistique pour l\'acheminement sécurisé de vos marchandises.',
      image: 'https://i.postimg.cc/0y1HCCrr/6f1f99f.jpg'
    },
    {
      icon: Wrench,
      title: 'Location de camions et d\'engins lourds',
      description: 'Mise à disposition d\'équipements lourds et spécialisés avec opérateurs qualifiés.',
      image: 'https://i.postimg.cc/Y25wJYhB/62fc8b03.jpg'
    },
    {
      icon: Plus,
      title: 'Divers autres services',
      description: 'Nous proposons également d\'autres services spécialisés selon vos besoins spécifiques.',
      image: 'https://i.postimg.cc/5yvDxK6d/deba58d9.jpg'
    }
  ];

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
              Nos Services
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Découvrez notre gamme complète de services pour répondre à tous vos besoins 
            en matière de construction, travaux publics et logistique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 border border-gray-100 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <IconComponent className="h-6 w-6 text-white group-hover:animate-bounce" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#08295f] mb-3 group-hover:text-[#37bdf8] transition-colors duration-300 transform group-hover:scale-105">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fadeInUp delay-700">
          <button className="bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white px-8 py-4 rounded-full font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
            Nous contacter pour un devis
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;