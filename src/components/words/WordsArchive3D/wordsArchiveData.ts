import type { ArchiveWork, CameraState, Face, FaceId } from './wordsArchive.types'

/**
 * Archive of Influence — 4 subject faces, 5 works each (20 total).
 * Faces map to the four side planes of the cube; bringing a face to the
 * front is a single Y rotation.
 */

export const FACES: Face[] = [
  { id: 'liberation', label: 'Liberation', thesis: 'Ideas that set people free.', accent: '#e0913f', faceRotationY: 0 },
  { id: 'mysticism', label: 'Mysticism', thesis: 'Truth beyond the veil.', accent: '#9a78d8', faceRotationY: -Math.PI / 2 },
  { id: 'psychology', label: 'Psychology', thesis: 'The self, the mind, and meaning.', accent: '#4cc6d6', faceRotationY: Math.PI },
  { id: 'culture', label: 'Culture & Memory', thesis: 'Heritage shapes consciousness.', accent: '#d6a23d', faceRotationY: Math.PI / 2 },
]

export const FACE_BY_ID: Record<FaceId, Face> = FACES.reduce(
  (acc, face) => ({ ...acc, [face.id]: face }),
  {} as Record<FaceId, Face>,
)

export const FACE_ORDER: FaceId[] = ['liberation', 'mysticism', 'psychology', 'culture']

export const ARCHIVE_WORKS: ArchiveWork[] = [
  // ---------- LIBERATION ----------
  {
    id: 'malcolm-x',
    title: 'The Autobiography of Malcolm X',
    author: 'Malcolm X',
    year: '1965',
    face: 'liberation',
    image: '/words/art/malcolm-x.jpg',
    file: '/words/books/malcolm-x-autobiography.pdf',
    thesis: 'A life remade through struggle, knowledge, and self-respect.',
    overview:
      'Malcolm X’s journey from street hustler to global symbol of Black liberation — a relentless act of self-reinvention dictated to Alex Haley.',
    themes: ['Self-determination', 'Education', 'Race', 'Faith', 'Revolution'],
    keyIdeas: [
      'Literacy as liberation — the prison reading that rebuilt his mind.',
      'Identity is chosen and re-chosen, never inherited.',
      'Dignity precedes politics; self-respect is the first revolution.',
    ],
    passages: [
      { text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.', ref: 'On learning' },
      { text: 'You cannot separate peace from freedom because no one can be at peace unless he has his freedom.', ref: 'The Ballot or the Bullet' },
    ],
    related: ['fanon', 'kwame-ture', 'sankara', 'mandela'],
  },
  {
    id: 'fanon',
    title: 'The Wretched of the Earth',
    author: 'Frantz Fanon',
    year: '1961',
    face: 'liberation',
    image: '/words/art/fanon.png',
    file: '/words/books/fanon-wretched-of-the-earth.pdf',
    thesis: 'The psychology and violence of decolonisation.',
    overview:
      'Fanon’s handbook of decolonisation diagnoses the colonised mind and the cleansing fire of national liberation.',
    themes: ['Colonialism', 'Resistance', 'Psychology', 'Nationhood'],
    keyIdeas: [
      'Colonialism is violence; decolonisation answers in kind.',
      'The colonised must build a new humanism, not inherit the coloniser’s.',
      'National consciousness can curdle into a new elite if left unwatched.',
    ],
    passages: [
      { text: 'Each generation must, out of relative obscurity, discover its mission, fulfill it, or betray it.', ref: 'On national consciousness' },
    ],
    related: ['malcolm-x', 'cabral', 'sankara', 'diop'],
  },
  {
    id: 'sankara',
    title: 'Thomas Sankara Speaks',
    author: 'Thomas Sankara',
    year: '1988',
    face: 'liberation',
    image: '/words/art/sankara.png',
    file: '/words/books/sankara-speaks.pdf',
    thesis: 'Dignity, self-reliance, and the Burkinabè revolution.',
    overview:
      'The speeches of the “African Che” — a revolution built on integrity, self-sufficiency, and refusal of debt.',
    themes: ['Revolution', 'Pan-Africanism', 'Integrity', 'Self-reliance'],
    keyIdeas: [
      'Debt is a reconquest of Africa by other means.',
      'A revolution that does not free women is no revolution.',
      'Dare to invent the future.',
    ],
    passages: [
      { text: 'He who feeds you, controls you.', ref: 'On self-reliance' },
      { text: 'You cannot carry out fundamental change without a certain amount of madness.', ref: 'On daring' },
    ],
    related: ['cabral', 'fanon', 'malcolm-x'],
  },
  {
    id: 'cabral',
    title: 'The Autobiography of Amílcar Cabral',
    author: 'Amílcar Cabral',
    year: '1973',
    face: 'liberation',
    image: '/words/art/cabral.png',
    file: '/words/books/cabral-autobiography.pdf',
    thesis: 'Culture as the seedbed of liberation.',
    overview:
      'The agronomist-revolutionary who taught that liberation begins in culture — arming the mind before the hand.',
    themes: ['Decolonisation', 'Culture', 'Struggle', 'Unity'],
    keyIdeas: [
      'National liberation is an act of culture.',
      'Claim no easy victories; tell no lies.',
      'The struggle is fought with the head as much as the rifle.',
    ],
    passages: [
      { text: 'Tell no lies. Claim no easy victories.', ref: 'On honesty in struggle' },
    ],
    related: ['fanon', 'sankara', 'diop', 'malcolm-x'],
  },
  {
    id: 'kwame-ture',
    title: 'Black Power',
    author: 'Kwame Ture',
    year: '1967',
    face: 'liberation',
    image: '/words/art/kwame-ture.jpg',
    file: '/words/books/kwame-ture-black-power.epub',
    thesis: 'The politics of liberation in America.',
    overview:
      'Carmichael and Hamilton name “Black Power” and lay out the case for self-defined institutions and political autonomy.',
    themes: ['Black Power', 'Politics', 'Autonomy', 'Solidarity'],
    keyIdeas: [
      'A group must define itself before it can negotiate from strength.',
      'Institutional racism hides inside polite, ordinary systems.',
      'Coalitions form between equals, not between patrons and clients.',
    ],
    passages: [
      { text: 'Before a group can enter the open society, it must first close ranks.', ref: 'On self-definition' },
    ],
    related: ['malcolm-x', 'fanon', 'sankara'],
  },

  // ---------- MYSTICISM ----------
  {
    id: 'gospel-of-thomas',
    title: 'The Gospel of Thomas',
    author: 'Trans. Jean-Yves Leloup',
    year: 'c. 100',
    face: 'mysticism',
    image: '/words/art/gospel-of-thomas.png',
    file: '/words/books/gospel-of-thomas.pdf',
    thesis: 'The kingdom is spread upon the earth.',
    overview:
      'The gnostic sayings of Jesus — wisdom not as belief but as inner recognition and self-knowledge.',
    themes: ['Gnosis', 'Inner light', 'The Divine', 'Self'],
    keyIdeas: [
      'Salvation is knowing the self that already carries the light.',
      'The kingdom is here, unseen, awaiting recognition.',
      'What you bring forth from within will save you.',
    ],
    passages: [
      { text: 'If you bring forth what is within you, what you bring forth will save you.', ref: 'Saying 70' },
    ],
    related: ['ibn-arabi', 'aurobindo', 'rumi'],
  },
  {
    id: 'rumi',
    title: 'The Essential Rumi',
    author: 'Rumi · trans. Coleman Barks',
    year: '1995',
    face: 'mysticism',
    image: '/words/art/rumi.jpg',
    file: '/words/books/rumi-the-essential-rumi.epub',
    thesis: 'Longing as the road to union.',
    overview:
      'Ecstatic poems of separation and reunion — the soul as a reed torn from the reed bed, singing of return.',
    themes: ['Love', 'Union', 'Longing', 'Poetry'],
    keyIdeas: [
      'The wound is the place where the light enters you.',
      'Longing itself is the proof of the beloved.',
      'Beyond ideas of right and wrong, there is a field.',
    ],
    passages: [
      { text: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I’ll meet you there.', ref: 'A Great Wagon' },
    ],
    related: ['ibn-arabi', 'gilani', 'conference-of-the-birds'],
  },
  {
    id: 'ibn-arabi',
    title: 'The Bezels of Wisdom',
    author: 'Ibn al-Arabi',
    year: 'c. 1229',
    face: 'mysticism',
    image: '/words/art/ibn-arabi.jpg',
    file: '/words/books/ibn-arabi-bezels-of-wisdom.pdf',
    thesis: 'The unity of being behind every form.',
    overview:
      'The greatest master of Sufism reads the wisdom of the prophets as facets of a single divine reality.',
    themes: ['Sufism', 'Unity of being', 'The Divine', 'Knowledge'],
    keyIdeas: [
      'All forms are mirrors of the one Real.',
      'The heart capable of every form is the truest temple.',
      'Knowledge of God is knowledge of the self.',
    ],
    passages: [
      { text: 'My heart has become capable of every form.', ref: 'On the receptive heart' },
    ],
    related: ['rumi', 'gilani', 'gospel-of-thomas'],
  },
  {
    id: 'gilani',
    title: 'The Secret of Secrets',
    author: 'Abdul Qadir Gilani',
    year: 'c. 1150',
    face: 'mysticism',
    image: '/words/art/gilani.jpg',
    file: '/words/books/secret-of-secrets.pdf',
    thesis: 'The inner dimensions of the spiritual path.',
    overview:
      'The great Sufi shaykh maps the purification of the heart — the secret journey beneath the outward practice.',
    themes: ['Sufism', 'Purification', 'The heart', 'Discipline'],
    keyIdeas: [
      'Every outward act has an inward secret.',
      'The nafs (ego) is the veil between the seeker and the Real.',
      'Repentance is a turning of the whole being, not a phrase.',
    ],
    passages: [
      { text: 'The cleansing of the heart is the beginning of all wayfaring.', ref: 'On purification' },
    ],
    related: ['ibn-arabi', 'rumi'],
  },
  {
    id: 'conference-of-the-birds',
    title: 'The Conference of the Birds',
    author: 'Farid ud-Din Attar',
    year: 'c. 1177',
    face: 'mysticism',
    image: '/words/art/conference-of-the-birds.jpg',
    file: '/words/books/conference-of-the-birds.pdf',
    thesis: 'The seekers are what they seek.',
    overview:
      'The birds cross seven valleys in search of the Simurgh, only to find themselves reflected in the one they sought.',
    themes: ['Journey', 'Self', 'The Divine', 'Allegory'],
    keyIdeas: [
      'The path has seven valleys: quest, love, knowledge, detachment, unity, bewilderment, annihilation.',
      'The sought and the seeker are one.',
      'Most never set out; the journey itself selects.',
    ],
    passages: [
      { text: 'It is we who are the Simurgh we have sought.', ref: 'The seventh valley' },
    ],
    related: ['rumi', 'ibn-arabi', 'gospel-of-thomas'],
  },

  // ---------- PSYCHOLOGY ----------
  {
    id: 'jung',
    title: 'The Undiscovered Self',
    author: 'Carl Jung',
    year: '1957',
    face: 'psychology',
    image: '/words/art/jung.jpg',
    file: '/words/books/jung-undiscovered-self.epub',
    thesis: 'The individual against the mass.',
    overview:
      'Jung argues that the self is the last defence against the crowd — only inner work resists collective madness.',
    themes: ['The unconscious', 'Individuation', 'Self', 'Society'],
    keyIdeas: [
      'The individual is the makeweight that tips the scales of history.',
      'What we do not make conscious returns to us as fate.',
      'Self-knowledge is a moral duty, not a luxury.',
    ],
    passages: [
      { text: 'Who looks outside, dreams; who looks inside, awakes.', ref: 'On the inner life' },
    ],
    related: ['frankl', 'fromm', 'hawkins', 'aurobindo'],
  },
  {
    id: 'fromm',
    title: 'Escape from Freedom',
    author: 'Erich Fromm',
    year: '1941',
    face: 'psychology',
    image: '/words/art/fromm.jpg',
    file: '/words/books/fromm-escape-from-freedom.pdf',
    thesis: 'Why people flee freedom into conformity.',
    overview:
      'Fromm asks why, granted freedom, people surrender it to authority and the comfort of the crowd.',
    themes: ['Freedom', 'Authority', 'Society', 'Belonging'],
    keyIdeas: [
      'Freedom brings isolation as well as possibility.',
      'Authoritarianism is an escape from the burden of the self.',
      'Spontaneous love and work are the positive uses of freedom.',
    ],
    passages: [
      { text: 'Man is born as a freak of nature, being within nature and yet transcending it.', ref: 'On the human condition' },
    ],
    related: ['jung', 'frankl', 'fanon'],
  },
  {
    id: 'frankl',
    title: "Man's Search for Meaning",
    author: 'Viktor Frankl',
    year: '1946',
    face: 'psychology',
    image: '/words/art/frankl.jpg',
    file: '/words/books/frankl-mans-search-for-meaning.pdf',
    thesis: 'Meaning is the will that survives suffering.',
    overview:
      'Surviving the camps, Frankl founds logotherapy: the last human freedom is to choose one’s attitude.',
    themes: ['Meaning', 'Suffering', 'Will', 'Freedom'],
    keyIdeas: [
      'Those who have a why to live can bear almost any how.',
      'The last of human freedoms is to choose one’s attitude.',
      'Meaning is found in work, love, and the stance we take toward suffering.',
    ],
    passages: [
      { text: 'When we are no longer able to change a situation, we are challenged to change ourselves.', ref: 'On the last freedom' },
    ],
    related: ['jung', 'fromm', 'marcus-aurelius'],
  },
  {
    id: 'hawkins',
    title: 'The Map of Consciousness',
    author: 'David R. Hawkins',
    year: '2020',
    face: 'psychology',
    image: '/words/art/hawkins.png',
    file: '/words/books/hawkins-map-of-consciousness.pdf',
    thesis: 'A calibrated scale from shame to enlightenment.',
    overview:
      'Hawkins charts consciousness as a measurable spectrum of energy, from the lowest contractions to the highest states.',
    themes: ['Consciousness', 'Energy', 'Growth', 'Awareness'],
    keyIdeas: [
      'Levels of consciousness calibrate from shame to enlightenment.',
      'Courage is the threshold where energy turns from draining to empowering.',
      'Letting go raises the level more than striving.',
    ],
    passages: [
      { text: 'Nothing changes until we ourselves change — then everything changes.', ref: 'On responsibility' },
    ],
    related: ['jung', 'aurobindo'],
  },
  {
    id: 'marcus-aurelius',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    year: 'c. 180',
    face: 'psychology',
    image: '/words/art/marcus-aurelius.jpg',
    file: '/words/books/marcus-aurelius-meditations.pdf',
    thesis: 'The private discipline of a Stoic emperor.',
    overview:
      'The night notebook of a Roman emperor practising the Stoic art of governing the only thing he controlled — himself.',
    themes: ['Stoicism', 'Discipline', 'Mortality', 'Virtue'],
    keyIdeas: [
      'You have power over your mind — not outside events.',
      'The obstacle is the way; impediment becomes action.',
      'Waste no more time arguing what a good person is. Be one.',
    ],
    passages: [
      { text: 'You have power over your mind — not outside events. Realize this, and you will find strength.', ref: 'Book IV' },
    ],
    related: ['frankl', 'jung'],
  },

  // ---------- CULTURE & MEMORY ----------
  {
    id: 'diop',
    title: 'The African Origin of Civilization',
    author: 'Cheikh Anta Diop',
    year: '1974',
    face: 'culture',
    image: '/words/art/diop.jpg',
    file: '/words/books/diop-african-origin-of-civilization.epub',
    thesis: 'Africa at the root of civilisation — myth or reality.',
    overview:
      'Diop marshals history, linguistics, and science to place ancient Egypt and Africa at the source of civilisation.',
    themes: ['History', 'Identity', 'Civilisation', 'Memory'],
    keyIdeas: [
      'Restoring history is a precondition for restoring a people.',
      'Ancient Egypt was an African civilisation.',
      'A falsified past produces a colonised present.',
    ],
    passages: [
      { text: 'The African who has understood us is the one who, after the reading of our works, will have felt a desire to become a researcher.', ref: 'On reclaiming history' },
    ],
    related: ['cabral', 'fanon', 'achebe', 'hampate-ba'],
  },
  {
    id: 'achebe',
    title: 'No Longer at Ease',
    author: 'Chinua Achebe',
    year: '1960',
    face: 'culture',
    image: '/words/art/achebe.jpg',
    file: '/words/books/achebe-no-longer-at-ease.pdf',
    thesis: 'A man caught between village and colony.',
    overview:
      'A young Nigerian, educated abroad, is ground between ancestral obligation and the compromises of colonial Lagos.',
    themes: ['Tradition', 'Modernity', 'Identity', 'Corruption'],
    keyIdeas: [
      'The collision of inherited duty and modern ambition.',
      'Corruption is a slow erosion, not a single fall.',
      'You cannot stand between two worlds without being torn.',
    ],
    passages: [
      { text: 'A man does not challenge his chi to a wrestling match.', ref: 'On fate' },
    ],
    related: ['diop', 'hampate-ba', 'mandela'],
  },
  {
    id: 'hampate-ba',
    title: 'Amkoullel, the Fula Boy',
    author: 'Amadou Hampâté Bâ',
    year: '1991',
    face: 'culture',
    image: '/words/art/hampate-ba.jpg',
    file: '/words/books/amkoullel-the-fula-boy.pdf',
    thesis: 'Oral memory as living archive.',
    overview:
      'A memoir of pre-colonial Mali, where Hampâté Bâ shows the spoken word as the truest library of a people.',
    themes: ['Heritage', 'Memory', 'Oral tradition', 'Childhood'],
    keyIdeas: [
      'In Africa, when an old man dies, a library burns.',
      'Memory is a discipline, carried by the living.',
      'The colonised world remembers in stories, not archives.',
    ],
    passages: [
      { text: 'In Africa, when an old man dies, a library burns to the ground.', ref: 'On oral memory' },
    ],
    related: ['diop', 'achebe'],
  },
  {
    id: 'mandela',
    title: 'Long Walk to Freedom',
    author: 'Nelson Mandela',
    year: '1994',
    face: 'culture',
    image: '/words/art/mandela.jpg',
    file: '/words/books/mandela-long-walk-to-freedom.epub',
    thesis: 'A life given to the long struggle.',
    overview:
      'Mandela’s autobiography — from rural childhood through prison to the presidency, and the discipline of reconciliation.',
    themes: ['Freedom', 'Endurance', 'Reconciliation', 'Leadership'],
    keyIdeas: [
      'Freedom is indivisible — the oppressor is unfree too.',
      'Courage is not the absence of fear but the triumph over it.',
      'After climbing a great hill, one finds only more hills to climb.',
    ],
    passages: [
      { text: 'It always seems impossible until it’s done.', ref: 'On perseverance' },
    ],
    related: ['malcolm-x', 'diop', 'achebe'],
  },
  {
    id: 'aurobindo',
    title: 'The Life Divine',
    author: 'Sri Aurobindo',
    year: '1940',
    face: 'culture',
    image: '/words/art/aurobindo.jpg',
    file: '/words/books/aurobindo-the-life-divine.pdf',
    thesis: 'The ascent of consciousness toward a divine life.',
    overview:
      'Aurobindo’s synthesis of yoga and evolution — matter and spirit reconciled in a rising arc of consciousness.',
    themes: ['Evolution', 'Spirit', 'Consciousness', 'Integral yoga'],
    keyIdeas: [
      'Evolution is consciousness awakening to itself.',
      'Matter is spirit at its most veiled.',
      'The divine life is the next term of human evolution.',
    ],
    passages: [
      { text: 'All life is yoga.', ref: 'On the integral path' },
    ],
    related: ['jung', 'hawkins', 'gospel-of-thomas'],
  },
]

export const WORK_BY_ID: Record<string, ArchiveWork> = ARCHIVE_WORKS.reduce(
  (acc, work) => ({ ...acc, [work.id]: work }),
  {} as Record<string, ArchiveWork>,
)

export function worksForFace(face: FaceId): ArchiveWork[] {
  return ARCHIVE_WORKS.filter((work) => work.face === face)
}

// ---------- Cube geometry ----------

/** Cube half-size; faces sit on the four side planes. */
export const CUBE_SIZE = 2.0
const HALF = CUBE_SIZE / 2

/**
 * Local placement of the 5 work tiles on a face (face plane is local +Z,
 * face is CUBE_SIZE wide/tall). Cross arrangement around the centre label.
 */
export const TILE_SLOTS: [number, number][] = [
  [-0.63, 0.63],
  [0.63, 0.63],
  [-0.63, -0.63],
  [0.63, -0.63],
  [0, -0.66],
]

export const TILE_SIZE = 0.66
export const FACE_OFFSET = HALF

const OVERVIEW_CAMERA: CameraState = { position: [3.4, 2.2, 4.6], fov: 42, target: [0, 0, 0] }
const FACE_CAMERA: CameraState = { position: [0, 0.4, 5.0], fov: 40, target: [0, 0, 0] }
const WORK_CAMERA: CameraState = { position: [0, 0.2, 4.2], fov: 38, target: [0, 0.1, 0.6] }

export function cameraForMode(mode: 'overview' | 'face' | 'work'): CameraState {
  if (mode === 'work') return WORK_CAMERA
  if (mode === 'face') return FACE_CAMERA
  return OVERVIEW_CAMERA
}

export function nextFace(current: FaceId, direction: 1 | -1): FaceId {
  const index = FACE_ORDER.indexOf(current)
  const next = (index + direction + FACE_ORDER.length) % FACE_ORDER.length
  return FACE_ORDER[next]
}
