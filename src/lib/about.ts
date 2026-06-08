import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface AboutData {
  name: string
  profilePicture: string
  github: string
  linkedin: string
  email: string
  cv: string
  bio: string
}

export function getAbout(): AboutData | null {
  try {
    const filePath = path.join(process.cwd(), 'content/about/bio.md')
    if (!fs.existsSync(filePath)) return null

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      name: data.name || 'Your Name',
      profilePicture: data.profilePicture || '',
      github: data.github || '#',
      linkedin: data.linkedin || '#',
      email: data.email || '',
      cv: data.cv || '#',
      bio: content,
    }
  } catch {
    return null
  }
}
