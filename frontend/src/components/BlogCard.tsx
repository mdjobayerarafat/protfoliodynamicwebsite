// src/components/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const tagsArray = React.useMemo(() => {
    if (!post.tags) return [];
    if (Array.isArray(post.tags)) return post.tags;
    return [post.tags];
  }, [post.tags]);

  const getImageUrl = (coverImage: string) => {


    if (coverImage.startsWith('http')) {
      return coverImage;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://20.197.36.135';
    return `${baseUrl}/static/${coverImage.replace(/^\/uploads\/|^\/static\/|^\//g, '')}`;
  };

  const imageUrl = React.useMemo(() => getImageUrl(post.coverImage), [post.coverImage]);

  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-[#1E2D3D] transition-transform hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized={imageUrl.startsWith('http')}
        />
      </div>
      <div className="p-6">
        {tagsArray.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tagsArray.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 rounded bg-[#1E2D3D] text-mint">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-xl font-medium text-white mb-2">{post.title}</h3>
        <p className="text-primary mb-4">{post.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary">{post.date}</span>
          <Link href={`/blog/${post.slug}`} className="text-mint hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;