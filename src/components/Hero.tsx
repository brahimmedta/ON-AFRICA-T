import React, { useEffect, useState } from 'react';
import { Building, Truck, Droplets, Phone, MessageCircle } from 'lucide-react';

const Hero = () => {
  const [counters, setCounters] = useState({
    experience: 0,
    projects: 0,
    partners: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const animateCounters = () => {
      const targets = { experience: 15, projects: 200, partners: 50, satisfaction: 100 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targets).forEach((key) => {
        const target = targets[key as keyof typeof targets];
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(current + increment, target);
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));

          if (step >= steps) {
            clearInterval(timer);
            setCounters(prev => ({ ...prev, [key]: target }));
          }
        }, stepDuration);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] text-white relative overflow-hidden">
      {/* Background watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img 
          src="https://i.postimg.cc/x8zq9Qvf/2025-06-29-T075316-796.png" 
          alt="ON AFRICA TP Watermark"
          className="w-96 h-96 lg:w-[600px] lg:h-[600px] object-contain animate-pulse"
        />
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#37bdf8]/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 transform hover:scale-105 transition-transform duration-500">
            ON <span className="text-[#37bdf8] animate-pulse">AFRICA TP</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-blue-200 max-w-4xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300 mb-12">
            Construire l'Afrique de demain, aujourd'hui
          </p>
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Spécialiste en BTP, logistique et travaux publics basé à Nouakchott, Mauritanie
          </p>
        </div>

        <div className="text-center mb-16 animate-fadeInUp delay-500">
          <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-8 transform hover:scale-105 transition-transform duration-300">
            Notre équipe d'experts est prête à vous accompagner dans la réalisation de vos projets les plus ambitieux.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+22228880729"
              className="bg-[#37bdf8] hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-xl"
            >
              <Phone className="h-5 w-5 animate-pulse" />
              <span>Appeler maintenant</span>
            </a>
            
            <a
              href="https://wa.me/34666396336"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-xl"
            >
              <MessageCircle className="h-5 w-5 animate-bounce" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp delay-700">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group">
            <Building className="h-12 w-12 text-[#37bdf8] mx-auto mb-4 group-hover:animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">{counters.experience}+</h3>
            <p className="text-white/80">Années d'expérience</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group">
            <Truck className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">{counters.projects}+</h3>
            <p className="text-white/80">Projets réalisés</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group">
            <Droplets className="h-12 w-12 text-[#37bdf8] mx-auto mb-4 group-hover:animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">{counters.partners}+</h3>
            <p className="text-white/80">Partenaires</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-1 group">
            <Building className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">{counters.satisfaction}%</h3>
            <p className="text-white/80">Satisfaction client</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;