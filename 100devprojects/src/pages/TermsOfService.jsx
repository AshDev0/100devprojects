import { useEffect } from 'react';

function TermsOfService() {
  useEffect(() => {
    document.title = "Terms of Service | 100 Dev Projects";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terms of Service for 100devprojects.in - Learn about the rules and guidelines for using our educational platform.');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <p className="text-gray-600 mb-8">
        <strong>Effective Date:</strong> January 3, 2026<br />
        <strong>Last Updated:</strong> January 3, 2026
      </p>

      <div className="prose prose-lg max-w-none">

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to <strong>100 Dev Projects</strong>. By accessing or using our website at
            <a href="https://100devprojects.in" className="text-blue-600 hover:underline"> https://100devprojects.in</a>
            {' '}(the "Site"), you agree to comply with and be bound by these Terms of Service ("Terms").
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            If you <strong>do not agree</strong> to these Terms, please do not use our Site. We reserve the right to modify
            these Terms at any time, and such modifications will be effective immediately upon posting.
          </p>
        </section>

        {/* Use of the Site */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of the Site</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Educational Purpose</h3>
          <p className="text-gray-700 leading-relaxed">
            100 Dev Projects is an <strong>educational platform</strong> designed to help developers learn web development
            by building real-world projects. All content, tutorials, and project demos are provided for educational purposes only.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Eligibility</h3>
          <p className="text-gray-700 leading-relaxed">
            You must be at least <strong>13 years of age</strong> to use this Site. By using the Site, you represent and warrant
            that you meet this age requirement. If you are under 13, you may not use the Site.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Permitted Use</h3>
          <p className="text-gray-700 leading-relaxed">
            You are granted a limited, non-exclusive, non-transferable license to access and use the Site for personal,
            non-commercial, educational purposes. You agree to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>Use the Site only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to any part of the Site</li>
            <li>Not interfere with or disrupt the Site's functionality</li>
            <li>Not use automated bots or scrapers without permission</li>
            <li>Not reproduce, distribute, or modify Site content without attribution</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property Rights</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Site Content Ownership</h3>
          <p className="text-gray-700 leading-relaxed">
            All content on this Site, including but not limited to text, graphics, code, tutorials, images, logos, and project demos,
            is the property of <strong>100 Dev Projects</strong> or its content creators and is protected by copyright,
            trademark, and other intellectual property laws.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Open Source Project Code</h3>
          <p className="text-gray-700 leading-relaxed">
            All project source code is <strong>open source</strong> and available on our{' '}
            <a
              href="https://github.com/AshDev0/100devprojects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub repository
            </a>.
            You are free to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>Use the code for learning purposes</li>
            <li>Modify and adapt the code for your own projects</li>
            <li>Include it in your portfolio (with proper attribution)</li>
            <li>Share and distribute the code (with attribution)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            <strong>Attribution Requirement:</strong> If you use our project code in your portfolio, blog, or commercial work,
            please provide credit by linking back to{' '}
            <a href="https://100devprojects.in" className="text-blue-600 hover:underline">
              https://100devprojects.in
            </a>.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Prohibited Uses</h3>
          <p className="text-gray-700 leading-relaxed">
            You may <strong>not</strong>:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>Sell or resell our tutorials, blog posts, or project demos as your own</li>
            <li>Claim ownership of our original content</li>
            <li>Use our branding, logo, or name without permission</li>
            <li>Create a competing educational platform using our content</li>
          </ul>
        </section>

        {/* User-Generated Content */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User-Generated Content (Future Feature)</h2>
          <p className="text-gray-700 leading-relaxed">
            Currently, we <strong>do not allow user-generated content</strong> (comments, uploads, etc.). If we introduce such
            features in the future, you agree that:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>You retain ownership of any content you submit</li>
            <li>You grant us a non-exclusive license to use, display, and distribute your content</li>
            <li>Your content must not violate any laws or third-party rights</li>
            <li>We reserve the right to remove any content that violates our policies</li>
          </ul>
        </section>

        {/* Third-Party Links and Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Third-Party Links and Services</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Site contains links to third-party websites and services, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li><strong>GitHub:</strong> Project source code repositories</li>
            <li><strong>OpenWeather API:</strong> Weather data for our Weather App demo</li>
            <li><strong>Google Analytics & AdSense:</strong> Analytics and advertising services</li>
            <li><strong>Font Awesome:</strong> Icons used in projects</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We are <strong>not responsible</strong> for the content, privacy policies, or practices of these third-party services.
            Your use of third-party services is at your own risk.
          </p>
        </section>

        {/* Disclaimers and Limitations of Liability */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Disclaimers and Limitations of Liability</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 "As Is" Basis</h3>
          <p className="text-gray-700 leading-relaxed">
            The Site and all content are provided <strong>"as is"</strong> and <strong>"as available"</strong> without any
            warranties of any kind, either express or implied. We do not guarantee that:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>The Site will be uninterrupted, secure, or error-free</li>
            <li>The content is accurate, complete, or up-to-date</li>
            <li>Any defects or errors will be corrected</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Educational Content Disclaimer</h3>
          <p className="text-gray-700 leading-relaxed">
            Our tutorials and project demos are for <strong>educational purposes only</strong>. While we strive for accuracy,
            we do not guarantee that the code is production-ready or free of bugs. Always test and review code before using it
            in production environments.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Limitation of Liability</h3>
          <p className="text-gray-700 leading-relaxed">
            To the fullest extent permitted by law, <strong>100 Dev Projects</strong>, its creators, and contributors shall
            <strong> not be liable</strong> for any:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>Direct, indirect, incidental, or consequential damages</li>
            <li>Loss of data, profits, or business opportunities</li>
            <li>Damages arising from use or inability to use the Site</li>
            <li>Issues arising from third-party services (APIs, external links)</li>
          </ul>
        </section>

        {/* API Usage and External Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. API Usage and Rate Limits</h2>
          <p className="text-gray-700 leading-relaxed">
            Some of our project demos (e.g., Weather App) use <strong>third-party APIs</strong> with rate limits. If you use
            these demos excessively or for malicious purposes, your access may be restricted. We are not responsible for API
            downtime or service interruptions.
          </p>
        </section>

        {/* Advertising */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Advertising</h2>
          <p className="text-gray-700 leading-relaxed">
            We may display advertisements on our Site through <strong>Google AdSense</strong> or other ad networks. We do not
            endorse any products or services advertised on the Site. Clicking on ads is done at your own risk.
          </p>
        </section>

        {/* Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            Your use of the Site is also governed by our{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>, which explains how we collect, use, and protect your data. Please review our Privacy Policy to understand
            our data practices.
          </p>
        </section>

        {/* Termination */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to terminate or suspend access to our Site immediately, without prior notice or liability,
            for any reason, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>Violation of these Terms</li>
            <li>Fraudulent, abusive, or illegal activity</li>
            <li>Automated scraping or bot usage</li>
          </ul>
        </section>

        {/* Governing Law */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>, without
            regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be
            subject to the exclusive jurisdiction of the courts in India.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to These Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. If we make material changes, we will update the
            "Last Updated" date at the top of this page. Your continued use of the Site after any changes constitutes acceptance
            of the new Terms.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p className="text-gray-800">
              <strong>Website:</strong>{' '}
              <a href="https://100devprojects.in" className="text-blue-600 hover:underline">
                https://100devprojects.in
              </a>
            </p>
            <p className="text-gray-800 mt-2">
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@100devprojects.in" className="text-blue-600 hover:underline">
                contact@100devprojects.in
              </a>
            </p>
            <p className="text-gray-800 mt-2">
              <strong>GitHub:</strong>{' '}
              <a
                href="https://github.com/AshDev0/100devprojects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://github.com/AshDev0/100devprojects
              </a>
            </p>
          </div>
        </section>

        {/* Severability */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Severability</h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue
            in full force and effect.
          </p>
        </section>

        {/* Entire Agreement */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Entire Agreement</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and 100 Dev Projects
            regarding the use of the Site and supersede any prior agreements.
          </p>
        </section>

      </div>

      {/* Back to Home */}
      <div className="mt-12 text-center">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default TermsOfService;
