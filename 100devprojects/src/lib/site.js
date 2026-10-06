// Central site config + SEO helpers.
// Every page builds its <head> from here so canonicals/OG tags can never drift
// back to the homepage (the root cause of the old "only 1 page indexed" issue).

export const SITE_URL = 'https://100devprojects.in';
export const SITE_NAME = '100 Dev Projects';
export const GA_ID = 'G-B4MHF65TG6';
export const GITHUB_URL = 'https://github.com/AshDev0/100devprojects';

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1536,
  height: 1024,
  alt: '100 Dev Projects - Learn by Building Real Projects',
};

const LOGO_URL = `${SITE_URL}/android-chrome-512x512.png`;

/**
 * Build a Next.js Metadata object for a page.
 * `path` must be the page's own route (e.g. "/blog/my-post") — it becomes the canonical.
 */
export function buildMetadata({ title, description, keywords, path, ogType = 'website', ogImage, publishedTime, noindex = false }) {
  const images = ogImage ? [{ url: ogImage }] : [DEFAULT_OG_IMAGE];

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((img) => img.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ---------- JSON-LD builders (rendered server-side via <JsonLd />) ----------

export const organizationSchema = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
  sameAs: [GITHUB_URL],
  description: 'A platform for learning web development by building real-world JavaScript and React projects.',
};

export const websiteSchema = {
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Master JavaScript, React, and web development by building real-world projects with step-by-step tutorials.',
  publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
};

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function projectSchemas(project) {
  const url = `${SITE_URL}/project/${project.slug}`;
  return [
    {
      '@type': 'LearningResource',
      name: project.title,
      description: project.description,
      url,
      image: project.thumbnail ? `${SITE_URL}${project.thumbnail}` : LOGO_URL,
      educationalLevel: project.difficulty,
      learningResourceType: 'Project',
      teaches: project.learningOutcomes,
      timeRequired: project.estimatedTime,
      keywords: project.tags.join(', '),
      inLanguage: 'en',
      dateCreated: project.dateAdded,
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    breadcrumbSchema([
      { name: 'Home', path: '' },
      { name: 'Projects', path: '/projects' },
      { name: project.shortTitle || project.title, path: `/project/${project.slug}` },
    ]),
  ];
}

export function blogSchemas(blog) {
  const url = `${SITE_URL}/blog/${blog.slug}`;
  const isHindi = /hindi/i.test(blog.slug) || blog.tags?.some((t) => /hindi/i.test(t));

  const article = {
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    url,
    image: LOGO_URL,
    datePublished: blog.datePublished,
    dateModified: blog.dateModified || blog.datePublished,
    inLanguage: isHindi ? 'hi-IN' : 'en',
    author: { '@type': 'Person', name: blog.author, url: `${SITE_URL}/about` },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: blog.meta?.keywords?.join(', '),
    articleSection: blog.category,
    wordCount: blog.content.trim().split(/\s+/).length,
    timeRequired: blog.readTime,
  };

  const result = [
    article,
    breadcrumbSchema([
      { name: 'Home', path: '' },
      { name: 'Blog', path: '/blog' },
      { name: blog.title, path: `/blog/${blog.slug}` },
    ]),
  ];

  // FAQPage only for Q&A-style posts (e.g. interview questions)
  if (blog.tags?.includes('interview-questions') || blog.tags?.includes('interview')) {
    const faqItems = [...blog.content.matchAll(/###\s+(?:\d+\.\s+)?(.+?)\n([\s\S]+?)(?=\n###|\n---|\n$)/g)]
      .filter((m) => m[2].trim().length > 20)
      .slice(0, 20)
      .map((m) => ({
        '@type': 'Question',
        name: m[1].replace(/[`*]/g, '').trim(),
        acceptedAnswer: {
          '@type': 'Answer',
          text: m[2].replace(/```[\s\S]*?```/g, '').replace(/[`*#]/g, '').trim().slice(0, 500),
        },
      }));
    if (faqItems.length > 0) result.push({ '@type': 'FAQPage', mainEntity: faqItems });
  }

  return result;
}
