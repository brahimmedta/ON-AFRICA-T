import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import DirectorMessage from './components/DirectorMessage';
import Services from './components/Services';
import Realizations from './components/Realizations';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');

  // Check if we're on any admin route - redirect to Netlify CMS
  if (window.location.pathname === '/admin-login' || window.location.pathname.startsWith('/admin-login/')) {
    // Redirect to the actual Netlify CMS admin interface
    window.location.href = '/admin/';
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37bdf8] mx-auto mb-4"></div>
          <p>Redirection vers le panneau d'administration...</p>
        </div>
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'accueil':
        return <Hero />;
      case 'presentation':
        return <Presentation />;
      case 'directeur':
        return <DirectorMessage />;
      case 'services':
        return <Services />;
      case 'realisations':
        return <Realizations />;
      case 'partenaires':
        return <Partners />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="min-h-screen">
        {renderActiveSection()}
      </main>
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}

export default App;