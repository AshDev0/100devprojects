import { useEffect } from 'react';

function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | 100 Dev Projects";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for 100devprojects.in - Learn how we collect, use, and protect your data.');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="text-gray-600 mb-8">
        <strong>Effective Date:</strong> January 3, 2026<br />
        <strong>Last Updated:</strong> January 3, 2026
      </p>

      <div className="prose prose-lg max-w-none">

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to <strong>100 Dev Projects</strong> ("we," "our," or "us"). We are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
            <a href="https://100devprojects.in" className="text-blue-600 hover:underline"> https://100devprojects.in</a>
            {' '}(the "Site").
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            By using our Site, you agree to the collection and use of information in accordance with this Privacy Policy.
            If you do not agree with our policies and practices, please do not use our Site.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
          <p className="text-gray-700 leading-relaxed">
            We currently <strong>do not require user registration</strong> or collect personal information such as names,
            email addresses, or payment details. However, if we introduce contact forms or newsletter subscriptions in the future,
            we may collect information you voluntarily provide.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
          <p className="text-gray-700 leading-relaxed">
            When you visit our Site, we may automatically collect certain information, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li><strong>Browser Data:</strong> Browser type, version, and settings</li>
            <li><strong>Device Information:</strong> Device type, operating system, screen resolution</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, referring URLs</li>
            <li><strong>IP Address:</strong> Your IP address for analytics and security purposes</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our Site and store certain information.
            Cookies are small data files stored on your device. We use:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for basic site functionality (e.g., theme preferences)</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics to understand user behavior and improve our Site</li>
            <li><strong>Advertising Cookies:</strong> Google AdSense to display relevant ads (if implemented)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However,
            some features of our Site may not function properly without cookies.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li><strong>To Operate and Maintain the Site:</strong> Ensure the Site functions correctly</li>
            <li><strong>To Improve User Experience:</strong> Analyze usage patterns and optimize content</li>
            <li><strong>To Monitor Performance:</strong> Track site analytics via Google Analytics</li>
            <li><strong>To Display Advertisements:</strong> Serve personalized ads via Google AdSense (if applicable)</li>
            <li><strong>To Ensure Security:</strong> Detect and prevent fraudulent activity</li>
            <li><strong>To Comply with Legal Obligations:</strong> Respond to legal requests and prevent misuse</li>
          </ul>
        </section>

        {/* Third-Party Services */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Google Analytics</h3>
          <p className="text-gray-700 leading-relaxed">
            We use <strong>Google Analytics</strong> to analyze how users interact with our Site. Google Analytics collects
            information such as pages visited, session duration, and geographic location. This data is used to improve our content
            and user experience.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Google Analytics Privacy Policy:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://policies.google.com/privacy
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Google AdSense (If Applicable)</h3>
          <p className="text-gray-700 leading-relaxed">
            We may use <strong>Google AdSense</strong> to display ads on our Site. Google AdSense uses cookies to serve ads based on
            your prior visits to our Site or other websites. You can opt out of personalized advertising by visiting
            Google's Ads Settings.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Google AdSense Privacy Policy:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 OpenWeather API</h3>
          <p className="text-gray-700 leading-relaxed">
            Our Weather App demo uses the <strong>OpenWeather API</strong> to fetch weather data. When you use this feature,
            your search queries and geolocation (if permitted) may be sent to OpenWeather's servers.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            OpenWeather Privacy Policy:{' '}
            <a
              href="https://openweather.co.uk/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://openweather.co.uk/privacy-policy
            </a>
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 External Links</h3>
          <p className="text-gray-700 leading-relaxed">
            Our Site contains links to external websites (e.g., GitHub repositories). We are not responsible for the privacy
            practices of these third-party sites. We encourage you to review their privacy policies.
          </p>
        </section>

        {/* Data Storage and Security */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Security</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.1 LocalStorage</h3>
          <p className="text-gray-700 leading-relaxed">
            Some of our demo projects (e.g., Todo App, BMI Calculator) use <strong>browser localStorage</strong> to save your
            data locally on your device. This data is <strong>never transmitted to our servers</strong> and remains on your device
            unless you clear your browser data.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Security Measures</h3>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures to protect your information. However, no method of transmission
            over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee
            absolute security.
          </p>
        </section>

        {/* Your Rights and Choices */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li>
              <strong>Cookie Management:</strong> You can disable cookies in your browser settings. Note that some features may not work properly without cookies.
            </li>
            <li>
              <strong>Opt-Out of Personalized Ads:</strong> Visit{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Ads Settings
              </a>
              {' '}to opt out of personalized advertising.
            </li>
            <li>
              <strong>Clear LocalStorage Data:</strong> You can clear localStorage data stored by our demos via your browser's developer tools.
            </li>
            <li>
              <strong>Do Not Track (DNT):</strong> We currently do not respond to DNT signals, but we respect your privacy choices through cookie settings.
            </li>
          </ul>
        </section>

        {/* Children's Privacy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from
            children under 13. If you are a parent or guardian and believe your child has provided us with personal information,
            please contact us, and we will delete such information.
          </p>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
            "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
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

        {/* GDPR Compliance */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. GDPR Compliance (For EU Users)</h2>
          <p className="text-gray-700 leading-relaxed">
            If you are located in the European Economic Area (EEA), you have certain data protection rights under the
            General Data Protection Regulation (GDPR):
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-2">
            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
            <li><strong>Right to Object:</strong> Object to data processing for marketing purposes</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            To exercise any of these rights, please contact us using the information provided above.
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

export default PrivacyPolicy;
