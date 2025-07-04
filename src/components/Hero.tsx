import React from 'react';
import { ArrowRight, Users, Building, Award, Calendar } from 'lucide-react';
import { useDataLoader } from '../utils/dataLoader';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  cta: {
    text: string;
    link: string;
  };
  stats: {
    experience: {
      value: string;
      label: string;
    };
    projects: {
      value: string;
      label: string;
    };
    clients: {
      value: string;
      label: string;
    };
    awards: {
      value: string;
      label: string;
    };
  };
  backgroundImage: string;
}

const Hero: React.FC = () => {
  const { data: heroData, loading, error } = useDataLoader<HeroData>('data/hero.json');

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-center">
            <div className="h-12 bg-gray-700 rounded mb-4 w-96"></div>
            <div className="h-6 bg-gray-700 rounded mb-2 w-64"></div>
            <div className="h-6 bg-gray-700 rounded mb-2 w-80"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <p className="text-red-400">Erreur de chargement: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-gray-900/80"></div>
      
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {heroData.title}
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-blue-200">
                {heroData.subtitle}
              </p>
              <p className="text-lg mb-8 text-gray-300 leading-relaxed">
                {heroData.description}
              </p>
              
              <a
                href={heroData.cta.link}
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {heroData.cta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{heroData.stats.experience.value}</div>
                <div className="text-blue-200">{heroData.stats.experience.label}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                <Building className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{heroData.stats.projects.value}</div>
                <div className="text-blue-200">{heroData.stats.projects.label}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                <Users className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{heroData.stats.clients.value}</div>
                <div className="text-blue-200">{heroData.stats.clients.label}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
                <Award className="h-8 w-8 text-red-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{heroData.stats.awards.value}</div>
                <div className="text-blue-200">{heroData.stats.awards.label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;