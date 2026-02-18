import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import BackToTop from './components/BackToTop';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded pages — each page loads as a separate JS chunk
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const ServerError = lazy(() => import('./pages/ServerError'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow">
            <Suspense fallback={<LoadingSpinner size="lg" text="Loading..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/500" element={<ServerError />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <CookieConsent />
          <BackToTop />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;