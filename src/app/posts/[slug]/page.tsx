import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import MarkdownRenderer from '@/components/MarkdownRenderer'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-fg))] transition-colors mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to posts
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          {post.meta.pinned && (
            <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider">
              Pinned
            </span>
          )}
          {post.meta.date && Number.isFinite(Date.parse(post.meta.date)) && (
            <time className="text-sm text-[rgb(var(--color-muted))]">
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {post.meta.title}
        </h1>
        {post.meta.description && (
          <p className="mt-3 text-lg text-[rgb(var(--color-muted))]">
            {post.meta.description}
          </p>
        )}
      </header>

      <MarkdownRenderer content={post.content} />
    </article>
  )
}
