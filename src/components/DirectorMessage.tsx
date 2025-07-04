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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Message du Directeur
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Message Content */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 h-12 w-12 text-blue-600/20" />
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 pl-8">
                {directorData.message}
              </blockquote>
            </div>
            
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {directorData.name}
              </h3>
              <p className="text-blue-600 font-semibold mb-2">
                {directorData.title}
              </p>
              <p className="text-gray-600 mb-4">
                {directorData.experience}
              </p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Spécialités:</h4>
                <div className="flex flex-wrap gap-2">
                  {directorData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
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
                  className="h-16 object-contain"
                />
              )}
            </div>
          </div>

          {/* Director Photo */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl transform rotate-3"></div>
              <img
                src={directorData.photo}
                alt={directorData.name}
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;