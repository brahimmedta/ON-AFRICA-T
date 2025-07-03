import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Realizations = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const projects = [
    {
      image: 'https://i.postimg.cc/HLwm2xp1/9d4f801b.jpg',
      title: 'Construction de bâtiment industriel',
      description: 'Réalisation d\'un complexe industriel moderne'
    },
    {
      image: 'https://i.postimg.cc/2SvNk6LL/d3bf859c.jpg',
      title: 'Travaux de terrassement',
      description: 'Aménagement de terrain pour projet d\'infrastructure'
    },
    {
      image: 'https://i.postimg.cc/QCPvsGXq/c981b834.jpg',
      title: 'Aménagement agricole',
      description: 'Création de périmètre irrigué'
    },
    {
      image: 'https://i.postimg.cc/Rh3bgscJ/05cc3b44.jpg',
      title: 'Adduction d\'eau potable',
      description: 'Installation de réseau hydraulique'
    },
    {
      image: 'https://i.postimg.cc/0y1HCCrr/6f1f99f.jpg',
      title: 'Transport de marchandises',
      description: 'Logistique et transport sécurisé'
    },
    {
      image: 'https://i.postimg.cc/Y25wJYhB/62fc8b03.jpg',
      title: 'Location d\'engins lourds',
      description: 'Mise à disposition d\'équipements spécialisés'
    },
    {
      image: 'https://i.postimg.cc/5yvDxK6d/deba58d9.jpg',
      title: 'Projet de construction',
      description: 'Réalisation de bâtiment public'
    },
    {
      image: 'https://i.postimg.cc/7hgQvCWq/5937acb7.jpg',
      title: 'Travaux de voirie',
      description: 'Aménagement de routes et voiries'
    },
    {
      image: 'https://i.postimg.cc/gjq4SCxJ/da350119.jpg',
      title: 'Infrastructure hydraulique',
      description: 'Réalisation de forage et équipements'
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % projects.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + projects.length) % projects.length);
    }
  };

  return (
    <section className="min-h-screen bg-white py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title - Fixed Layout */}
        <div className="text-center mb-20 animate-fadeInUp">
          <div className="inline-block bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-2xl px-8 py-4 mb-8 transform hover:scale-105 transition-transform duration-500 shadow-lg">
            <h2 className="text-3xl lg:text-4xl font-bold text-white whitespace-nowrap">
              Nos Réalisations
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Découvrez quelques-uns de nos projets réalisés avec succès, 
            témoignant de notre expertise et de notre engagement envers l'excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 cursor-pointer border border-gray-100 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 transform group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for image preview */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors transform hover:scale-110"
              >
                <X className="h-6 w-6" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              <img
                src={projects[selectedImage].image}
                alt={projects[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-2xl transform hover:scale-105 transition-transform duration-300"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-white font-bold text-xl mb-2">
                  {projects[selectedImage].title}
                </h3>
                <p className="text-white/80">
                  {projects[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Realizations;