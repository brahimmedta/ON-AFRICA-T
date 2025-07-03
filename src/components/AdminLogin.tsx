import React, { useState } from 'react';
import { User, Shield, Settings, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication simulation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setIsAuthenticated(true);
        setIsLoading(false);
        // Redirect to admin after successful login
        setTimeout(() => {
          window.location.href = '/admin/';
        }, 1500);
      } else {
        setError('Veuillez remplir tous les champs');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Success animation background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#08295f] mb-2">
                Connexion Réussie!
              </h2>
              <p className="text-gray-600">
                Redirection vers le panneau d'administration...
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-green-800 font-medium">Connecté en tant que:</p>
                    <p className="text-green-600 text-sm">{email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/admin/'}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#37bdf8] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                  placeholder="admin@onafricatp.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#37bdf8] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                <span>{isLogin ? 'Se connecter' : 'Créer un compte'}</span>
              </>
            )}
          </button>

          <div className="flex flex-col space-y-3">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#37bdf8] hover:text-[#08295f] transition-colors duration-300 text-sm font-medium"
            >
              {isLogin ? 'Créer un nouveau compte' : 'Déjà un compte ? Se connecter'}
            </button>
            
            <button
              type="button"
              onClick={goToHome}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300 text-sm"
            >
              ← Retour au site principal
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <p className="text-xs text-blue-600 text-center leading-relaxed">
              <strong>Note :</strong> Seuls les utilisateurs autorisés peuvent accéder au panneau d'administration. 
              Pour des raisons de sécurité, toutes les tentatives de connexion sont enregistrées.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;