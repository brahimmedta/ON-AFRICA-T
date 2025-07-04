import React from 'react';
import { Quote } from 'lucide-react';
import { useDataLoader } from '../utils/dataLoader';

interface DirectorData {
  name: string;
  title: string;
  message: string;
  photo: string;
  signature: string;
  experience: string;
  specialties: string[];
}

const DirectorMessage: React.FC = () => {
  const { data: directorData, loading, error } = useDataLoader<DirectorData>('data/director.json');

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-64"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
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
            <p className="text-red-600">Erreur de chargement: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!directorData) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#08295f] mb-8 transform hover:scale-105 transition-transform duration-500">
            Message du Directeur
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Message Content */}
          <div className="order-2 lg:order-1 animate-fadeInUp delay-300">
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 h-16 w-16 text-[#37bdf8]/20 transform rotate-12" />
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 pl-8 relative z-10 transform hover:scale-105 transition-transform duration-300">
                "{directorData.message}"
              </blockquote>
            </div>
            
            <div className="border-l-4 border-gradient-to-b from-[#08295f] to-[#37bdf8] pl-6 bg-white rounded-r-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#08295f] mb-2 transform hover:text-[#37bdf8] transition-colors duration-300">
                {directorData.name}
              </h3>
              <p className="text-[#37bdf8] font-semibold mb-4 text-lg">
                {directorData.title}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {directorData.experience}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-[#08295f] mb-3 text-lg">Domaines d'expertise:</h4>
                <div className="flex flex-wrap gap-3">
                  {directorData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-[#37bdf8]/10 to-[#08295f]/10 text-[#08295f] text-sm rounded-full border border-[#37bdf8]/20 transform hover:scale-110 transition-transform duration-300 hover:shadow-md"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              {directorData.signature && (
                <img
                  src={directorData.signature}
                  alt="Signature"
                  className="h-16 object-contain transform hover:scale-110 transition-transform duration-300"
                />
              )}
            </div>
          </div>

          {/* Director Photo with 3D effects */}
          <div className="order-1 lg:order-2 animate-fadeInUp delay-500">
            <div className="relative group">
              {/* 3D background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#08295f] to-[#37bdf8] rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#37bdf8] to-[#08295f] rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-30"></div>
              
              {/* Main image container */}
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl transform group-hover:scale-105 group-hover:-rotate-2 transition-all duration-500">
                <img
                  src={directorData.photo}
                  alt={directorData.name}
                  className="w-full h-96 object-cover rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-[#08295f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#37bdf8] rounded-full opacity-60 group-hover:animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#08295f] rounded-full opacity-60 group-hover:animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;