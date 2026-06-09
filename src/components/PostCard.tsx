import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import { resolveSrc, isVideo } from '@/lib/path'

function encodePath(path: string) {
  return path.split('/').map((s) => encodeURIComponent(s)).join('/')
}

export default function PostCard({ post, pinned }: { post: PostMeta; pinned?: boolean }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article
        className={`group block rounded-xl border border-[rgb(var(--color-border))] overflow-hidden transition-all hover:shadow-md hover:border-accent-300 dark:hover:border-accent-700 ${
          pinned ? 'ring-1 ring-accent-400 dark:ring-accent-600' : ''
        }`}
      >
        {post.thumbnail && (
          <div className="aspect-[16/9] overflow-hidden bg-[rgb(var(--color-border))]">
            {isVideo(post.thumbnail) ? (
              <video
                src={resolveSrc(post.thumbnail)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <img
                src={resolveSrc(post.thumbnail)}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            {pinned && (
              <span className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider">
                Pinned
              </span>
            )}
            <time className="text-xs text-[rgb(var(--color-muted))]">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h2 className="text-lg font-semibold mb-1.5 group-hover:text-accent-500 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-[rgb(var(--color-muted))] leading-relaxed">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  )
}
