import React, { useEffect, useState } from 'react';
import { Shield, User, Home, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const Login = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customFormData, setCustomFormData] = useState({ email: '', password: '' });
  const [customFormError, setCustomFormError] = useState('');

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
        setIsLoginLoading(false);
        window.netlifyIdentity.close();
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
        setIsLoginLoading(false);
        window.netlifyIdentity.close();
      });

      // Listen for error events
      window.netlifyIdentity.on('error', (err: any) => {
        console.error('Netlify Identity error:', err);
        setError('Erreur de connexion. Veuillez réessayer.');
        setIsLoginLoading(false);
      });

      // Listen for modal close
      window.netlifyIdentity.on('close', () => {
        setIsLoginLoading(false);
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
      setIsLoginLoading(true);
      window.netlifyIdentity.open('login');
      
      // Fallback timeout
      setTimeout(() => {
        setIsLoginLoading(false);
      }, 10000);
    } else {
      setError('Service d\'authentification non disponible');
      setShowCustomForm(true);
    }
  };

  const handleSignup = () => {
    if (window.netlifyIdentity) {
      setError('');
      setIsLoginLoading(true);
      window.netlifyIdentity.open('signup');
      
      // Fallback timeout
      setTimeout(() => {
        setIsLoginLoading(false);
      }, 10000);
    } else {
      setError('Service d\'authentification non disponible');
    }
  };

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomFormError('');
    
    if (!customFormData.email || !customFormData.password) {
      setCustomFormError('Veuillez remplir tous les champs');
      return;
    }

    try {
      if (!window.netlifyIdentity?.gotrue) {
        throw new Error('Service d\'authentification non disponible');
      }

      const user = await window.netlifyIdentity.gotrue.login(
        customFormData.email, 
        customFormData.password, 
        true
      );
      
      setUser(user);
      setShowCustomForm(false);
      setCustomFormData({ email: '', password: '' });
    } catch (error: any) {
      setCustomFormError('Email ou mot de passe incorrect');
    }
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37bdf8] mx-auto mb-4"></div>
          <p className="text-gray-600">Initialisation du système d'authentification...</p>
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
            {user ? 'Espace Sécurisé' : 'Connexion'}
          </h2>
          <p className="text-gray-600">
            {user ? 'Bienvenue dans votre espace personnel' : 'Accédez à votre espace personnel'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 mb-6">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {user ? (
          // Authenticated state
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-green-800 font-semibold">Connexion réussie!</p>
                  <p className="text-green-600 text-sm">Connecté en tant que:</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      Connecté le {new Date().toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">🎉 Félicitations!</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Vous êtes maintenant connecté à votre espace personnel ON AFRICA TP. 
                Cette zone sécurisée vous donne accès à des fonctionnalités exclusives.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={goToHome}
                className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>Retour au site principal</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        ) : (
          // Unauthenticated state
          <div className="space-y-4">
            {!showCustomForm ? (
              <>
                <button
                  onClick={handleLogin}
                  disabled={isLoginLoading}
                  className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoginLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Se connecter</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSignup}
                  disabled={isLoginLoading}
                  className="w-full bg-white border-2 border-[#37bdf8] text-[#37bdf8] py-3 px-4 rounded-xl font-semibold hover:bg-[#37bdf8] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <User className="h-5 w-5" />
                  <span>Créer un compte</span>
                </button>

                <button
                  onClick={() => setShowCustomForm(true)}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>📝</span>
                  <span>Connexion alternative</span>
                </button>

                <button
                  onClick={goToHome}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Retour au site</span>
                </button>
              </>
            ) : (
              // Custom login form
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-[#08295f] mb-4">
                  Connexion Alternative
                </h3>
                
                <form onSubmit={handleCustomLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customFormData.email}
                      onChange={(e) => setCustomFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37bdf8] focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      value={customFormData.password}
                      onChange={(e) => setCustomFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37bdf8] focus:border-transparent"
                      required
                    />
                  </div>

                  {customFormError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{customFormError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105"
                  >
                    Se connecter
                  </button>
                </form>

                <button
                  onClick={() => setShowCustomForm(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Retour
                </button>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-xs text-blue-600 text-center leading-relaxed">
                <strong>🔐 Sécurité :</strong> Seuls les utilisateurs autorisés peuvent accéder à cet espace. 
                Toutes les tentatives de connexion sont enregistrées et surveillées.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              Système d'authentification sécurisé
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <span>Powered by</span>
              <span className="font-semibold text-[#37bdf8]">Netlify Identity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;