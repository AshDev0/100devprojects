import { useEffect } from 'react';

/**
 * useSchema - Injects JSON-LD structured data into <head>
 * Automatically cleans up on component unmount / schema change.
 *
 * @param {Object|Object[]} schemas - Single schema object or array of schema objects
 *
 * Usage:
 *   useSchema({ "@type": "Article", ... })
 *   useSchema([{ "@type": "Article", ... }, { "@type": "BreadcrumbList", ... }])
 */
export const useSchema = (schemas) => {
  useEffect(() => {
    if (!schemas) return;

    const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
    const scripts = [];

    schemaArray.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({ "@context": "https://schema.org", ...schema });
      document.head.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [schemas]);
};
