import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Blog from './pages/Blog';
import ProjectDetail from './pages/ProjectDetail';
import BlogDetail from './pages/BlogDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ServerError from './pages/ServerError';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="grow">
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