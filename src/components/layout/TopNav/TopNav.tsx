'use client'

import Link from 'next/link'
import styles from './TopNav.module.css'

export default function TopNav() {
  return (
    <header className={styles.root}>
      <Link href="/" className={styles.homeLink} aria-label="Home">
        <h1 className={styles.title}>
          <span className={styles.wordA}>OWAH</span>
          <span className={styles.sep}>.</span>
          <span className={styles.wordB}>WORLD</span>
        </h1>
      </Link>
    </header>
  )
}
