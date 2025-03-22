import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getBlogPostBySlug } from '@/lib/blog';
import { BlogPost as BlogPostType } from '@/lib/types';
import BlogCard from '@/components/BlogCard';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [{ url: post.coverImage }] : []
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const relatedPosts: BlogPostType[] = [];

  if (!post) {
    return <div>Post not found</div>;
  }

  // Process image URL without hooks
  let imageUrl = '/images/default-blog-cover.jpg'; // Default fallback

  if (post.coverImage) {
    if (post.coverImage.startsWith('http')) {
      imageUrl = post.coverImage;
    } else {
      // Use the specific format you provided
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
      imageUrl = `${baseUrl}/static/${post.coverImage.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
    }
  }

  // Handle tags whether they're an array or string
  const tagsArray = Array.isArray(post.tags) ? post.tags : [post.tags];

  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        <Link href="/blog" className="text-mint mb-8 inline-flex items-center hover:underline">
          <svg className="mr-2 w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          Back to blog
        </Link>

        <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] mb-12 animate-fade-in">
          <div className="relative h-80 w-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
              unoptimized={imageUrl.startsWith('http')} // Skip optimization for external images
            />
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {tagsArray.map(tag => (
                <span key={tag} className="bg-primary/20 text-primary text-sm px-3 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-medium text-white mb-3">
              {post.title}
            </h1>

            <p className="text-primary mb-6">Published on {post.date}</p>

            <div className="prose prose-invert max-w-none text-primary">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-medium text-white mb-8">
              <span className="text-mint">#</span>more articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}