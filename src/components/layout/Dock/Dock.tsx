'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Dock.module.css'

const NAV_ITEMS = [
  { href: '/code',  label: 'Code'  },
  { href: '/words', label: 'Words' },
  { href: '/world', label: 'World' },
]

export default function Dock() {
  const pathname = usePathname()

  return (
    <nav className={styles.root} aria-label="Main navigation">
      <div className={styles.pills}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[styles.pill, isActive ? styles.active : ''].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.sparkle} aria-hidden="true">✦</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
