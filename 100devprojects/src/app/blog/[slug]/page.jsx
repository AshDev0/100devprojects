import { notFound } from 'next/navigation';
import BlogDetail from '../../../views/BlogDetail';
import JsonLd from '../../../components/JsonLd';
import { blogs, getBlogBySlug } from '../../../data/blogs/index';
import { buildMetadata, blogSchemas } from '../../../lib/site';
import { isoDate } from '../../../lib/dates';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  return buildMetadata({
    title: blog.meta?.title || `${blog.title} | 100 Dev Projects`,
    description: blog.meta?.description || blog.excerpt,
    keywords: blog.meta?.keywords,
    path: `/blog/${blog.slug}`,
    ogType: 'article',
    publishedTime: isoDate(blog.datePublished),
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <>
      <JsonLd data={blogSchemas(blog)} />
      <BlogDetail blog={blog} />
    </>
  );
}
