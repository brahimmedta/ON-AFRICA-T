import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, Shield } from 'lucide-react';
import { loadSingleData, type SettingsData } from '../utils/dataLoader';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const [settingsData, setSettingsData] = useState<SettingsData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadSingleData<SettingsData>('../data/settings.json');
      setSettingsData(data);
    };

    loadData();
  }, []);

  // Default values while loading
  const logo = settingsData?.logo || "https://i.postimg.cc/x8zq9Qvf/2025-06-29-T075316-796.png";
  const companyName = settingsData?.company_name || "ON AFRICA TP";
  const phone = settingsData?.phone || "+222 28880729";
  const whatsapp = settingsData?.whatsapp || "+34 666 39 63 36";
  const fax = settingsData?.fax || "+222 25901252";
  const bp = settingsData?.bp || "06992";

  return (
    <footer className="bg-[#08295f] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fadeInUp">
            <div className="flex items-center space-x-3 group">
              <img 
                src={logo} 
                alt={companyName}
                className="h-10 w-10 transform group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl font-bold group-hover:text-[#37bdf8] transition-colors duration-300">
                {companyName}
              </span>
            </div>
            <p className="text-blue-200 leading-relaxed transform hover:scale-105 transition-transform duration-300">
              Spécialiste en BTP, logistique et travaux publics. Construire l'Afrique de demain, aujourd'hui.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeInUp delay-200">
            <h3 className="text-lg font-bold mb-4 text-[#37bdf8]">Liens rapides</h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveSection('directeur')}
                className="block text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-105"
              >
                Le mot du directeur
              </button>
              <button
                onClick={() => setActiveSection('services')}
                className="block text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-105"
              >
                Nos services
              </button>
              <button
                onClick={() => setActiveSection('realisations')}
                className="block text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-105"
              >
                Réalisations
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className="block text-blue-200 hover:text-white transition-colors duration-200 transform hover:scale-105"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="animate-fadeInUp delay-400">
            <h3 className="text-lg font-bold mb-4 text-[#37bdf8]">Nos services</h3>
            <div className="space-y-2 text-blue-200">
              <p className="transform hover:scale-105 transition-transform duration-300">Construction de bâtiments</p>
              <p className="transform hover:scale-105 transition-transform duration-300">Terrassement et voirie</p>
              <p className="transform hover:scale-105 transition-transform duration-300">Aménagements agricoles</p>
              <p className="transform hover:scale-105 transition-transform duration-300">Logistique et transport</p>
            </div>
          </div>

          {/* Contact */}
          <div className="animate-fadeInUp delay-600">
            <h3 className="text-lg font-bold mb-4 text-[#37bdf8]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                <Phone className="h-4 w-4 text-[#37bdf8]" />
                <span className="text-blue-200">{fax}</span>
              </div>
              <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                <Phone className="h-4 w-4 text-[#37bdf8]" />
                <span className="text-blue-200">{phone}</span>
              </div>
              <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <span className="text-blue-200">{whatsapp}</span>
              </div>
              <div className="text-blue-200 transform hover:scale-105 transition-transform duration-300">
                <p>BP: {bp}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center animate-fadeInUp delay-800">
          <p className="text-blue-200 transform hover:scale-105 transition-transform duration-300 mb-4 md:mb-0">
            © 2025 {companyName}. Tous droits réservés.
          </p>
          
          <a
            href="/admin-login"
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-300 transform hover:scale-105"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm">Administration</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;