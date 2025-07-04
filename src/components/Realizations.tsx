import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import { useMultipleDataLoader } from '../utils/dataLoader';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  client: string;
  value: string;
  status: string;
  images: string[];
  features: string[];
  challenges: string[];
  results: string[];
  date: string;
}

const Realizations: React.FC = () => {
  const projectFiles = [
    'data/projects/2024-batiment-industriel.json',
    'data/projects/2024-terrassement-infrastructure.json',
    'data/projects/2023-adduction-eau.json',
    'data/projects/2023-amenagement-agricole.json'
  ];

  const { data: projects, loading, error } = useMultipleDataLoader<Project>(projectFiles);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded mb-4 w-64 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-64 bg-gray-300 rounded-lg mb-4"></div>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Erreur de chargement des projets: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  // Sort projects by date (most recent first)
  const sortedProjects = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section id="realizations" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#08295f] mb-8 transform hover:scale-105 transition-transform duration-500">
            Nos Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Découvrez nos projets les plus marquants et notre expertise en action
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#08295f] to-[#37bdf8] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 border border-gray-100 overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08295f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#37bdf8] to-[#08295f] text-white text-sm rounded-full mb-2 shadow-lg">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {project.title}
                  </h3>
                </div>
                
                <div className="absolute top-4 right-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium shadow-lg ${
                    project.status === 'Terminé' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#08295f] mb-3 group-hover:text-[#37bdf8] transition-colors duration-300 transform group-hover:scale-105">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-[#08295f] transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-[#37bdf8] mr-2 group-hover:animate-bounce" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-[#08295f] transition-colors duration-300">
                    <Calendar className="h-4 w-4 text-green-500 mr-2 group-hover:animate-bounce" />
                    {project.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-[#08295f] transition-colors duration-300">
                    <Users className="h-4 w-4 text-purple-500 mr-2 group-hover:animate-bounce" />
                    {project.client}
                  </div>
                  <div className="flex items-center text-sm text-gray-700 group-hover:text-[#08295f] transition-colors duration-300">
                    <Award className="h-4 w-4 text-yellow-500 mr-2 group-hover:animate-bounce" />
                    {project.value}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-[#08295f] mb-2 group-hover:text-[#37bdf8] transition-colors duration-300">Points clés:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#37bdf8] to-[#08295f] rounded-full mr-3 transform group-hover:scale-150 transition-transform duration-300"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button className="text-[#37bdf8] font-semibold hover:text-[#08295f] transition-colors duration-300 transform hover:scale-105 flex items-center group">
                    Voir les détails 
                    <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Realizations;