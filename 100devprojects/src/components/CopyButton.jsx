'use client';

import { useState } from 'react';

// Small client island so MarkdownContent can stay a Server Component
// (keeps long blog bodies out of the client JS bundle).
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — fail silently
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-gray-400 hover:text-white text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
      aria-label="Copy code to clipboard"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;
