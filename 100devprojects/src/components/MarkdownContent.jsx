const MarkdownContent = ({ content }) => {
  // Parse markdown content into structured elements
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentCodeBlock = null;
    let currentCodeLang = '';
    let currentList = null;
    let currentListType = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (currentCodeBlock === null) {
          // Start code block
          currentCodeLang = line.trim().substring(3) || 'javascript';
          currentCodeBlock = [];
        } else {
          // End code block
          elements.push({
            type: 'code',
            lang: currentCodeLang,
            content: currentCodeBlock.join('\n')
          });
          currentCodeBlock = null;
          currentCodeLang = '';
        }
        continue;
      }

      if (currentCodeBlock !== null) {
        currentCodeBlock.push(line);
        continue;
      }

      // Handle headings
      if (line.trim().startsWith('#')) {
        // Close any open list
        if (currentList && currentList.length > 0) {
          elements.push({ type: currentListType, items: currentList });
          currentList = null;
          currentListType = null;
        }

        const match = line.match(/^(#+)\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          elements.push({ type: 'heading', level, text });
        }
        continue;
      }

      // Handle unordered lists
      if (line.trim().match(/^[-*✓✅❌]\s+/)) {
        const text = line.trim().replace(/^[-*✓✅❌]\s+/, '');
        if (currentListType !== 'ul') {
          if (currentList && currentList.length > 0) {
            elements.push({ type: currentListType, items: currentList });
          }
          currentList = [];
          currentListType = 'ul';
        }
        if (currentList) {
          currentList.push(text);
        }
        continue;
      }

      // Handle ordered lists
      if (line.trim().match(/^\d+\.\s+/)) {
        const text = line.trim().replace(/^\d+\.\s+/, '');
        if (currentListType !== 'ol') {
          if (currentList && currentList.length > 0) {
            elements.push({ type: currentListType, items: currentList });
          }
          currentList = [];
          currentListType = 'ol';
        }
        if (currentList) {
          currentList.push(text);
        }
        continue;
      }

      // Close list if we hit a non-list line
      if (currentList && currentList.length > 0 && line.trim() !== '') {
        elements.push({ type: currentListType, items: currentList });
        currentList = null;
        currentListType = null;
      }

      // Handle paragraphs
      if (line.trim()) {
        elements.push({ type: 'paragraph', text: line.trim() });
      } else if (line.trim() === '' && elements.length > 0) {
        // Add spacing between sections
        const lastElement = elements[elements.length - 1];
        if (lastElement.type !== 'space') {
          elements.push({ type: 'space' });
        }
      }
    }

    // Close any remaining list
    if (currentList && currentList.length > 0) {
      elements.push({ type: currentListType, items: currentList });
    }

    return elements;
  };

  // Format inline markdown (bold, italic, code, links)
  const formatInline = (text) => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');

    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-sm font-mono">$1</code>');

    // Links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:underline font-medium">$1</a>');

    return text;
  };

  const elements = parseMarkdown(content);

  return (
    <div className="blog-content">
      {elements.map((element, index) => {
        switch (element.type) {
          case 'heading': {
            const HeadingTag = `h${element.level}`;
            const headingClasses = {
              1: 'text-3xl font-bold text-gray-900 mb-4 mt-8 pb-2 border-b-2 border-gray-200',
              2: 'text-2xl font-bold text-gray-900 mb-3 mt-8',
              3: 'text-xl font-semibold text-gray-900 mb-2 mt-6',
              4: 'text-lg font-semibold text-gray-800 mb-2 mt-4'
            };
            return (
              <HeadingTag
                key={index}
                className={headingClasses[element.level] || headingClasses[4]}
                dangerouslySetInnerHTML={{ __html: formatInline(element.text) }}
              />
            );
          }

          case 'paragraph':
            return (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-4 text-base"
                dangerouslySetInnerHTML={{ __html: formatInline(element.text) }}
              />
            );

          case 'code':
            return (
              <div key={index} className="my-6 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <span className="text-gray-300 text-sm font-mono">{element.lang}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(element.content)}
                    className="text-gray-400 hover:text-white text-xs px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="bg-gray-900 p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-gray-100 leading-relaxed">
                    {element.content}
                  </code>
                </pre>
              </div>
            );

          case 'ul':
            return (
              <ul key={index} className="space-y-2 my-4 ml-6">
                {element.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={index} className="space-y-2 my-4 ml-6 list-decimal list-inside">
                {element.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-gray-700 pl-2"
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                  />
                ))}
              </ol>
            );

          case 'space':
            return <div key={index} className="h-2" />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default MarkdownContent;
