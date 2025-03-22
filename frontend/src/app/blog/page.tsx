import BlogCard from '@/components/BlogCard';

async function getAllBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.163.180.176';
    const response = await fetch(`${baseUrl}/blog-posts`);

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export const metadata = {
  title: 'Blog | Developer Portfolio',
  description: 'Read the latest articles about web development, programming, and technology',
};

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();

  return (
    <main className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-white mb-4">
            <span className="text-mint">#</span>blog
          </h1>
          <p className="text-primary max-w-2xl">
            Thoughts, stories and ideas on web development, programming, and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {allPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}