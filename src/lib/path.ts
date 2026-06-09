const VIDEO_EXT = /\.(mp4|webm|mov|avi)$/i

export function isVideo(p: string) {
  return VIDEO_EXT.test(p)
}

export function encodePath(p: string) {
  return p.split('/').map((s) => encodeURIComponent(s)).join('/')
}

export function resolveSrc(src: string) {
  if (!src) return ''
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  const bp = process.env.NODE_ENV === 'production' ? '/website' : ''
  const normalized = src.startsWith('/') ? src : `/${src}`
  return encodePath(`${bp}${normalized}`)
}
