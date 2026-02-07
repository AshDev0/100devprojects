import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a small delay for better UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Here you can initialize analytics or ads if needed
    // Example: initializeGoogleAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
    // Disable analytics/ads if user rejects
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 border-t-2 border-blue-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm md:text-base">
          <p className="mb-2 md:mb-0">
            🍪 We use cookies to improve your experience and analyze site traffic.
            By clicking "Accept", you consent to our use of cookies for analytics and advertising.
            Learn more in our{' '}
            <Link
              to="/privacy-policy"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Privacy Policy
            </Link>.
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm md:text-base"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-semibold text-sm md:text-base"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
