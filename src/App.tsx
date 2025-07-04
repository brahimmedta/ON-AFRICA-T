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
import AdminLogin from './components/AdminLogin';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');

  // Check if we're on the admin login page
  if (window.location.pathname === '/admin-login') {
    return <AdminLogin />;
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