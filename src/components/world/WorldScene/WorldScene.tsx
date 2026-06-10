'use client'

import dynamic from 'next/dynamic'
import styles from './WorldScene.module.css'

const WorldRoom3D = dynamic(() => import('../WorldRoom3D/WorldRoom3D'), {
  ssr: false,
  loading: () => (
    <div className={styles.loading} aria-busy="true" aria-label="Loading world room">
      <span className={styles.loadingText}>OWAH.WORLD / WORLD</span>
    </div>
  ),
})

export default function WorldScene() {
  return (
    <section
      className={styles.worldScene}
      data-world-scene
      aria-label="Living archive showroom"
    >
      <WorldRoom3D />
    </section>
  )
}
