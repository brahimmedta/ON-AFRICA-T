import React, { useEffect, useState } from 'react';
import { User, Shield, Settings, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Home } from 'lucide-react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const AdminLogin = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Initialize Netlify Identity
    if (window.netlifyIdentity) {
      window.netlifyIdentity.init();
      
      // Check if user is already logged in
      const currentUser = window.netlifyIdentity.currentUser();
      setUser(currentUser);
      setIsLoading(false);

      // Listen for login events
      window.netlifyIdentity.on('login', (user: any) => {
        console.log('User logged in:', user);
        setUser(user);
        setError('');
        window.netlifyIdentity.close();
        
        // Redirect to admin after successful login
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = '/admin/';
        }, 1500);
      });

      // Listen for logout events
      window.netlifyIdentity.on('logout', () => {
        console.log('User logged out');
        setUser(null);
        setError('');
      });

      // Listen for signup events
      window.netlifyIdentity.on('signup', (user: any) => {
        console.log('User signed up:', user);
        setUser(user);
        setError('');
        window.netlifyIdentity.close();
        
        // Redirect to admin after successful signup
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = '/admin/';
        }, 1500);
      });

      // Listen for error events
      window.netlifyIdentity.on('error', (err: any) => {
        console.error('Netlify Identity error:', err);
        setError('Erreur de connexion. Veuillez réessayer.');
        setIsLoading(false);
      });

    } else {
      // If Netlify Identity is not available, show error after timeout
      setTimeout(() => {
        if (!window.netlifyIdentity) {
          setError('Service d\'authentification non disponible');
          setIsLoading(false);
        }
      }, 3000);
    }
  }, []);

  const handleLogin = () => {
    if (window.netlifyIdentity) {
      setError('');
      window.netlifyIdentity.open('login');
    } else {
      setError('Service d\'authentification non disponible');
    }
  };

  const handleSignup = () => {
    if (window.netlifyIdentity) {
      setError('');
      window.netlifyIdentity.open('signup');
    } else {
      setError('Service d\'authentification non disponible');
    }
  };

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const goToAdmin = () => {
    setIsRedirecting(true);
    window.location.href = '/admin/';
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37bdf8] mx-auto mb-4"></div>
          <p className="text-gray-600">Initialisation du système d'authentification...</p>
        </div>
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Success animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 animate-pulse"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#08295f] mb-2">
              Connexion Réussie!
            </h2>
            <p className="text-gray-600 mb-4">
              Redirection vers le panneau d'administration...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#37bdf8] mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#37bdf8]/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#08295f] mb-2">
            Administration
          </h2>
          <p className="text-gray-600">
            Accès au panneau de gestion du contenu
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 mb-6">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {user ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-medium">Connecté en tant que:</p>
                  <p className="text-green-600 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={goToAdmin}
                className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Settings className="h-5 w-5" />
                <span>Accéder au CMS</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Shield className="h-5 w-5" />
              <span>Se connecter</span>
            </button>

            <button
              onClick={handleSignup}
              className="w-full bg-white border-2 border-[#37bdf8] text-[#37bdf8] py-3 px-4 rounded-xl font-semibold hover:bg-[#37bdf8] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Créer un compte</span>
            </button>

            <button
              onClick={goToHome}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Retour au site</span>
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-xs text-blue-600 text-center leading-relaxed">
                <strong>🔐 Sécurité :</strong> Seuls les utilisateurs autorisés peuvent accéder au panneau d'administration. 
                Toutes les tentatives de connexion sont enregistrées et surveillées.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              Système de gestion de contenu sécurisé
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <span>Powered by</span>
              <span className="font-semibold text-[#37bdf8]">Netlify Identity</span>
              <span>&</span>
              <span className="font-semibold text-[#37bdf8]">Netlify CMS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;