import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Fan as Fax } from 'lucide-react';
import { useDataLoader } from '../utils/dataLoader';

interface Settings {
  company_name: string;
  logo: string;
  phone: string;
  whatsapp: string;
  fax: string;
  email: string;
  bp: string;
  address: string;
}

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const { data: settings, loading, error } = useDataLoader<Settings>('data/settings.json');

  if (loading) {
    return (
      <footer className="bg-gradient-to-br from-[#08295f] via-blue-900 to-[#08295f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-gradient-to-br from-[#08295f] via-blue-900 to-[#08295f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Erreur de chargement des données: {error}</p>
          </div>
        </div>
      </footer>
    );
  }

  if (!settings) {
    return null;
  }

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'presentation', label: 'Présentation' },
    { id: 'directeur', label: 'Le mot du directeur' },
    { id: 'services', label: 'Nos services' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'partenaires', label: 'Nos partenaires' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-[#08295f] via-blue-900 to-[#08295f] text-white py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#37bdf8]/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-6 animate-fadeInUp">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#37bdf8] to-white rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <img 
                  src={settings.logo} 
                  alt={settings.company_name}
                  className="h-8 w-8 object-contain filter brightness-0"
                />
              </div>
              <h3 className="text-2xl font-bold transform hover:scale-105 transition-transform duration-300">
                {settings.company_name}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed transform hover:scale-105 transition-transform duration-300">
              Société spécialisée dans la construction, travaux publics et logistique en Mauritanie et en Afrique.
            </p>
            <p className="text-sm text-gray-400">
              Fondée en 2009 • BP: {settings.bp}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-fadeInUp delay-300">
            <h3 className="text-xl font-bold mb-4 transform hover:scale-105 transition-transform duration-300">Contact</h3>
            <div className="space-y-4">
              <a href={`tel:${settings.phone}`} className="flex items-center group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300">
                <Phone className="h-5 w-5 mr-3 text-[#37bdf8] group-hover:animate-bounce" />
                <span className="group-hover:text-[#37bdf8] transition-colors duration-300">{settings.phone}</span>
              </a>
              
              <a 
                href={`https://wa.me/${settings.whatsapp.replace(/\s+/g, '')}`} 
                className="flex items-center group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-3 text-green-400 group-hover:animate-bounce" />
                <span className="group-hover:text-green-400 transition-colors duration-300">{settings.whatsapp}</span>
              </a>
              
              <a href={`tel:${settings.fax}`} className="flex items-center group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300">
                <Fax className="h-5 w-5 mr-3 text-yellow-400 group-hover:animate-bounce" />
                <span className="group-hover:text-yellow-400 transition-colors duration-300">{settings.fax}</span>
              </a>
              
              <a href={`mailto:${settings.email}`} className="flex items-center group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300">
                <Mail className="h-5 w-5 mr-3 text-red-400 group-hover:animate-bounce" />
                <span className="group-hover:text-red-400 transition-colors duration-300">{settings.email}</span>
              </a>
              
              <div className="flex items-start group hover:bg-white/10 rounded-lg p-2 -m-2 transition-all duration-300">
                <MapPin className="h-5 w-5 mr-3 text-[#37bdf8] mt-1 group-hover:animate-bounce" />
                <span className="text-gray-300 group-hover:text-[#37bdf8] transition-colors duration-300">{settings.address}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 animate-fadeInUp delay-500">
            <h3 className="text-xl font-bold mb-4 transform hover:scale-105 transition-transform duration-300">Navigation</h3>
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="text-left text-gray-300 hover:text-[#37bdf8] transition-colors duration-300 transform hover:scale-105 hover:translate-x-2 py-1"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center animate-fadeInUp delay-700">
          <p className="text-gray-400 transform hover:scale-105 transition-transform duration-300">
            © 2025 {settings.company_name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;