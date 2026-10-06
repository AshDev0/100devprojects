// Server-rendered JSON-LD. Escaping "<" prevents a "</script>" inside content
// from breaking out of the tag (XSS-safe for data that contains HTML/code).
const JsonLd = ({ data }) => {
  const items = Array.isArray(data) ? data : [data];
  return items.map((schema, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', ...schema }).replace(/</g, '\\u003c'),
      }}
    />
  ));
};

export default JsonLd;
