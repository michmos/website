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

export function formatDate(date: string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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
      const slug = fn.replace(/\.md$/, '').replace(/\s+/g, '-').toLowerCase()
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

  const sortByDate = (a: PostMeta, b: PostMeta) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0
    const bTime = b.date ? new Date(b.date).getTime() : 0
    return bTime - aTime
  }

  return [...pinned.sort(sortByDate), ...unpinned.sort(sortByDate)]
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const fileName = fileNames.find((fn) => {
      const computedSlug = fn.replace(/\.md$/, '').replace(/\s+/g, '-').toLowerCase()
      return computedSlug === slug && fn.endsWith('.md')
    })
    if (!fileName) return null

    const fullPath = path.join(postsDirectory, fileName)
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
