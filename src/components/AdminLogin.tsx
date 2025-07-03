import React, { useEffect, useState } from 'react';
import { User, Shield, Settings } from 'lucide-react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const AdminLogin = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setUser(user);
        window.netlifyIdentity.close();
        // Redirect to admin after successful login
        setTimeout(() => {
          window.location.href = '/admin/';
        }, 1000);
      });

      // Listen for logout events
      window.netlifyIdentity.on('logout', () => {
        setUser(null);
      });

      // Listen for signup events
      window.netlifyIdentity.on('signup', (user: any) => {
        setUser(user);
        window.netlifyIdentity.close();
        // Redirect to admin after successful signup
        setTimeout(() => {
          window.location.href = '/admin/';
        }, 1000);
      });
    }
  }, []);

  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('login');
    }
  };

  const handleSignup = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open('signup');
    }
  };

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const goToAdmin = () => {
    window.location.href = '/admin/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#37bdf8]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#08295f] mb-2">
            Administration
          </h2>
          <p className="text-gray-600">
            Accès au panneau de gestion du contenu
          </p>
        </div>

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
              className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105"
            >
              Se connecter
            </button>

            <button
              onClick={handleSignup}
              className="w-full bg-white border-2 border-[#37bdf8] text-[#37bdf8] py-3 px-4 rounded-xl font-semibold hover:bg-[#37bdf8] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Créer un compte
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Seuls les utilisateurs autorisés peuvent accéder au panneau d'administration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;