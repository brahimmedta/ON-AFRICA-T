import React, { useEffect, useState } from 'react';
import { User, Shield, Settings, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const AdminLogin = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    // Check if Netlify Identity script is loaded
    const checkNetlifyIdentity = () => {
      if (window.netlifyIdentity) {
        initializeNetlifyIdentity();
      } else {
        // If not loaded, try again after a short delay
        setTimeout(checkNetlifyIdentity, 100);
      }
    };

    const initializeNetlifyIdentity = () => {
      try {
        window.netlifyIdentity.init();
        
        // Check if user is already logged in
        const currentUser = window.netlifyIdentity.currentUser();
        setUser(currentUser);
        setIsLoading(false);

        // Listen for login events
        window.netlifyIdentity.on('login', (user: any) => {
          setUser(user);
          setError('');
          setSuccess('تم تسجيل الدخول بنجاح! جاري التوجيه...');
          window.netlifyIdentity.close();
          // Redirect to admin after successful login
          setTimeout(() => {
            window.location.href = '/admin/';
          }, 1500);
        });

        // Listen for logout events
        window.netlifyIdentity.on('logout', () => {
          setUser(null);
          setSuccess('تم تسجيل الخروج بنجاح');
          setError('');
        });

        // Listen for signup events
        window.netlifyIdentity.on('signup', (user: any) => {
          setUser(user);
          setError('');
          setSuccess('تم إنشاء الحساب بنجاح! جاري التوجيه...');
          window.netlifyIdentity.close();
          // Redirect to admin after successful signup
          setTimeout(() => {
            window.location.href = '/admin/';
          }, 1500);
        });

        // Listen for error events
        window.netlifyIdentity.on('error', (err: any) => {
          setError('حدث خطأ: ' + (err.message || 'خطأ غير معروف'));
          setIsLoading(false);
        });

      } catch (err) {
        console.error('Error initializing Netlify Identity:', err);
        setError('خطأ في تحميل نظام المصادقة');
        setIsLoading(false);
      }
    };

    checkNetlifyIdentity();
  }, []);

  const handleLogin = () => {
    try {
      if (window.netlifyIdentity) {
        setError('');
        window.netlifyIdentity.open('login');
      } else {
        setError('نظام المصادقة غير متاح حالياً');
      }
    } catch (err) {
      setError('خطأ في فتح نافذة تسجيل الدخول');
    }
  };

  const handleSignup = () => {
    try {
      if (window.netlifyIdentity) {
        setError('');
        window.netlifyIdentity.open('signup');
      } else {
        setError('نظام المصادقة غير متاح حالياً');
      }
    } catch (err) {
      setError('خطأ في فتح نافذة إنشاء الحساب');
    }
  };

  const handleLogout = () => {
    try {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.logout();
      }
    } catch (err) {
      setError('خطأ في تسجيل الخروج');
    }
  };

  const goToAdmin = () => {
    window.location.href = '/admin/';
  };

  const goHome = () => {
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08295f] via-blue-800 to-[#08295f] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Back to Home Button */}
        <button
          onClick={goHome}
          className="absolute top-4 left-4 p-2 text-gray-400 hover:text-[#08295f] transition-colors duration-300 transform hover:scale-110"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#08295f] to-[#37bdf8] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#08295f] mb-2">
            لوحة الإدارة
          </h2>
          <p className="text-gray-600">
            الدخول إلى نظام إدارة المحتوى
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 text-sm">{success}</p>
          </div>
        )}

        {user ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-green-800 font-medium">مرحباً:</p>
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
                <span>دخول لوحة الإدارة</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#08295f] to-[#37bdf8] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#37bdf8] hover:to-[#08295f] transition-all duration-300 transform hover:scale-105"
            >
              تسجيل الدخول
            </button>

            <button
              onClick={handleSignup}
              className="w-full bg-white border-2 border-[#37bdf8] text-[#37bdf8] py-3 px-4 rounded-xl font-semibold hover:bg-[#37bdf8] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              إنشاء حساب جديد
            </button>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">معلومات مهمة:</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• يمكن للمدراء المعتمدين فقط الوصول</li>
                <li>• ستحتاج إلى تأكيد البريد الإلكتروني</li>
                <li>• يمكنك إدارة جميع محتويات الموقع</li>
              </ul>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              للحصول على صلاحيات الإدارة، يرجى التواصل مع مدير النظام
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;