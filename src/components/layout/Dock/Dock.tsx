'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LiquidGlass from '@/components/ui/LiquidGlass'
import styles from './Dock.module.css'

const NAV_ITEMS = [
  { href: '/code', label: 'Code', exact: false },
  { href: '/words', label: 'Words', exact: false },
  { href: '/world', label: 'World', exact: false },
]

export default function Dock() {
  const pathname = usePathname()

  return (
    <nav className={styles.root} aria-label="Main navigation">
      <div className={styles.buttonContainer}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[styles.link, isActive ? styles.active : ''].join(' ')}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <LiquidGlass variant="heavy" radius="lg" className={styles.pill}>
                <span className={styles.label}>{item.label}</span>
              </LiquidGlass>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
