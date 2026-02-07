import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">100 Dev Projects</h3>
            <p className="text-gray-400">
              Learn by building real-world projects. Curated collection of 100+ developer projects.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/AshDev0/100devprojects/tree/main/100devprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} 100 Dev Projects. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
