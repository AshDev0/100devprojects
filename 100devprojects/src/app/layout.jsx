import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import BackToTop from '../components/BackToTop';
import JsonLd from '../components/JsonLd';
import { SITE_URL, SITE_NAME, GA_ID, DEFAULT_OG_IMAGE, organizationSchema, websiteSchema } from '../lib/site';
import './globals.css';

// Site-wide defaults. Each page overrides title/description/canonical via its own metadata.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Learn by Building Real Projects | 100 Dev Projects',
    template: '%s',
  },
  description: 'Learn JavaScript, React and Web Development by building real-world beginner to advanced projects.',
  applicationName: SITE_NAME,
  authors: [{ name: 'Ashwani', url: `${SITE_URL}/about` }],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  verification: { google: 'QCeZ-egdmX1eJER1oF_QrWd8EJ_WEDtWCUkUZEz4rD8' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[websiteSchema, organizationSchema]} />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow">{children}</main>
          <Footer />
          <CookieConsent />
          <BackToTop />
        </div>

        {/* Google Analytics 4 — afterInteractive keeps it off the critical rendering path */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
