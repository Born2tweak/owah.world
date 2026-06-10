import type { WorldCategory } from '../world.types'
import styles from './ContentDrawer.module.css'

type DrawerMockContentProps = {
  category: WorldCategory
}

const FASHION_CARDS = [
  { title: 'Signal Nomad', tag: 'Outerwear study' },
  { title: 'Chrome Loom', tag: 'Textile grid' },
  { title: 'Night Meridian', tag: 'Evening fit' },
  { title: 'Archive 04', tag: 'Pattern draft' },
] as const

const MUSIC_RECENT = ['Midnight Transit', 'Glass Choir', 'Neon Orchard'] as const
const MUSIC_PLAYLISTS = ['Afterglow Runs', 'Studio Drift'] as const
const MUSIC_ARTISTS = ['Kite District', 'Lumen Vale', 'Soft Circuit'] as const

const WATCHING_FILMS = ['The Long Signal', 'City of Mirrors', 'Quiet Orbit'] as const
const WATCHING_ANIME = ['Fragment Line', 'Starlit Ward', 'Echo Harbor'] as const

const LIFE_SIGNALS = [
  { time: '2h ago', label: 'New reference saved to fashion board' },
  { time: 'Yesterday', label: 'Playlist sync — late-night focus set' },
  { time: 'Mon', label: 'Finished rewatch — City of Mirrors' },
  { time: 'Sun', label: 'Draft note — world mosaic direction' },
] as const

export function DrawerMockContent({ category }: DrawerMockContentProps) {
  switch (category) {
    case 'fashion':
      return (
        <div className={styles.fashionGrid}>
          {FASHION_CARDS.map((card) => (
            <article key={card.title} className={styles.mockCard}>
              <span className={styles.mockCardTag}>{card.tag}</span>
              <h3 className={styles.mockCardTitle}>{card.title}</h3>
            </article>
          ))}
        </div>
      )

    case 'music':
      return (
        <div className={styles.sectionStack}>
          <section className={styles.mockSection}>
            <h3 className={styles.mockSectionTitle}>Recent</h3>
            <ul className={styles.mockList}>
              {MUSIC_RECENT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className={styles.mockSection}>
            <h3 className={styles.mockSectionTitle}>Playlists</h3>
            <ul className={styles.mockList}>
              {MUSIC_PLAYLISTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className={styles.mockSection}>
            <h3 className={styles.mockSectionTitle}>Artists</h3>
            <ul className={styles.mockChipRow}>
              {MUSIC_ARTISTS.map((item) => (
                <li key={item}>
                  <span className={styles.mockChip}>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )

    case 'watching':
      return (
        <div className={styles.sectionStack}>
          <section className={styles.mockSection}>
            <h3 className={styles.mockSectionTitle}>Films</h3>
            <div className={styles.mediaRow}>
              {WATCHING_FILMS.map((item) => (
                <div key={item} className={styles.mediaTile}>
                  <span className={styles.mediaTileLabel}>{item}</span>
                </div>
              ))}
            </div>
          </section>
          <section className={styles.mockSection}>
            <h3 className={styles.mockSectionTitle}>Anime</h3>
            <div className={styles.mediaRow}>
              {WATCHING_ANIME.map((item) => (
                <div key={item} className={styles.mediaTile}>
                  <span className={styles.mediaTileLabel}>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )

    case 'life':
      return (
        <ol className={styles.timeline}>
          {LIFE_SIGNALS.map((signal) => (
            <li key={signal.label} className={styles.timelineItem}>
              <span className={styles.timelineTime}>{signal.time}</span>
              <p className={styles.timelineLabel}>{signal.label}</p>
            </li>
          ))}
        </ol>
      )

    default:
      return null
  }
}
