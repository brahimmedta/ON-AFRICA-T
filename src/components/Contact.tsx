import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Fan as Fax, Building } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+222 28880729',
      href: 'tel:+22228880729'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+34 666 39 63 36',
      href: 'https://wa.me/34666396336'
    },
    {
      icon: Fax,
      label: 'Fax',
      value: '+222 25901252',
      href: 'tel:+22225901252'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'salesonafrica@onafricatp.com',
      href: 'mailto:salesonafrica@onafricatp.com'
    },
    {
      icon: Building,
      label: 'BP',
      value: '06992',
      href: null
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: 'Nouakchott, Mauritanie',
      href: 'https://maps.google.com/?q=Nouakchott,Mauritanie'
    }
  ];

  return (
    <section className="min-h-screen bg-white py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#37bdf8]/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#08295f]/10 rounded-full blur-xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#08295f] mb-8 transform hover:scale-105 transition-transform duration-500">
            Contact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transform hover:scale-105 transition-transform duration-300">
            Prêt à démarrer votre projet ? Notre équipe est à votre disposition 
            pour discuter de vos besoins et vous proposer des solutions adaptées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold text-[#08295f] mb-6">
                Nos Coordonnées
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <div className="flex items-center space-x-4 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-xl flex items-center justify-center group-hover:from-[#37bdf8] group-hover:to-[#08295f] transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                        <IconComponent className="h-6 w-6 text-white group-hover:animate-bounce" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">
                          {info.label}
                        </p>
                        <p className="text-[#08295f] text-lg font-semibold group-hover:text-[#37bdf8] transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a
                      key={index}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block hover:bg-gray-100 rounded-xl p-4 -m-4 transition-all duration-300 transform hover:scale-105"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index} className="p-4 -m-4">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl animate-fadeInUp delay-300">
              <h3 className="text-2xl font-bold text-[#08295f] mb-4">
                ON AFRICA TP
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Votre partenaire de confiance pour tous vos projets de construction, 
                travaux publics et logistique en Mauritanie et en Afrique.
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-8 animate-fadeInUp delay-500">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold text-[#08295f] mb-6">
                Horaires d'ouverture
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl transform hover:scale-105 transition-transform duration-300">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span className="text-[#08295f] font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl transform hover:scale-105 transition-transform duration-300">
                  <span className="font-medium">Samedi</span>
                  <span className="text-[#08295f] font-semibold">08:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl transform hover:scale-105 transition-transform duration-300">
                  <span className="font-medium">Dimanche</span>
                  <span className="text-red-500 font-semibold">Fermé</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-xl animate-fadeInUp delay-700">
              <h3 className="text-2xl font-bold text-[#08295f] mb-4">
                Engagement Qualité
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nous nous engageons à répondre à toutes vos demandes dans les plus brefs délais 
                et à vous fournir des solutions adaptées à vos besoins spécifiques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;