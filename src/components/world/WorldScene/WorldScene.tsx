'use client'

import ContentDrawer from '../ContentDrawer/ContentDrawer'
import FigureMosaic from '../FigureMosaic/FigureMosaic'
import { useMosaicSelection } from '../FigureMosaic/useMosaicSelection'
import type { WorldCategory } from '../world.types'
import { WORLD_CATEGORY_COLORS } from '../world.types'
import styles from './WorldScene.module.css'

const CATEGORY_SIDEBAR: { id: WorldCategory; label: string; hint: string }[] = [
  { id: 'fashion', label: 'Fashion', hint: 'Style, fits, inspiration' },
  { id: 'music', label: 'Music', hint: 'Playlists, artists, history' },
  { id: 'watching', label: 'Watching', hint: 'Films, anime, series' },
  { id: 'life', label: 'Life Feed', hint: 'Activity, ideas, signals' },
]

export default function WorldScene() {
  const mosaicSelection = useMosaicSelection()
  const { selectedFragment, clearSelection } = mosaicSelection

  return (
    <section className={styles.worldScene} aria-label="World mosaic scene">
      <div className={styles.sceneGlow} aria-hidden="true" />

      <aside className={styles.sidebar}>
        <p className={styles.sidebarEyebrow}>World</p>
        <h1 className={styles.sidebarTitle}>A collage of everything that shapes me.</h1>
        <p className={styles.sidebarCopy}>Click any fragment to explore.</p>

        <ul className={styles.categoryList}>
          {CATEGORY_SIDEBAR.map((item) => (
            <li key={item.id}>
              <span
                className={styles.categoryChip}
                style={{ ['--category-accent' as string]: WORLD_CATEGORY_COLORS[item.id] }}
              >
                <span className={styles.categoryLabel}>{item.label}</span>
                <span className={styles.categoryHint}>{item.hint}</span>
              </span>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.mosaicStage}>
        <FigureMosaic selection={mosaicSelection} />
      </div>

      <ContentDrawer fragment={selectedFragment} onClose={clearSelection} />
    </section>
  )
}
