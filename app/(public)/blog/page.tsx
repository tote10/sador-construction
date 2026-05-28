import BlogClient from '@/components/blog/BlogClient';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function BlogPage() {
  try {
    const [postsRes, seoRes] = await Promise.all([
      supabase.from('blog_posts').select('*').order('published_at', { ascending: false }),
      supabase.from('seo_settings').select('*').limit(1),
    ]);

    const posts = (postsRes.data ?? []).map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: post.published_at,
      published: post.published ?? true,
    }));

    const seoRow = (seoRes.data && seoRes.data[0]) ?? null;
    return <BlogClient posts={posts} seoSettings={seoRow} />;
  } catch (err: any) {
    return <p className="text-center text-red-500">Could not load blog posts: {err?.message ?? String(err)}</p>;
  }
}
