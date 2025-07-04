import React, { useRef, useEffect } from 'react';
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
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              const increment = target / 100;
              let current = 0;
              
              const updateCounter = () => {
                if (current < target) {
                  current += increment;
                  counter.textContent = Math.ceil(current).toString() + (counter.getAttribute('data-suffix') || '');
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target.toString() + (counter.getAttribute('data-suffix') || '');
                }
              };
              
              updateCounter();
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [heroData]);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f]">
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
      <section className="relative min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f]">
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

  const handleCTAClick = () => {
    if (heroData.cta.link.startsWith('#')) {
      const sectionId = heroData.cta.link.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#08295f]/90 via-blue-900/80 to-[#08295f]/90"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#37bdf8]/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#37bdf8]/15 rounded-full blur-lg animate-float"></div>
      
      <div className="relative z-10 flex items-center min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-8 animate-fadeInUp">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight transform hover:scale-105 transition-transform duration-500">
                  <span className="bg-gradient-to-r from-white to-[#37bdf8] bg-clip-text text-transparent">
                    {heroData.title}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl font-light text-[#37bdf8] transform hover:scale-105 transition-transform duration-300">
                  {heroData.subtitle}
                </p>
              </div>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-200 max-w-2xl transform hover:scale-105 transition-transform duration-300">
                {heroData.description}
              </p>
              
              <button
                onClick={handleCTAClick}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#37bdf8] to-[#08295f] hover:from-[#08295f] hover:to-[#37bdf8] text-white font-semibold rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-lg"
              >
                <span className="mr-3">{heroData.cta.text}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* Stats with 3D effects */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 animate-fadeInUp delay-500">
              <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:rotate-3 hover:shadow-2xl">
                <Calendar className="h-10 w-10 text-[#37bdf8] mx-auto mb-4 group-hover:animate-bounce" />
                <div className="counter text-4xl font-bold text-white mb-2" data-target="15" data-suffix="+">0+</div>
                <div className="text-[#37bdf8] font-medium">{heroData.stats.experience.label}</div>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-3 hover:shadow-2xl">
                <Building className="h-10 w-10 text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="counter text-4xl font-bold text-white mb-2" data-target="200" data-suffix="+">0+</div>
                <div className="text-[#37bdf8] font-medium">{heroData.stats.projects.label}</div>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:rotate-3 hover:shadow-2xl">
                <Users className="h-10 w-10 text-yellow-400 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="counter text-4xl font-bold text-white mb-2" data-target="150" data-suffix="+">0+</div>
                <div className="text-[#37bdf8] font-medium">{heroData.stats.clients.label}</div>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-3 hover:shadow-2xl">
                <Award className="h-10 w-10 text-red-400 mx-auto mb-4 group-hover:animate-bounce" />
                <div className="counter text-4xl font-bold text-white mb-2" data-target="25" data-suffix="+">0+</div>
                <div className="text-[#37bdf8] font-medium">{heroData.stats.awards.label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;