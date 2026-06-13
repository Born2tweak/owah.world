import type { ArchiveBook, ArchiveView, CameraState, Wing, WingId } from './wordsArchive.types'

/**
 * Content manifest for the Archive of Influence. Books point at files copied
 * into public/words/books from the personal ebook library. Author works are
 * unreleased (file: null) and render as sealed manuscripts.
 */

const DEG = Math.PI / 180

export const WINGS: Wing[] = [
  { id: 'liberation', label: 'Liberation', eyebrow: 'Ideas that set people free', subtitle: 'Revolt, decolonisation, the politics of freedom.', accent: '#e0913f', azimuth: -64 * DEG },
  { id: 'mysticism', label: 'Mysticism', eyebrow: 'Truth beyond the veil', subtitle: 'The sacred, the inner path, the unsayable.', accent: '#9a78d8', azimuth: -32 * DEG },
  { id: 'psychology', label: 'Psychology', eyebrow: 'The self, the shadow, the mind', subtitle: 'Meaning, the unconscious, the architecture of being.', accent: '#4cc6d6', azimuth: 0 },
  { id: 'culture', label: 'Culture & Memory', eyebrow: 'The wisdom of our ancestors', subtitle: 'Heritage, story, the long African memory.', accent: '#d6a23d', azimuth: 32 * DEG },
  { id: 'author', label: 'Author', eyebrow: 'My writings, my journey', subtitle: 'Works under construction, coming to life.', accent: '#3df0ff', azimuth: 64 * DEG },
]

export const WING_BY_ID: Record<WingId, Wing> = WINGS.reduce(
  (acc, wing) => ({ ...acc, [wing.id]: wing }),
  {} as Record<WingId, Wing>,
)

export const ARCHIVE_VIEW_ORDER: ArchiveView[] = ['overview', 'liberation', 'mysticism', 'psychology', 'culture', 'author']

export const ARCHIVE_BOOKS: ArchiveBook[] = [
  // Liberation
  { id: 'fanon-wretched', title: 'The Wretched of the Earth', author: 'Frantz Fanon', wing: 'liberation', type: 'book', file: '/words/books/fanon-wretched-of-the-earth.pdf', cover: null, year: '1961', description: 'The handbook of decolonisation — violence, nationhood, and the psychology of the colonised.', themes: ['Colonialism', 'Resistance', 'Liberation'] },
  { id: 'fanon-black-skin', title: 'Black Skin, White Masks', author: 'Frantz Fanon', wing: 'liberation', type: 'book', file: '/words/books/fanon-black-skin-white-masks.pdf', cover: null, year: '1952', description: 'The lived experience of blackness under the colonial gaze.', themes: ['Identity', 'Race', 'Psychology'] },
  { id: 'malcolm-x', title: 'The Autobiography of Malcolm X', author: 'Malcolm X & Alex Haley', wing: 'liberation', type: 'book', file: '/words/books/malcolm-x-autobiography.pdf', cover: null, year: '1965', description: 'From the streets to the Nation to Mecca — a life of relentless self-reinvention.', themes: ['Self-determination', 'Faith', 'Transformation'] },
  { id: 'sankara', title: 'Thomas Sankara Speaks', author: 'Thomas Sankara', wing: 'liberation', type: 'book', file: '/words/books/sankara-speaks.pdf', cover: null, year: '1988', description: 'The Burkinabè revolution in his own words — dignity, self-reliance, integrity.', themes: ['Revolution', 'Pan-Africanism', 'Integrity'] },
  { id: 'lumumba', title: 'Lumumba Speaks', author: 'Patrice Lumumba', wing: 'liberation', type: 'book', file: '/words/books/lumumba-speaks.pdf', cover: null, year: '1972', description: 'Speeches and writings of the Congo’s first prime minister, 1958–1961.', themes: ['Independence', 'Sovereignty', 'Resistance'] },
  { id: 'cabral', title: 'The Autobiography of Amílcar Cabral', author: 'Amílcar Cabral', wing: 'liberation', type: 'book', file: '/words/books/cabral-autobiography.pdf', cover: null, description: 'The agronomist who armed a nation’s mind before its hands.', themes: ['Decolonisation', 'Culture', 'Struggle'] },
  { id: 'nkrumah', title: 'Consciencism', author: 'Kwame Nkrumah', wing: 'liberation', type: 'book', file: '/words/books/nkrumah-consciencism.pdf', cover: null, year: '1964', description: 'Philosophy and ideology for decolonisation and African unity.', themes: ['Pan-Africanism', 'Philosophy', 'Ideology'] },
  { id: 'biko', title: 'I Write What I Like', author: 'Steve Biko', wing: 'liberation', type: 'book', file: '/words/books/biko-i-write-what-i-like.pdf', cover: null, year: '1978', description: 'The founding texts of Black Consciousness, written against apartheid.', themes: ['Black Consciousness', 'Resistance', 'Dignity'] },
  { id: 'fred-hampton', title: 'Fred Hampton Speaks', author: 'Fred Hampton', wing: 'liberation', type: 'pdf', file: '/words/books/fred-hampton-speaks.pdf', cover: null, description: 'The Chairman’s words on solidarity, the people, and power.', themes: ['Solidarity', 'Power', 'Community'] },
  { id: 'freire', title: 'Pedagogy of the Oppressed', author: 'Paulo Freire', wing: 'liberation', type: 'book', file: '/words/books/freire-pedagogy-of-the-oppressed.pdf', cover: null, year: '1968', description: 'Education as the practice of freedom, not domestication.', themes: ['Education', 'Liberation', 'Consciousness'] },

  // Mysticism
  { id: 'gospel-thomas', title: 'The Gospel of Thomas', author: 'Jean-Yves Leloup', wing: 'mysticism', type: 'book', file: '/words/books/gospel-of-thomas.pdf', cover: null, description: 'The gnostic sayings of Jesus — the kingdom is spread upon the earth.', themes: ['Gnosis', 'The Divine', 'Inner light'] },
  { id: 'ibn-arabi', title: 'The Bezels of Wisdom', author: 'Ibn al-Arabi', wing: 'mysticism', type: 'book', file: '/words/books/ibn-arabi-bezels-of-wisdom.pdf', cover: null, year: '1229', description: 'The greatest master of Sufism on the wisdom of the prophets.', themes: ['Sufism', 'Unity', 'The Divine'] },
  { id: 'rumi', title: 'The Essential Rumi', author: 'Rumi (tr. Coleman Barks)', wing: 'mysticism', type: 'book', file: '/words/books/rumi-the-essential-rumi.epub', cover: null, year: '1995', description: 'Ecstatic poetry of longing, union, and the beloved.', themes: ['Love', 'Union', 'Poetry'] },
  { id: 'secret-of-secrets', title: 'The Secret of Secrets', author: 'Abdul Qadir Gilani', wing: 'mysticism', type: 'book', file: '/words/books/secret-of-secrets.pdf', cover: null, description: 'The inner dimensions of the spiritual path from the great Sufi shaykh.', themes: ['Sufism', 'Purification', 'The heart'] },
  { id: 'conference-birds', title: 'The Conference of the Birds', author: 'Farid ud-Din Attar', wing: 'mysticism', type: 'book', file: '/words/books/conference-of-the-birds.pdf', cover: null, description: 'The birds journey through seven valleys to find themselves in the Simurgh.', themes: ['Journey', 'Self', 'The Divine'] },
  { id: 'tao', title: 'Tao Te Ching', author: 'Lao Tzu (tr. Stephen Mitchell)', wing: 'mysticism', type: 'book', file: '/words/books/tao-te-ching.pdf', cover: null, description: 'The way that can be named is not the eternal way.', themes: ['Taoism', 'Balance', 'Wu wei'] },
  { id: 'marcus-aurelius', title: 'Meditations', author: 'Marcus Aurelius', wing: 'mysticism', type: 'book', file: '/words/books/marcus-aurelius-meditations.pdf', cover: null, description: 'The private notebook of a Roman emperor practising Stoic discipline.', themes: ['Stoicism', 'Discipline', 'Mortality'] },
  { id: 'five-rings', title: 'The Book of Five Rings', author: 'Miyamoto Musashi', wing: 'mysticism', type: 'book', file: '/words/books/book-of-five-rings.pdf', cover: null, year: '1645', description: 'The undefeated swordsman’s treatise on strategy and the way.', themes: ['Strategy', 'Mastery', 'The way'] },
  { id: 'gibran', title: 'The Prophet', author: 'Kahlil Gibran', wing: 'mysticism', type: 'book', file: '/words/books/gibran-the-prophet.pdf', cover: null, year: '1923', description: 'Almustafa’s parting wisdom on love, work, joy, and sorrow.', themes: ['Wisdom', 'Love', 'Life'] },

  // Psychology
  { id: 'jung-undiscovered', title: 'The Undiscovered Self', author: 'Carl Jung', wing: 'psychology', type: 'book', file: '/words/books/jung-undiscovered-self.epub', cover: null, year: '1957', description: 'The individual against the mass — symbols, dreams, and the modern soul.', themes: ['The unconscious', 'Self', 'Symbols'] },
  { id: 'fromm-escape', title: 'Escape from Freedom', author: 'Erich Fromm', wing: 'psychology', type: 'book', file: '/words/books/fromm-escape-from-freedom.pdf', cover: null, year: '1941', description: 'Why people flee the burden of freedom into conformity and authority.', themes: ['Freedom', 'Authority', 'Society'] },
  { id: 'frankl', title: "Man's Search for Meaning", author: 'Viktor Frankl', wing: 'psychology', type: 'book', file: '/words/books/frankl-mans-search-for-meaning.pdf', cover: null, year: '1946', description: 'Surviving the camps and the logotherapy born from it — meaning as the will to live.', themes: ['Meaning', 'Suffering', 'Will'] },
  { id: 'hawkins', title: 'The Map of Consciousness Explained', author: 'David R. Hawkins', wing: 'psychology', type: 'book', file: '/words/books/hawkins-map-of-consciousness.pdf', cover: null, year: '2020', description: 'A calibrated scale of consciousness from shame to enlightenment.', themes: ['Consciousness', 'Energy', 'Growth'] },

  // Culture & Memory
  { id: 'amkoullel', title: 'Amkoullel, the Fula Boy', author: 'Amadou Hampâté Bâ', wing: 'culture', type: 'book', file: '/words/books/amkoullel-the-fula-boy.pdf', cover: null, year: '1991', description: 'A memoir of pre-colonial Mali — oral memory as living archive.', themes: ['Heritage', 'Memory', 'Oral tradition'] },
  { id: 'achebe', title: 'No Longer at Ease', author: 'Chinua Achebe', wing: 'culture', type: 'book', file: '/words/books/achebe-no-longer-at-ease.pdf', cover: null, year: '1960', description: 'A young Nigerian caught between village values and colonial Lagos.', themes: ['Tradition', 'Modernity', 'Identity'] },
  { id: 'diop', title: 'The African Origin of Civilization', author: 'Cheikh Anta Diop', wing: 'culture', type: 'book', file: '/words/books/diop-african-origin-of-civilization.epub', cover: null, year: '1974', description: 'Myth or reality — the case for Africa at the root of civilisation.', themes: ['History', 'Identity', 'Civilisation'] },
  { id: 'mandela', title: 'Long Walk to Freedom', author: 'Nelson Mandela', wing: 'culture', type: 'book', file: '/words/books/mandela-long-walk-to-freedom.epub', cover: null, year: '1994', description: 'The autobiography of a life given to the struggle against apartheid.', themes: ['Freedom', 'Endurance', 'Reconciliation'] },
  { id: 'aurobindo', title: 'The Life Divine', author: 'Sri Aurobindo', wing: 'culture', type: 'book', file: '/words/books/aurobindo-the-life-divine.pdf', cover: null, description: 'Spiritual evolution and the ascent of consciousness toward the divine life.', themes: ['Evolution', 'Spirit', 'Consciousness'] },

  // Author / My Works (unreleased)
  { id: 'entropy', title: 'Entropy', author: 'OWAH', wing: 'author', type: 'essay', file: null, cover: null, description: 'An essay on decay, order, and the cost of building anything that lasts.', themes: ['Order', 'Decay', 'Systems'] },
  { id: 'identity-architecture', title: 'Identity Architecture', author: 'OWAH', wing: 'author', type: 'manuscript', file: null, cover: null, description: 'Field notes on designing the self the way one designs a system.', themes: ['Identity', 'Design', 'Self'] },
  { id: 'malcolm-project', title: 'Malcolm Project', author: 'OWAH', wing: 'author', type: 'manuscript', file: null, cover: null, description: 'Ongoing research into reinvention, discipline, and becoming.', themes: ['Research', 'Discipline', 'Becoming'] },
  { id: 'letters-future-self', title: 'Letters to My Future Self', author: 'OWAH', wing: 'author', type: 'manuscript', file: null, cover: null, description: 'Correspondence across time — what I want to remember I knew.', themes: ['Memory', 'Time', 'Reflection'] },
  { id: 'thoughts-on-reality', title: 'Thoughts on Reality', author: 'OWAH', wing: 'author', type: 'essay', file: null, cover: null, description: 'Fragments and drafts on perception, system, and meaning.', themes: ['Perception', 'Meaning', 'Fragments'] },
]

export const BOOK_BY_ID: Record<string, ArchiveBook> = ARCHIVE_BOOKS.reduce(
  (acc, book) => ({ ...acc, [book.id]: book }),
  {} as Record<string, ArchiveBook>,
)

export function booksForWing(wing: WingId): ArchiveBook[] {
  return ARCHIVE_BOOKS.filter((book) => book.wing === wing)
}

// ---------- Chamber geometry ----------

export const ARCHIVE_RADIUS = 6.4
const EYE = 1.6

/** Shelf slot grid in a wing's local space (books face local +Z). */
const SLOT_COLS = 4
const SLOT_X = [-1.17, -0.39, 0.39, 1.17]
export const SLOT_ROWS_Y = [1.92, 1.26, 0.6]
export const DISPLAY_LOCAL: [number, number, number] = [0, 1.46, 1.2]

export function wingAnchor(azimuth: number): [number, number, number] {
  return [ARCHIVE_RADIUS * Math.sin(azimuth), 0, -ARCHIVE_RADIUS * Math.cos(azimuth)]
}

/** Rotate the wing so its shelf front (+Z) faces the chamber centre. */
export function wingRotationY(azimuth: number): number {
  return -azimuth
}

export function bookSlot(index: number): { position: [number, number, number] } {
  const row = Math.floor(index / SLOT_COLS)
  const col = index % SLOT_COLS
  const stagger = col % 2 === 0 ? 0.01 : -0.01
  return { position: [SLOT_X[col], SLOT_ROWS_Y[row] ?? SLOT_ROWS_Y[0], stagger] }
}

function rotateY([x, y, z]: [number, number, number], ang: number): [number, number, number] {
  const c = Math.cos(ang)
  const s = Math.sin(ang)
  return [x * c + z * s, y, -x * s + z * c]
}

function localToWorld(local: [number, number, number], azimuth: number): [number, number, number] {
  const anchor = wingAnchor(azimuth)
  const rotated = rotateY(local, wingRotationY(azimuth))
  return [anchor[0] + rotated[0], anchor[1] + rotated[1], anchor[2] + rotated[2]]
}

function frontNormal(azimuth: number): [number, number, number] {
  return [-Math.sin(azimuth), 0, Math.cos(azimuth)]
}

function browseCamera(azimuth: number): CameraState {
  const anchor = wingAnchor(azimuth)
  const n = frontNormal(azimuth)
  return {
    position: [anchor[0] + n[0] * 3.15, EYE, anchor[2] + n[2] * 3.15],
    target: [anchor[0], 1.45, anchor[2]],
    fov: 46,
  }
}

function focusCamera(azimuth: number): CameraState {
  const display = localToWorld(DISPLAY_LOCAL, azimuth)
  const n = frontNormal(azimuth)
  return {
    position: [display[0] + n[0] * 2.05, display[1] + 0.12, display[2] + n[2] * 2.05],
    target: [display[0], display[1], display[2]],
    fov: 40,
  }
}

const OVERVIEW_CAMERA: CameraState = {
  position: [0, 2.55, 4.6],
  target: [0, 1.4, -4.2],
  fov: 54,
}

export const WING_BROWSE_CAMERA: Record<WingId, CameraState> = WINGS.reduce(
  (acc, wing) => ({ ...acc, [wing.id]: browseCamera(wing.azimuth) }),
  {} as Record<WingId, CameraState>,
)

export const WING_FOCUS_CAMERA: Record<WingId, CameraState> = WINGS.reduce(
  (acc, wing) => ({ ...acc, [wing.id]: focusCamera(wing.azimuth) }),
  {} as Record<WingId, CameraState>,
)

export function cameraForState(view: ArchiveView, focusedBookId: string | null): CameraState {
  if (focusedBookId) {
    const book = BOOK_BY_ID[focusedBookId]
    if (book) return WING_FOCUS_CAMERA[book.wing]
  }
  if (view !== 'overview') return WING_BROWSE_CAMERA[view]
  return OVERVIEW_CAMERA
}

export function nextView(current: ArchiveView, direction: 1 | -1): ArchiveView {
  const index = ARCHIVE_VIEW_ORDER.indexOf(current)
  const next = (index + direction + ARCHIVE_VIEW_ORDER.length) % ARCHIVE_VIEW_ORDER.length
  return ARCHIVE_VIEW_ORDER[next]
}
