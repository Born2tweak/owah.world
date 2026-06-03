'use client'

import type { SelectedFragment, WorldCategory } from '../world.types'
import { WORLD_CATEGORY_COLORS, WORLD_CATEGORY_LABELS } from '../world.types'
import styles from './ContentDrawer.module.css'

type ContentDrawerProps = {
  fragment: SelectedFragment | null
  onClose: () => void
}

const CATEGORY_NAV: WorldCategory[] = ['fashion', 'music', 'watching', 'life']

export default function ContentDrawer({ fragment, onClose }: ContentDrawerProps) {
  const isOpen = fragment !== null
  const category = fragment?.category ?? 'fashion'
  const accent = WORLD_CATEGORY_COLORS[category]

  return (
    <aside
      className={`${styles.drawer}${isOpen ? ` ${styles.drawerOpen}` : ''}`}
      aria-hidden={!isOpen}
      aria-label="World content drawer"
    >
      <div className={styles.drawerPanel} style={{ ['--drawer-accent' as string]: accent }}>
        <header className={styles.drawerHeader}>
          <div>
            <p className={styles.drawerEyebrow}>Category</p>
            <h2 className={styles.drawerTitle}>{WORLD_CATEGORY_LABELS[category]}</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close drawer">
            ×
          </button>
        </header>

        <nav className={styles.drawerNav} aria-label="Category sections">
          {CATEGORY_NAV.map((item) => (
            <span
              key={item}
              className={`${styles.navItem}${item === category ? ` ${styles.navItemActive}` : ''}`}
            >
              {item}
            </span>
          ))}
        </nav>

        <div className={styles.drawerBody}>
          <p className={styles.placeholderLabel}>Placeholder panel</p>
          <p className={styles.placeholderCopy}>
            {WORLD_CATEGORY_LABELS[category]} — live integrations arrive in a later milestone.
          </p>
          {fragment ? (
            <dl className={styles.fragmentMeta}>
              <div>
                <dt>Fragment</dt>
                <dd>{fragment.id}</dd>
              </div>
              <div>
                <dt>Position</dt>
                <dd>
                  {fragment.x.toFixed(1)}%, {fragment.y.toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>
                  {fragment.width.toFixed(1)} × {fragment.height.toFixed(1)}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
