import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useDataLoader } from '../utils/dataLoader';

interface Settings {
  company: {
    name: string;
    description: string;
    founded: string;
    bp: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  social: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer: React.FC = () => {
  const { data: settings, loading, error } = useDataLoader<Settings>('data/settings.json');

  if (loading) {
    return (
      <footer className="bg-gray-900 text-white py-12">
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
      <footer className="bg-gray-900 text-white py-12">
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

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{settings.company.name}</h3>
            <p className="text-gray-300 mb-4">{settings.company.description}</p>
            <p className="text-sm text-gray-400">
              Fondée en {settings.company.founded}
            </p>
            <p className="text-sm text-gray-400">
              BP: {settings.company.bp}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400" />
                <a href={`tel:${settings.contact.phone}`} className="hover:text-blue-400 transition-colors">
                  {settings.contact.phone}
                </a>
              </div>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-3 text-green-400" />
                <a 
                  href={`https://wa.me/${settings.contact.whatsapp.replace(/\s+/g, '')}`} 
                  className="hover:text-green-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {settings.contact.whatsapp}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-red-400" />
                <a href={`mailto:${settings.contact.email}`} className="hover:text-red-400 transition-colors">
                  {settings.contact.email}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-yellow-400 mt-1" />
                <span className="text-gray-300">{settings.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Construction de bâtiments</li>
              <li>Travaux de terrassement</li>
              <li>Aménagements agricoles</li>
              <li>Adduction d'eau potable</li>
              <li>Logistique et transport</li>
              <li>Location d'engins lourds</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 {settings.company.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;