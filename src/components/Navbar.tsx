'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { href: '/posts', label: 'Posts' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[rgb(var(--color-border))]">
      <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/posts"
            className="text-lg font-semibold tracking-tight hover:text-accent-500 transition-colors"
          >
            michmos
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + '/')
                    ? 'text-accent-500 font-medium'
                    : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-fg))]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <DarkModeToggle />
        {/* Mobile nav */}
        <div className="sm:hidden flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + '/')
                  ? 'text-accent-500 font-medium'
                  : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-fg))]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
