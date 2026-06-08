import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function PostsPage() {
  const posts = getAllPosts()

  const pinnedPosts = posts.filter((p) => p.pinned)
  const normalPosts = posts.filter((p) => !p.pinned)

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Posts</h1>
      <p className="text-[rgb(var(--color-muted))] mb-10">
        Thoughts, projects, and notes.
      </p>

      {posts.length === 0 && (
        <p className="text-[rgb(var(--color-muted))]">No posts yet.</p>
      )}

      {pinnedPosts.length > 0 && (
        <div className="mb-12">
          <div className="grid gap-6 md:grid-cols-2">
            {pinnedPosts.map((post) => (
              <PostCard key={post.slug} post={post} pinned />
            ))}
          </div>
          {normalPosts.length > 0 && (
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgb(var(--color-border))]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[rgb(var(--color-bg))] px-4 text-xs text-[rgb(var(--color-muted))] uppercase tracking-wider">
                  More posts
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {normalPosts.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {normalPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
