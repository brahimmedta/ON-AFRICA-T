import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { loadSingleData, type DirectorData } from '../utils/dataLoader';

const DirectorMessage = () => {
  const [directorData, setDirectorData] = useState<DirectorData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSingleData<DirectorData>('../data/director.json');
      setDirectorData(data);
    };

    loadData();
  }, []);

  // Default values while loading
  const photo1 = directorData?.photo1 || "https://i.postimg.cc/2SvNk6LL/d3bf859c.jpg";
  const photo2 = directorData?.photo2 || "https://i.postimg.cc/2SvNk6LL/d3bf859c.jpg";
  const message1 = directorData?.message1 || "Depuis la création d'ON AFRICA TP en 2009, notre vision a toujours été claire : contribuer au développement durable de l'Afrique en offrant des solutions innovantes et adaptées aux réalités locales.";
  const message2 = directorData?.message2 || "Notre engagement envers l'excellence, l'innovation et le respect de l'environnement guide chacune de nos actions. Nous croyons fermement que l'Afrique mérite des infrastructures de qualité mondiale.";
  const message3 = directorData?.message3 || "Chaque projet que nous réalisons est une opportunité de démontrer notre expertise et notre détermination à construire un avenir meilleur pour nos communautés et notre continent.";
  const position = directorData?.position || "Directeur Général";

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
              Le Mot du Directeur
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Director Photos */}
          <div className="flex justify-center lg:justify-end space-x-6 animate-fadeInUp">
            <div className="relative group">
              <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-[#08295f] to-[#37bdf8] p-2 transform group-hover:scale-110 transition-transform duration-500">
                <img
                  src={photo1}
                  alt="Directeur ON AFRICA TP"
                  className="w-full h-full rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#37bdf8]/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#08295f]/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            <div className="relative group">
              <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-[#37bdf8] to-[#08295f] p-2 transform group-hover:scale-110 transition-transform duration-500">
                <img
                  src={photo2}
                  alt="Directeur ON AFRICA TP"
                  className="w-full h-full rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#08295f]/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#37bdf8]/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-8 animate-fadeInUp delay-300">
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 h-16 w-16 text-[#37bdf8]/40 animate-pulse" />
              
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
                <p className="text-lg text-gray-700 leading-relaxed transform hover:scale-105 transition-transform duration-300">
                  "{message1}"
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed transform hover:scale-105 transition-transform duration-300">
                  "{message2}"
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed transform hover:scale-105 transition-transform duration-300">
                  "{message3}"
                </p>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xl font-bold text-[#08295f] transform hover:scale-105 transition-transform duration-300">
                    {position}
                  </p>
                  <p className="text-[#37bdf8] font-medium transform hover:scale-105 transition-transform duration-300">
                    ON AFRICA TP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;