import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { loadSingleData, type SettingsData } from '../utils/dataLoader';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSingleData<SettingsData>('data/settings.json');
      setSettingsData(data);
    };

    loadData();
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
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavClick('accueil')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={logo} 
                  alt={companyName}
                  className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                />
              </div>
              <span className="text-[#08295f] font-bold text-lg lg:text-xl group-hover:text-[#37bdf8] transition-colors duration-300 whitespace-nowrap">
                {companyName}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-1 bg-gray-50 rounded-full p-2 border border-gray-200">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                    activeSection === item.id
                      ? 'bg-[#37bdf8] text-white shadow-lg scale-105'
                      : 'text-[#08295f] hover:text-[#37bdf8] hover:bg-white hover:shadow-md'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 bg-[#37bdf8] rounded-full animate-pulse opacity-20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#08295f] p-2 hover:text-[#37bdf8] transition-colors duration-300 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-[#37bdf8] text-white shadow-lg'
                      : 'text-[#08295f] hover:bg-gray-50 hover:text-[#37bdf8]'
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