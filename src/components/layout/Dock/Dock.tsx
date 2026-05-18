'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LiquidGlass from '@/components/ui/LiquidGlass'
import styles from './Dock.module.css'

const DOCK_ITEMS = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
        <line x1="12" y1="3" x2="12" y2="1" />
        <line x1="12" y1="23" x2="12" y2="21" />
        <line x1="3" y1="12" x2="1" y2="12" />
        <line x1="23" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    href: '/code',
    label: 'Code',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    href: '/words',
    label: 'Words',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
      </svg>
    ),
  },
  {
    href: '/world',
    label: 'World',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export default function Dock() {
  const pathname = usePathname()

  return (
    <nav className={styles.root} aria-label="Main navigation">
      <LiquidGlass variant="heavy" radius="lg" className={styles.pill}>
        {DOCK_ITEMS.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[styles.item, isActive ? styles.active : ''].join(' ')}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {isActive && <span className={styles.dot} aria-hidden="true" />}
            </Link>
          )
        })}
      </LiquidGlass>
    </nav>
  )
}
