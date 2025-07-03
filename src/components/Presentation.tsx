import React from 'react';
import { Building2, Hammer, Sprout, Droplets, Truck, Wrench } from 'lucide-react';

const Presentation = () => {
  const expertises = [
    {
      icon: Building2,
      title: 'Construction',
      description: 'Bâtiments publics, privés et industriels'
    },
    {
      icon: Hammer,
      title: 'Terrassement',
      description: 'Travaux de terrassement et de voirie'
    },
    {
      icon: Sprout,
      title: 'Aménagement agricole',
      description: 'Pistes rurales et périmètres irrigués'
    },
    {
      icon: Droplets,
      title: 'Adduction d\'eau potable',
      description: 'Forages et réseaux hydrauliques'
    },
    {
      icon: Truck,
      title: 'Logistique',
      description: 'Transport et manutention'
    },
    {
      icon: Wrench,
      title: 'Location d\'engins',
      description: 'Équipements lourds et spécialisés'
    }
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#08295f] mb-8 transform hover:scale-105 transition-transform duration-500">
            Présentation
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-8 transform hover:scale-105 transition-transform duration-300">
              Depuis sa création en 2009, ON AFRICA TP s'est donnée pour mission d'apporter des solutions innovantes, durables et adaptées aux besoins de l'Afrique en matière d'infrastructures, de logistique, et de travaux publics. Basée à Nouakchott, en Mauritanie, notre entreprise combine expertise technique, engagement local et vision moderne pour accompagner le développement du continent.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 transform hover:scale-105 transition-transform duration-300">
              Nous sommes fiers de contribuer à la transformation de l'Afrique, un projet à la fois, en offrant des services de qualité qui répondent aux défis contemporains tout en respectant l'environnement et les communautés locales.
            </p>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            ON AFRICA TP est spécialisée dans un large éventail de domaines d'expertise, 
            offrant des solutions complètes pour répondre aux besoins de développement 
            de l'Afrique moderne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertises.map((expertise, index) => {
            const IconComponent = expertise.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 group border border-gray-100 animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-2xl mb-6 group-hover:from-[#37bdf8] group-hover:to-[#08295f] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                  <IconComponent className="h-8 w-8 text-white group-hover:animate-bounce" />
                </div>
                
                <h3 className="text-xl font-bold text-[#08295f] mb-3 group-hover:text-[#37bdf8] transition-colors duration-300">
                  {expertise.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {expertise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Presentation;