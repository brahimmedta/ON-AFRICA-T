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
      <section className="py-20 bg-white">
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
      <section className="py-20 bg-white">
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
    <section id="realizations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Réalisations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos projets les plus marquants et notre expertise en action
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    project.status === 'Terminé' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-green-600 mr-2" />
                    {project.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    {project.client}
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Award className="h-4 w-4 text-yellow-600 mr-2" />
                    {project.value}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Points clés:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Voir les détails →
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