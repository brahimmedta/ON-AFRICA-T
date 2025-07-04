import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { loadSingleData, type SettingsData } from '../utils/dataLoader';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSingleData<SettingsData>('data/settings.json');
      setSettingsData(data);
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'presentation', label: 'Présentation' },
    { id: 'directeur', label: 'Le mot du directeur' },
    { id: 'services', label: 'Nos services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'partenaires', label: 'Nos partenaires' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Default values while loading
  const logo = settingsData?.logo || "https://i.postimg.cc/x8zq9Qvf/2025-06-29-T075316-796.png";
  const companyName = settingsData?.company_name || "ON AFRICA TP";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-white/20' 
        : 'bg-white/90 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavClick('accueil')}
              className="flex items-center space-x-3 group"
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 ${
                isScrolled ? 'shadow-lg' : 'shadow-md'
              }`}>
                <img 
                  src={logo} 
                  alt={companyName}
                  className="h-8 w-8 lg:h-10 lg:w-10 object-contain filter brightness-0 invert"
                />
              </div>
              <span className={`text-[#08295f] font-bold text-lg lg:text-xl group-hover:text-[#37bdf8] transition-all duration-500 whitespace-nowrap transform group-hover:scale-105 ${
                isScrolled ? 'text-shadow-sm' : ''
              }`}>
                {companyName}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className={`flex items-center space-x-1 rounded-full p-2 transition-all duration-500 ${
              isScrolled 
                ? 'bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 shadow-lg' 
                : 'bg-gray-50/60 backdrop-blur-sm border border-gray-200/30 shadow-md'
            }`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-500 transform hover:scale-105 whitespace-nowrap ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white shadow-lg scale-105'
                      : 'text-[#08295f] hover:text-[#37bdf8] hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#37bdf8] to-[#08295f] rounded-full animate-pulse opacity-20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden text-[#08295f] p-2 hover:text-[#37bdf8] transition-all duration-500 flex-shrink-0 transform hover:scale-110 ${
              isScrolled ? 'shadow-md rounded-lg bg-white/50' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-6 py-4 rounded-xl transition-all duration-500 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white shadow-lg'
                      : 'text-[#08295f] hover:bg-gray-50/80 hover:text-[#37bdf8] hover:shadow-md'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;