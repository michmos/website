import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  thumbnail: string
  pinned?: boolean
}

export interface Post {
  meta: PostMeta
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fn) => {
      const slug = fn.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fn)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        pinned: data.pinned || false,
      } as PostMeta
    })

  const pinned = posts.filter((p) => p.pinned)
  const unpinned = posts.filter((p) => !p.pinned)

  const sortByDate = (a: PostMeta, b: PostMeta) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()

  return [...pinned.sort(sortByDate), ...unpinned.sort(sortByDate)]
}

export function getPostBySlug(slug: string): Post | null {
  try {
    if (!/^[a-z0-9-]+$/i.test(slug)) return null

    const postsDir = path.resolve(postsDirectory)
    const fullPath = path.resolve(postsDir, `${slug}.md`)
    if (!fullPath.startsWith(postsDir + path.sep)) return null
    if (!fs.existsSync(fullPath)) return null

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      meta: {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        pinned: data.pinned || false,
      },
      content,
    }
  } catch {
    return null
  }
}
