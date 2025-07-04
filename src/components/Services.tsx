import React from 'react';
import { Building, Truck, Wrench, Droplets, Package, HardHat } from 'lucide-react';
import { useMultipleDataLoader } from '../utils/dataLoader';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: string;
}

const iconMap = {
  building: Building,
  truck: Truck,
  wrench: Wrench,
  droplets: Droplets,
  package: Package,
  hardhat: HardHat,
};

const Services: React.FC = () => {
  const serviceFiles = [
    'data/services/construction.json',
    'data/services/terrassement.json',
    'data/services/amenagement-agricole.json',
    'data/services/adduction-eau.json',
    'data/services/logistique.json',
    'data/services/location-engins.json'
  ];

  const { data: services, loading, error } = useMultipleDataLoader<Service>(serviceFiles);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
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
            <p className="text-red-600">Erreur de chargement des services: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#08295f] mb-8 transform hover:scale-105 transition-transform duration-500">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Des solutions complètes pour tous vos projets de construction et travaux publics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building;
            
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-gray-100 overflow-hidden animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08295f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* 3D Icon */}
                  <div className="absolute bottom-4 left-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="bg-gradient-to-r from-[#37bdf8] to-[#08295f] p-3 rounded-xl shadow-lg group-hover:shadow-2xl">
                      <IconComponent className="h-6 w-6 text-white group-hover:animate-bounce" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#08295f] mb-3 group-hover:text-[#37bdf8] transition-colors duration-300 transform group-hover:scale-105">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#37bdf8] to-[#08295f] rounded-full mr-3 transform group-hover:scale-150 transition-transform duration-300"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <button className="text-[#37bdf8] font-semibold hover:text-[#08295f] transition-colors duration-300 transform hover:scale-105 flex items-center group">
                      En savoir plus 
                      <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;