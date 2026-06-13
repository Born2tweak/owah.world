import type { ArchiveWork, CameraState, CubeSide, Face, FaceId } from './wordsArchive.types'

/**
 * Archive of Influence — six subject faces, nine works each (54 total).
 * Faces map to the six sides of the cube. Tiles carry imagery only; all
 * text lives in the HUD and reading panel.
 */

export const FACES: Face[] = [
  { id: 'liberation', label: 'Liberation', accent: '#e0913f', side: 'front' },
  { id: 'mysticism', label: 'Mysticism', accent: '#9a78d8', side: 'back' },
  { id: 'psychology', label: 'Psychology', accent: '#4cc6d6', side: 'left' },
  { id: 'governance', label: 'Governance & Statecraft', accent: '#5b8def', side: 'right' },
  { id: 'culture', label: 'Culture & Memory', accent: '#d6a23d', side: 'top' },
  { id: 'author', label: 'Author / Personal', accent: '#3df0ff', side: 'bottom' },
]

export const FACE_BY_ID: Record<FaceId, Face> = FACES.reduce(
  (acc, f) => ({ ...acc, [f.id]: f }),
  {} as Record<FaceId, Face>,
)

export const FACE_ORDER: FaceId[] = ['liberation', 'mysticism', 'psychology', 'governance', 'culture', 'author']

const W = (w: ArchiveWork) => w

export const ARCHIVE_WORKS: ArchiveWork[] = [
  // ---------------- LIBERATION (front) ----------------
  W({ id: 'malcolm-x', title: 'The Autobiography of Malcolm X', author: 'Malcolm X', year: '1965', face: 'liberation', image: '/words/art/malcolm-x.jpg', file: '/words/books/malcolm-x-autobiography.pdf', thesis: 'A life remade through struggle, knowledge, and self-respect.', influence: 98,
    overview: 'Dictated to Alex Haley across the last years of his life, this is the story of a man who reinvented himself from prisoner to global symbol of Black liberation.',
    whyItMatters: 'It turned a single life into a blueprint for self-transformation, and remains the most widely read text of the Black freedom struggle.',
    themes: ['Self-determination', 'Education', 'Faith', 'Revolution'],
    keyIdeas: ['Literacy is liberation — the prison reading that rebuilt his mind.', 'Identity is chosen and re-chosen, never inherited.', 'Dignity precedes politics; self-respect is the first revolution.'],
    passages: [{ text: 'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.', ref: 'On learning' }, { text: 'You cannot separate peace from freedom because no one can be at peace unless he has his freedom.', ref: 'The Ballot or the Bullet' }],
    related: ['fanon', 'kwame-ture', 'sankara', 'mandela'] }),
  W({ id: 'fanon', title: 'The Wretched of the Earth', author: 'Frantz Fanon', year: '1961', face: 'liberation', image: '/words/art/fanon.png', file: '/words/books/fanon-wretched-of-the-earth.pdf', thesis: 'The psychology and violence of decolonisation.', influence: 96,
    overview: 'Fanon’s final work diagnoses the colonised mind and the cleansing violence of national liberation, written as Algeria fought for independence.',
    whyItMatters: 'It became the handbook of anti-colonial revolution worldwide and founded the psychology of the oppressed.',
    themes: ['Colonialism', 'Resistance', 'Psychology', 'Nationhood'],
    keyIdeas: ['Colonialism is violence; decolonisation answers in kind.', 'The colonised must build a new humanism, not inherit the coloniser’s.', 'National consciousness can curdle into a new elite.'],
    passages: [{ text: 'Each generation must, out of relative obscurity, discover its mission, fulfill it, or betray it.', ref: 'On national consciousness' }],
    related: ['malcolm-x', 'cabral', 'sankara', 'diop'] }),
  W({ id: 'sankara', title: 'Thomas Sankara Speaks', author: 'Thomas Sankara', year: '1988', face: 'liberation', image: '/words/art/sankara.png', file: '/words/books/sankara-speaks.pdf', thesis: 'Dignity, self-reliance, and the Burkinabè revolution.', influence: 90,
    overview: 'The speeches of the “African Che” — a four-year revolution built on integrity, self-sufficiency, and the refusal of debt.',
    whyItMatters: 'Sankara proved an African state could feed and govern itself without dependency, and paid for it with his life.',
    themes: ['Revolution', 'Pan-Africanism', 'Integrity', 'Self-reliance'],
    keyIdeas: ['Debt is a reconquest of Africa by other means.', 'A revolution that does not free women is no revolution.', 'Dare to invent the future.'],
    passages: [{ text: 'He who feeds you, controls you.', ref: 'On self-reliance' }, { text: 'You cannot carry out fundamental change without a certain amount of madness.', ref: 'On daring' }],
    related: ['cabral', 'fanon', 'nkrumah', 'lumumba'] }),
  W({ id: 'cabral', title: 'The Autobiography of Amílcar Cabral', author: 'Amílcar Cabral', year: '1973', face: 'liberation', image: '/words/art/cabral.png', file: '/words/books/cabral-autobiography.pdf', thesis: 'Culture as the seedbed of liberation.', influence: 85,
    overview: 'The agronomist-revolutionary who led Guinea-Bissau’s independence taught that liberation begins in culture — arming the mind before the hand.',
    whyItMatters: 'Cabral reframed armed struggle as cultural renaissance, shaping liberation theory across the Lusophone world.',
    themes: ['Decolonisation', 'Culture', 'Struggle', 'Unity'],
    keyIdeas: ['National liberation is an act of culture.', 'Claim no easy victories; tell no lies.', 'The struggle is fought with the head as much as the rifle.'],
    passages: [{ text: 'Tell no lies. Claim no easy victories.', ref: 'On honesty in struggle' }],
    related: ['fanon', 'sankara', 'diop', 'lumumba'] }),
  W({ id: 'kwame-ture', title: 'Black Power', author: 'Kwame Ture', year: '1967', face: 'liberation', image: '/words/art/kwame-ture.jpg', file: '/words/books/kwame-ture-black-power.epub', thesis: 'The politics of liberation in America.', influence: 82,
    overview: 'Carmichael and Hamilton name “Black Power” and make the case for self-defined institutions and political autonomy.',
    whyItMatters: 'It named institutional racism and gave the movement a vocabulary of self-determination still used today.',
    themes: ['Black Power', 'Politics', 'Autonomy', 'Solidarity'],
    keyIdeas: ['A group must define itself before negotiating from strength.', 'Institutional racism hides inside ordinary systems.', 'Coalitions form between equals, not patrons and clients.'],
    passages: [{ text: 'Before a group can enter the open society, it must first close ranks.', ref: 'On self-definition' }],
    related: ['malcolm-x', 'fanon', 'fred-hampton'] }),
  W({ id: 'lumumba', title: 'Lumumba Speaks', author: 'Patrice Lumumba', year: '1963', face: 'liberation', image: '/words/art/lumumba.jpg', file: '/words/books/lumumba-speaks.pdf', thesis: 'The voice of Congolese independence.', influence: 80,
    overview: 'The speeches and letters of the Congo’s first prime minister, assassinated months into independence.',
    whyItMatters: 'His murder became the defining parable of neo-colonial betrayal in post-independence Africa.',
    themes: ['Independence', 'Sovereignty', 'Resistance', 'Pan-Africanism'],
    keyIdeas: ['Political independence without economic sovereignty is hollow.', 'Africa will write its own history.', 'Dignity is non-negotiable.'],
    passages: [{ text: 'The day will come when history will speak. Africa will write its own history.', ref: 'Letter from prison' }],
    related: ['sankara', 'cabral', 'nkrumah'] }),
  W({ id: 'nkrumah', title: 'Consciencism', author: 'Kwame Nkrumah', year: '1964', face: 'liberation', image: '/words/art/nkrumah.jpg', file: '/words/books/nkrumah-consciencism.pdf', thesis: 'Philosophy and ideology for decolonisation.', influence: 81,
    overview: 'Ghana’s founding president builds a philosophy for African unity, fusing indigenous, Islamic, and Western thought.',
    whyItMatters: 'It supplied Pan-Africanism with a systematic philosophy and a vision of continental unity.',
    themes: ['Pan-Africanism', 'Philosophy', 'Ideology', 'Unity'],
    keyIdeas: ['Decolonisation must be intellectual as well as political.', 'Africa must unite or be picked apart.', 'Philosophy is a weapon of liberation.'],
    passages: [{ text: 'We face neither East nor West; we face forward.', ref: 'On non-alignment' }],
    related: ['lumumba', 'sankara', 'nyerere'] }),
  W({ id: 'biko', title: 'I Write What I Like', author: 'Steve Biko', year: '1978', face: 'liberation', image: '/words/art/biko.jpg', file: '/words/books/biko-i-write-what-i-like.pdf', thesis: 'The founding texts of Black Consciousness.', influence: 84,
    overview: 'Collected writings of the Black Consciousness leader, murdered in police custody at 30.',
    whyItMatters: 'Biko gave apartheid’s victims a psychology of pride that outlived him and helped topple the regime.',
    themes: ['Black Consciousness', 'Resistance', 'Dignity', 'Apartheid'],
    keyIdeas: ['The most potent weapon of the oppressor is the mind of the oppressed.', 'Black is a state of mind, not a colour.', 'Liberation begins with self-regard.'],
    passages: [{ text: 'The most potent weapon in the hands of the oppressor is the mind of the oppressed.', ref: 'On consciousness' }],
    related: ['fanon', 'malcolm-x', 'mandela'] }),
  W({ id: 'fred-hampton', title: 'Fred Hampton Speaks', author: 'Fred Hampton', year: '1969', face: 'liberation', image: '/words/art/fred-hampton.jpg', file: '/words/books/fred-hampton-speaks.pdf', thesis: 'Solidarity, the people, and power.', influence: 78,
    overview: 'The speeches of the Black Panther chairman who built the original Rainbow Coalition before his assassination at 21.',
    whyItMatters: 'He modelled cross-racial class solidarity that the state found dangerous enough to kill.',
    themes: ['Solidarity', 'Power', 'Community', 'Class'],
    keyIdeas: ['Solidarity crosses race when it follows class.', 'Serve the people, body and soul.', 'You can kill a revolutionary but not the revolution.'],
    passages: [{ text: 'You can jail a revolutionary, but you can’t jail the revolution.', ref: 'On permanence' }],
    related: ['kwame-ture', 'malcolm-x', 'fanon'] }),

  // ---------------- MYSTICISM (back) ----------------
  W({ id: 'gospel-of-thomas', title: 'The Gospel of Thomas', author: 'Trans. Jean-Yves Leloup', year: 'c. 100', face: 'mysticism', image: '/words/art/gospel-of-thomas.png', file: '/words/books/gospel-of-thomas.pdf', thesis: 'The kingdom is spread upon the earth.', influence: 76,
    overview: 'The gnostic sayings of Jesus — wisdom not as belief but as inner recognition and self-knowledge.',
    whyItMatters: 'It preserves a mystical Christianity of direct knowing, suppressed for centuries until rediscovered at Nag Hammadi.',
    themes: ['Gnosis', 'Inner light', 'The Divine', 'Self'],
    keyIdeas: ['Salvation is knowing the self that already carries the light.', 'The kingdom is here, unseen, awaiting recognition.', 'What you bring forth from within will save you.'],
    passages: [{ text: 'If you bring forth what is within you, what you bring forth will save you.', ref: 'Saying 70' }],
    related: ['ibn-arabi', 'aurobindo', 'rumi'] }),
  W({ id: 'rumi', title: 'The Essential Rumi', author: 'Rumi · trans. Coleman Barks', year: '1995', face: 'mysticism', image: '/words/art/rumi.jpg', file: '/words/books/rumi-the-essential-rumi.epub', thesis: 'Longing as the road to union.', influence: 88,
    overview: 'Ecstatic poems of separation and reunion — the soul as a reed torn from the reed bed, singing of return.',
    whyItMatters: 'Eight centuries on, Rumi is the best-selling poet in the world — proof that longing translates across every culture.',
    themes: ['Love', 'Union', 'Longing', 'Poetry'],
    keyIdeas: ['The wound is the place where the light enters you.', 'Longing itself is proof of the beloved.', 'Beyond right and wrong, there is a field.'],
    passages: [{ text: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I’ll meet you there.', ref: 'A Great Wagon' }],
    related: ['ibn-arabi', 'gilani', 'conference-of-the-birds'] }),
  W({ id: 'ibn-arabi', title: 'The Bezels of Wisdom', author: 'Ibn al-Arabi', year: 'c. 1229', face: 'mysticism', image: '/words/art/ibn-arabi.jpg', file: '/words/books/ibn-arabi-bezels-of-wisdom.pdf', thesis: 'The unity of being behind every form.', influence: 79,
    overview: 'The greatest master of Sufism reads the wisdom of the prophets as facets of one divine reality.',
    whyItMatters: 'His doctrine of the “unity of being” shaped Islamic mysticism and still anchors comparative metaphysics.',
    themes: ['Sufism', 'Unity of being', 'The Divine', 'Knowledge'],
    keyIdeas: ['All forms are mirrors of the one Real.', 'The heart capable of every form is the truest temple.', 'Knowledge of God is knowledge of the self.'],
    passages: [{ text: 'My heart has become capable of every form.', ref: 'On the receptive heart' }],
    related: ['rumi', 'gilani', 'gospel-of-thomas'] }),
  W({ id: 'gilani', title: 'The Secret of Secrets', author: 'Abdul Qadir Gilani', year: 'c. 1150', face: 'mysticism', image: '/words/art/gilani.jpg', file: '/words/books/secret-of-secrets.pdf', thesis: 'The inner dimensions of the spiritual path.', influence: 70,
    overview: 'The great Sufi shaykh maps the purification of the heart — the secret journey beneath outward practice.',
    whyItMatters: 'A foundational manual for the inner life of Sufism, still taught across the orders he inspired.',
    themes: ['Sufism', 'Purification', 'The heart', 'Discipline'],
    keyIdeas: ['Every outward act has an inward secret.', 'The ego is the veil between the seeker and the Real.', 'Repentance turns the whole being.'],
    passages: [{ text: 'The cleansing of the heart is the beginning of all wayfaring.', ref: 'On purification' }],
    related: ['ibn-arabi', 'rumi'] }),
  W({ id: 'conference-of-the-birds', title: 'The Conference of the Birds', author: 'Farid ud-Din Attar', year: 'c. 1177', face: 'mysticism', image: '/words/art/conference-of-the-birds.jpg', file: '/words/books/conference-of-the-birds.pdf', thesis: 'The seekers are what they seek.', influence: 77,
    overview: 'The birds cross seven valleys in search of the Simurgh, only to find themselves reflected in the one they sought.',
    whyItMatters: 'The defining allegory of the Sufi path, and a structural ancestor of every quest narrative since.',
    themes: ['Journey', 'Self', 'The Divine', 'Allegory'],
    keyIdeas: ['The path has seven valleys, ending in annihilation.', 'The sought and the seeker are one.', 'Most never set out; the journey selects.'],
    passages: [{ text: 'It is we who are the Simurgh we have sought.', ref: 'The seventh valley' }],
    related: ['rumi', 'ibn-arabi', 'gospel-of-thomas'] }),
  W({ id: 'lao-tzu', title: 'Tao Te Ching', author: 'Lao Tzu · trans. Stephen Mitchell', year: 'c. 400 BCE', face: 'mysticism', image: '/words/art/lao-tzu.png', file: '/words/books/tao-te-ching.pdf', thesis: 'The way that can be named is not the eternal way.', influence: 92,
    overview: 'Eighty-one verses on the Tao — the nameless source — and the art of acting through non-action.',
    whyItMatters: 'The root text of Taoism and one of the most translated books in history; its paradoxes still reframe how we think about power and ease.',
    themes: ['Taoism', 'Balance', 'Wu wei', 'Nature'],
    keyIdeas: ['The way that can be named is not the eternal way.', 'Yield and overcome; bend and be straight.', 'Act without forcing — wu wei.'],
    passages: [{ text: 'When I let go of what I am, I become what I might be.', ref: 'On yielding' }],
    related: ['conference-of-the-birds', 'musashi', 'aurobindo'] }),
  W({ id: 'gibran', title: 'The Prophet', author: 'Kahlil Gibran', year: '1923', face: 'mysticism', image: '/words/art/gibran.jpg', file: '/words/books/gibran-the-prophet.pdf', thesis: 'Parting wisdom on love, work, joy, and sorrow.', influence: 83,
    overview: 'Almustafa, about to sail home, answers a town’s questions on the whole arc of human life in twenty-six poetic essays.',
    whyItMatters: 'Never out of print since 1923, it became the quiet scripture of weddings, funerals, and coming-of-age across the world.',
    themes: ['Wisdom', 'Love', 'Life', 'Poetry'],
    keyIdeas: ['Your children are not your children; they pass through you.', 'Work is love made visible.', 'Joy and sorrow are inseparable.'],
    passages: [{ text: 'Your pain is the breaking of the shell that encloses your understanding.', ref: 'On Pain' }],
    related: ['rumi', 'gospel-of-thomas'] }),
  W({ id: 'musashi', title: 'The Book of Five Rings', author: 'Miyamoto Musashi', year: '1645', face: 'mysticism', image: '/words/art/musashi.jpg', file: '/words/books/book-of-five-rings.pdf', thesis: 'The undefeated swordsman’s way of strategy.', influence: 80,
    overview: 'Written in a cave near the end of his life, Musashi’s treatise on swordsmanship is really a discipline of perception and the Way.',
    whyItMatters: 'A martial classic that crossed into strategy, business, and contemplative practice the world over.',
    themes: ['Strategy', 'Mastery', 'The Way', 'Discipline'],
    keyIdeas: ['Perceive that which cannot be seen with the eye.', 'The Way is in training; do nothing useless.', 'From one thing, know ten thousand.'],
    passages: [{ text: 'You can only fight the way you practice.', ref: 'The Water Book' }],
    related: ['lao-tzu', 'marcus-aurelius', 'sun-tzu'] }),
  W({ id: 'aurobindo', title: 'The Life Divine', author: 'Sri Aurobindo', year: '1940', face: 'mysticism', image: '/words/art/aurobindo.jpg', file: '/words/books/aurobindo-the-life-divine.pdf', thesis: 'The ascent of consciousness toward a divine life.', influence: 74,
    overview: 'Aurobindo’s synthesis of yoga and evolution — matter and spirit reconciled in a rising arc of consciousness.',
    whyItMatters: 'It rebuilt Indian spiritual philosophy for the modern age, framing evolution itself as consciousness awakening.',
    themes: ['Evolution', 'Spirit', 'Consciousness', 'Integral yoga'],
    keyIdeas: ['Evolution is consciousness awakening to itself.', 'Matter is spirit at its most veiled.', 'The divine life is the next term of evolution.'],
    passages: [{ text: 'All life is yoga.', ref: 'On the integral path' }],
    related: ['gospel-of-thomas', 'hawkins', 'lao-tzu'] }),

  // ---------------- PSYCHOLOGY (left) ----------------
  W({ id: 'jung', title: 'The Undiscovered Self', author: 'Carl Jung', year: '1957', face: 'psychology', image: '/words/art/jung.jpg', file: '/words/books/jung-undiscovered-self.epub', thesis: 'The individual against the mass.', influence: 91,
    overview: 'Jung argues that the self is the last defence against the crowd — only inner work resists collective madness.',
    whyItMatters: 'It crystallised individuation as a moral task and warned, presciently, of mass-man and the totalitarian temptation.',
    themes: ['The unconscious', 'Individuation', 'Self', 'Society'],
    keyIdeas: ['The individual tips the scales of history.', 'What we do not make conscious returns as fate.', 'Self-knowledge is a duty, not a luxury.'],
    passages: [{ text: 'Who looks outside, dreams; who looks inside, awakes.', ref: 'On the inner life' }],
    related: ['freud', 'frankl', 'hawkins', 'aurobindo'] }),
  W({ id: 'freud', title: 'Civilization and Its Discontents', author: 'Sigmund Freud', year: '1930', face: 'psychology', image: '/words/art/freud.jpg', file: null, thesis: 'The price of civilisation is repression.', influence: 89,
    overview: 'Freud argues that society demands we trade instinct for order, and that the discontent this breeds is permanent.',
    whyItMatters: 'It founded the modern conversation about the self, desire, and the costs of living together.',
    themes: ['The unconscious', 'Repression', 'Civilisation', 'Desire'],
    keyIdeas: ['Civilisation is built on the renunciation of instinct.', 'Guilt is the tax of belonging.', 'Eros and death contend within us.'],
    passages: [{ text: 'The liberty of the individual is no gift of civilization.', ref: 'Chapter III' }],
    related: ['jung', 'nietzsche', 'fromm'] }),
  W({ id: 'frankl', title: "Man's Search for Meaning", author: 'Viktor Frankl', year: '1946', face: 'psychology', image: '/words/art/frankl.jpg', file: '/words/books/frankl-mans-search-for-meaning.pdf', thesis: 'Meaning is the will that survives suffering.', influence: 94,
    overview: 'Surviving the camps, Frankl founds logotherapy: the last human freedom is to choose one’s attitude.',
    whyItMatters: 'It reframed psychology around meaning rather than pleasure or power, and consoled millions.',
    themes: ['Meaning', 'Suffering', 'Will', 'Freedom'],
    keyIdeas: ['Those with a why can bear almost any how.', 'The last freedom is to choose one’s attitude.', 'Meaning is found in work, love, and our stance toward suffering.'],
    passages: [{ text: 'When we are no longer able to change a situation, we are challenged to change ourselves.', ref: 'On the last freedom' }],
    related: ['jung', 'fromm', 'marcus-aurelius', 'nietzsche'] }),
  W({ id: 'fromm', title: 'Escape from Freedom', author: 'Erich Fromm', year: '1941', face: 'psychology', image: '/words/art/fromm.jpg', file: '/words/books/fromm-escape-from-freedom.pdf', thesis: 'Why people flee freedom into conformity.', influence: 85,
    overview: 'Fromm asks why, granted freedom, people surrender it to authority and the comfort of the crowd.',
    whyItMatters: 'Written as fascism rose, it remains the sharpest account of why free people choose unfreedom.',
    themes: ['Freedom', 'Authority', 'Society', 'Belonging'],
    keyIdeas: ['Freedom brings isolation as well as possibility.', 'Authoritarianism escapes the burden of the self.', 'Spontaneous love and work redeem freedom.'],
    passages: [{ text: 'Man is born as a freak of nature, being within nature and yet transcending it.', ref: 'On the human condition' }],
    related: ['freud', 'jung', 'fanon'] }),
  W({ id: 'maslow', title: 'Toward a Psychology of Being', author: 'Abraham Maslow', year: '1962', face: 'psychology', image: '/words/art/maslow.jpg', file: null, thesis: 'The architecture of human becoming.', influence: 82,
    overview: 'Maslow shifts psychology from the sick to the thriving, mapping needs from survival to self-actualisation.',
    whyItMatters: 'His hierarchy reshaped education, management, and the modern idea of personal growth.',
    themes: ['Self-actualisation', 'Needs', 'Growth', 'Peak experience'],
    keyIdeas: ['What a man can be, he must be.', 'Growth needs sit atop deficiency needs.', 'Peak experiences reveal the fully human.'],
    passages: [{ text: 'What a man can be, he must be. This need we call self-actualization.', ref: 'On becoming' }],
    related: ['rogers', 'frankl', 'jung'] }),
  W({ id: 'rogers', title: 'On Becoming a Person', author: 'Carl Rogers', year: '1961', face: 'psychology', image: '/words/art/rogers.jpg', file: null, thesis: 'The self heals in unconditional regard.', influence: 78,
    overview: 'The founder of humanistic therapy argues that people grow when met with empathy and acceptance, not judgement.',
    whyItMatters: 'It humanised therapy and seeded the modern language of authenticity and active listening.',
    themes: ['Self', 'Empathy', 'Growth', 'Acceptance'],
    keyIdeas: ['The curious paradox: I change when I accept myself as I am.', 'The good life is a process, not a state.', 'Empathy is the precondition of growth.'],
    passages: [{ text: 'The curious paradox is that when I accept myself just as I am, then I can change.', ref: 'On acceptance' }],
    related: ['maslow', 'frankl', 'fromm'] }),
  W({ id: 'nietzsche', title: 'Thus Spoke Zarathustra', author: 'Friedrich Nietzsche', year: '1883', face: 'psychology', image: '/words/art/nietzsche.jpg', file: null, thesis: 'Become who you are.', influence: 93,
    overview: 'In the voice of a prophet, Nietzsche proclaims the death of God, the will to power, and the self that overcomes itself.',
    whyItMatters: 'It detonated modern philosophy and psychology, forcing the question of meaning after old certainties fell.',
    themes: ['Will', 'Self-overcoming', 'Meaning', 'Value'],
    keyIdeas: ['Become who you are.', 'Man is something to be overcome.', 'He who has a why can bear almost any how.'],
    passages: [{ text: 'You must have chaos within you to give birth to a dancing star.', ref: 'Prologue' }],
    related: ['freud', 'frankl', 'jung'] }),
  W({ id: 'hawkins', title: 'The Map of Consciousness', author: 'David R. Hawkins', year: '2020', face: 'psychology', image: '/words/art/hawkins.png', file: '/words/books/hawkins-map-of-consciousness.pdf', thesis: 'A calibrated scale from shame to enlightenment.', influence: 68,
    overview: 'Hawkins charts consciousness as a measurable spectrum of energy, from the lowest contractions to the highest states.',
    whyItMatters: 'It gave the self-development world a single ladder to locate any emotional state and its way up.',
    themes: ['Consciousness', 'Energy', 'Growth', 'Awareness'],
    keyIdeas: ['Levels calibrate from shame to enlightenment.', 'Courage is the threshold where energy empowers.', 'Letting go raises the level more than striving.'],
    passages: [{ text: 'Nothing changes until we ourselves change — then everything changes.', ref: 'On responsibility' }],
    related: ['jung', 'aurobindo', 'maslow'] }),
  W({ id: 'marcus-aurelius', title: 'Meditations', author: 'Marcus Aurelius', year: 'c. 180', face: 'psychology', image: '/words/art/marcus-aurelius.jpg', file: '/words/books/marcus-aurelius-meditations.pdf', thesis: 'The private discipline of a Stoic emperor.', influence: 90,
    overview: 'The night notebook of a Roman emperor practising the Stoic art of governing the one thing he controlled — himself.',
    whyItMatters: 'Two thousand years on, it is the most practical handbook of self-mastery ever kept private and then shared.',
    themes: ['Stoicism', 'Discipline', 'Mortality', 'Virtue'],
    keyIdeas: ['You have power over your mind, not outside events.', 'The obstacle is the way.', 'Waste no time arguing what a good person is — be one.'],
    passages: [{ text: 'You have power over your mind — not outside events. Realize this, and you will find strength.', ref: 'Book IV' }],
    related: ['frankl', 'musashi', 'nietzsche'] }),

  // ---------------- GOVERNANCE & STATECRAFT (right) ----------------
  W({ id: 'machiavelli', title: 'The Prince', author: 'Niccolò Machiavelli', year: '1532', face: 'governance', image: '/words/art/machiavelli.jpg', file: null, thesis: 'Power as it is, not as it ought to be.', influence: 95,
    overview: 'Machiavelli sets aside moral idealism to describe how power is actually won, held, and lost.',
    whyItMatters: 'It founded modern political realism and gave statecraft a vocabulary it has never escaped.',
    themes: ['Power', 'Realism', 'Statecraft', 'Fortune'],
    keyIdeas: ['It is safer to be feared than loved, if one must choose.', 'Fortune favours the bold but can be prepared for.', 'Study what is done, not what should be done.'],
    passages: [{ text: 'Everyone sees what you appear to be, few experience what you really are.', ref: 'Chapter XVIII' }],
    related: ['hobbes', 'sun-tzu', 'aristotle'] }),
  W({ id: 'sun-tzu', title: 'The Art of War', author: 'Sun Tzu', year: 'c. 500 BCE', face: 'governance', image: '/words/art/sun-tzu.jpg', file: null, thesis: 'Win before the battle is fought.', influence: 92,
    overview: 'The oldest treatise on strategy — victory through positioning, deception, and the economy of force.',
    whyItMatters: 'From war rooms to boardrooms, it remains the most cited strategy text in the world.',
    themes: ['Strategy', 'Deception', 'Leadership', 'War'],
    keyIdeas: ['Supreme excellence is to subdue the enemy without fighting.', 'All warfare is based on deception.', 'Know yourself and the enemy; never be in peril.'],
    passages: [{ text: 'The supreme art of war is to subdue the enemy without fighting.', ref: 'Chapter III' }],
    related: ['machiavelli', 'musashi', 'hobbes'] }),
  W({ id: 'plato', title: 'The Republic', author: 'Plato', year: 'c. 375 BCE', face: 'governance', image: '/words/art/plato.png', file: null, thesis: 'What is justice, and who should rule?', influence: 96,
    overview: 'Through Socrates, Plato builds an ideal city to ask what justice is in the soul and the state.',
    whyItMatters: 'The founding work of Western political philosophy; every later theory answers it.',
    themes: ['Justice', 'The state', 'Philosophy', 'Virtue'],
    keyIdeas: ['Justice is harmony of the parts, in soul and city.', 'Philosophers should rule, or rulers philosophise.', 'The allegory of the cave: most mistake shadows for truth.'],
    passages: [{ text: 'The price good men pay for indifference to public affairs is to be ruled by evil men.', ref: 'Book I' }],
    related: ['aristotle', 'hobbes', 'rousseau'] }),
  W({ id: 'aristotle', title: 'Politics', author: 'Aristotle', year: 'c. 350 BCE', face: 'governance', image: '/words/art/aristotle.jpg', file: null, thesis: 'Man is a political animal.', influence: 90,
    overview: 'Aristotle compares constitutions empirically to ask which arrangements let citizens flourish.',
    whyItMatters: 'It made politics an empirical science and gave us the categories of constitution still used today.',
    themes: ['Politics', 'Constitution', 'Citizenship', 'Virtue'],
    keyIdeas: ['Man is by nature a political animal.', 'The middle class is the ballast of stable states.', 'The state exists for the sake of the good life.'],
    passages: [{ text: 'Man is by nature a political animal.', ref: 'Book I' }],
    related: ['plato', 'machiavelli', 'locke'] }),
  W({ id: 'hobbes', title: 'Leviathan', author: 'Thomas Hobbes', year: '1651', face: 'governance', image: '/words/art/hobbes.jpg', file: null, thesis: 'Order is the cure for the war of all against all.', influence: 88,
    overview: 'Hobbes argues that without a sovereign, life is a war of all against all, so people trade liberty for security.',
    whyItMatters: 'It invented the social contract and the modern theory of state legitimacy.',
    themes: ['Social contract', 'Sovereignty', 'Order', 'Fear'],
    keyIdeas: ['Without the state, life is solitary, poor, nasty, brutish, and short.', 'Legitimacy flows from consent to be governed.', 'Fear and reason together build the commonwealth.'],
    passages: [{ text: 'Covenants, without the sword, are but words.', ref: 'Chapter XVII' }],
    related: ['machiavelli', 'locke', 'rousseau'] }),
  W({ id: 'locke', title: 'Two Treatises of Government', author: 'John Locke', year: '1689', face: 'governance', image: '/words/art/locke.jpg', file: null, thesis: 'Government rests on consent and natural rights.', influence: 91,
    overview: 'Locke refutes the divine right of kings and grounds government in natural rights to life, liberty, and property.',
    whyItMatters: 'It armed the American and French revolutions and underwrites modern liberal democracy.',
    themes: ['Natural rights', 'Consent', 'Property', 'Liberty'],
    keyIdeas: ['All are free, equal, and independent by nature.', 'Government exists to protect rights, not grant them.', 'When it fails that trust, revolt is just.'],
    passages: [{ text: 'Where law ends, tyranny begins.', ref: 'Second Treatise' }],
    related: ['hobbes', 'rousseau', 'paine'] }),
  W({ id: 'rousseau', title: 'The Social Contract', author: 'Jean-Jacques Rousseau', year: '1762', face: 'governance', image: '/words/art/rousseau.jpg', file: null, thesis: 'Legitimate authority comes from the general will.', influence: 89,
    overview: 'Rousseau seeks a form of association in which each, uniting with all, still obeys only himself.',
    whyItMatters: 'It supplied the language of popular sovereignty that defines democratic legitimacy.',
    themes: ['General will', 'Sovereignty', 'Freedom', 'Equality'],
    keyIdeas: ['Man is born free, and everywhere he is in chains.', 'Sovereignty lies in the general will.', 'Liberty is obedience to a law we give ourselves.'],
    passages: [{ text: 'Man is born free, and everywhere he is in chains.', ref: 'Book I' }],
    related: ['locke', 'hobbes', 'paine'] }),
  W({ id: 'paine', title: 'Common Sense', author: 'Thomas Paine', year: '1776', face: 'governance', image: '/words/art/paine.jpg', file: null, thesis: 'The plain case for independence.', influence: 84,
    overview: 'Paine’s pamphlet made the radical case for American independence in language any citizen could read.',
    whyItMatters: 'It turned elite argument into mass conviction and helped ignite a revolution.',
    themes: ['Independence', 'Republicanism', 'Rights', 'Rhetoric'],
    keyIdeas: ['Society is a blessing; government, at best, a necessary evil.', 'A continent cannot be ruled by an island.', 'These are the times that try men’s souls.'],
    passages: [{ text: 'We have it in our power to begin the world over again.', ref: 'Common Sense' }],
    related: ['locke', 'rousseau', 'malcolm-x'] }),
  W({ id: 'nyerere', title: 'Ujamaa: Essays on Socialism', author: 'Julius Nyerere', year: '1968', face: 'governance', image: '/words/art/nyerere.png', file: '/words/books/nyerere-ujamaa.pdf', thesis: 'An African socialism rooted in the family.', influence: 80,
    overview: 'Tanzania’s founding president grounds a homegrown socialism in the ethic of the extended family — ujamaa.',
    whyItMatters: 'It was the most serious attempt to build a distinctly African political economy after independence.',
    themes: ['African socialism', 'Community', 'Self-reliance', 'Development'],
    keyIdeas: ['Socialism is an attitude of mind, not a doctrine.', 'Development is of people, not things.', 'The family is the model of the just society.'],
    passages: [{ text: 'Development brings freedom, provided it is development of people.', ref: 'Freedom and Development' }],
    related: ['nkrumah', 'sankara', 'cabral'] }),

  // ---------------- CULTURE & MEMORY (top) ----------------
  W({ id: 'diop', title: 'The African Origin of Civilization', author: 'Cheikh Anta Diop', year: '1974', face: 'culture', image: '/words/art/diop.jpg', file: '/words/books/diop-african-origin-of-civilization.epub', thesis: 'Africa at the root of civilisation.', influence: 86,
    overview: 'Diop marshals history, linguistics, and science to place ancient Egypt and Africa at the source of civilisation.',
    whyItMatters: 'It forced a reckoning with a falsified record and re-grounded African identity in its own deep past.',
    themes: ['History', 'Identity', 'Civilisation', 'Memory'],
    keyIdeas: ['Restoring history is a precondition for restoring a people.', 'Ancient Egypt was an African civilisation.', 'A falsified past produces a colonised present.'],
    passages: [{ text: 'The African historian who evades the problem of Egypt is neither modest nor objective.', ref: 'On method' }],
    related: ['cabral', 'fanon', 'achebe', 'ngugi'] }),
  W({ id: 'achebe', title: 'No Longer at Ease', author: 'Chinua Achebe', year: '1960', face: 'culture', image: '/words/art/achebe.jpg', file: '/words/books/achebe-no-longer-at-ease.pdf', thesis: 'A man caught between village and colony.', influence: 83,
    overview: 'A young Nigerian, educated abroad, is ground between ancestral obligation and the compromises of colonial Lagos.',
    whyItMatters: 'Achebe wrote Africa from the inside, breaking the colonial monopoly on the African story.',
    themes: ['Tradition', 'Modernity', 'Identity', 'Corruption'],
    keyIdeas: ['The collision of inherited duty and modern ambition.', 'Corruption is erosion, not a single fall.', 'You cannot stand between two worlds unscathed.'],
    passages: [{ text: 'A man does not challenge his chi to a wrestling match.', ref: 'On fate' }],
    related: ['diop', 'soyinka', 'ngugi', 'baldwin'] }),
  W({ id: 'hampate-ba', title: 'Amkoullel, the Fula Boy', author: 'Amadou Hampâté Bâ', year: '1991', face: 'culture', image: '/words/art/hampate-ba.jpg', file: '/words/books/amkoullel-the-fula-boy.pdf', thesis: 'Oral memory as living archive.', influence: 75,
    overview: 'A memoir of pre-colonial Mali, where the spoken word is shown to be the truest library of a people.',
    whyItMatters: 'It preserved an entire oral civilisation and gave the world its defining line about African memory.',
    themes: ['Heritage', 'Memory', 'Oral tradition', 'Childhood'],
    keyIdeas: ['In Africa, when an old man dies, a library burns.', 'Memory is a discipline carried by the living.', 'The colonised remember in stories, not archives.'],
    passages: [{ text: 'In Africa, when an old man dies, a library burns to the ground.', ref: 'On oral memory' }],
    related: ['diop', 'achebe'] }),
  W({ id: 'mandela', title: 'Long Walk to Freedom', author: 'Nelson Mandela', year: '1994', face: 'culture', image: '/words/art/mandela.jpg', file: '/words/books/mandela-long-walk-to-freedom.epub', thesis: 'A life given to the long struggle.', influence: 95,
    overview: 'Mandela’s autobiography — from rural childhood through 27 years in prison to the presidency and reconciliation.',
    whyItMatters: 'It is the modern world’s great parable of endurance, forgiveness, and the discipline of freedom.',
    themes: ['Freedom', 'Endurance', 'Reconciliation', 'Leadership'],
    keyIdeas: ['Freedom is indivisible — the oppressor is unfree too.', 'Courage is the triumph over fear, not its absence.', 'After one hill, there are always more hills.'],
    passages: [{ text: 'It always seems impossible until it’s done.', ref: 'On perseverance' }],
    related: ['biko', 'malcolm-x', 'diop'] }),
  W({ id: 'fela', title: 'Afrobeat, Rebellion & Philosophy', author: 'Fela Kuti', year: '2018', face: 'culture', image: '/words/art/fela.jpg', file: '/words/books/fela-afrobeat-philosophy.pdf', thesis: 'Music as political weapon.', influence: 79,
    overview: 'The life and thought of the Afrobeat pioneer who turned the concert stage into a front line against military rule.',
    whyItMatters: 'Fela fused sound and dissent so completely that his music remains a template for protest art.',
    themes: ['Music', 'Rebellion', 'Pan-Africanism', 'Power'],
    keyIdeas: ['Music is the weapon of the future.', 'Culture is resistance you can dance to.', 'The artist must be the conscience of the nation.'],
    passages: [{ text: 'Music is the weapon of the future.', ref: 'On Afrobeat' }],
    related: ['sankara', 'soyinka', 'baldwin'] }),
  W({ id: 'said', title: 'Orientalism', author: 'Edward Said', year: '1978', face: 'culture', image: '/words/art/said.jpg', file: null, thesis: 'How the West invented the East.', influence: 90,
    overview: 'Said shows how Western scholarship constructed “the Orient” as a fiction that served empire.',
    whyItMatters: 'It founded postcolonial studies and changed how the humanities read power inside knowledge.',
    themes: ['Postcolonialism', 'Representation', 'Power', 'Knowledge'],
    keyIdeas: ['Knowledge of the other is a form of power over it.', 'The Orient was a European invention.', 'Every text carries its politics.'],
    passages: [{ text: 'Every empire tells itself and the world that it is unlike all other empires.', ref: 'On empire' }],
    related: ['fanon', 'ngugi', 'diop'] }),
  W({ id: 'ngugi', title: 'Decolonising the Mind', author: 'Ngũgĩ wa Thiong’o', year: '1986', face: 'culture', image: '/words/art/ngugi.jpg', file: null, thesis: 'Language is the carrier of culture — and of control.', influence: 84,
    overview: 'Ngũgĩ renounces English for Gikuyu and argues that the deepest colonisation is of language and the mind.',
    whyItMatters: 'It reframed the language of African literature as the central battleground of liberation.',
    themes: ['Language', 'Decolonisation', 'Culture', 'Memory'],
    keyIdeas: ['Language is the carrier of a people’s culture.', 'The bullet was followed by the language.', 'To control a people, control their stories.'],
    passages: [{ text: 'The bullet was the means of the physical subjugation. Language was the means of the spiritual subjugation.', ref: 'On the colonisation of the mind' }],
    related: ['said', 'diop', 'achebe', 'fanon'] }),
  W({ id: 'soyinka', title: 'The Man Died', author: 'Wole Soyinka', year: '1972', face: 'culture', image: '/words/art/soyinka.jpg', file: null, thesis: 'Prison notes of a conscience that would not be silenced.', influence: 80,
    overview: 'The Nobel laureate’s notes from solitary confinement during the Nigerian civil war — art against the silence of power.',
    whyItMatters: 'It stands as a landmark of the writer’s duty to bear witness against tyranny.',
    themes: ['Conscience', 'Power', 'Witness', 'Freedom'],
    keyIdeas: ['The man dies in all who keep silent in the face of tyranny.', 'Justice is the first condition of humanity.', 'Memory is resistance.'],
    passages: [{ text: 'The man dies in all who keep silent in the face of tyranny.', ref: 'On silence' }],
    related: ['achebe', 'fela', 'baldwin'] }),
  W({ id: 'baldwin', title: 'The Fire Next Time', author: 'James Baldwin', year: '1963', face: 'culture', image: '/words/art/baldwin.jpg', file: null, thesis: 'A reckoning with race, love, and America.', influence: 92,
    overview: 'Two essays — a letter to his nephew and a meditation on faith and race — that lay America’s racial wound bare.',
    whyItMatters: 'Baldwin’s prose remains the moral conscience of the American conversation on race.',
    themes: ['Race', 'Identity', 'Love', 'America'],
    keyIdeas: ['Not everything faced can be changed; nothing can be changed until faced.', 'Love takes off the masks we cannot live without.', 'History is present in all we do.'],
    passages: [{ text: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.', ref: 'The Fire Next Time' }],
    related: ['malcolm-x', 'soyinka', 'said'] }),

  // ---------------- AUTHOR / PERSONAL (bottom) ----------------
  W({ id: 'author-entropy', title: 'Entropy', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-entropy.png', file: null, thesis: 'On decay, order, and the cost of building anything that lasts.', influence: 50,
    overview: 'An essay on the second law as a life philosophy — why everything tends toward disorder, and what it costs to push back.',
    whyItMatters: 'A personal attempt to make peace with impermanence while still choosing to build.',
    themes: ['Order', 'Decay', 'Systems', 'Time'],
    keyIdeas: ['Order is borrowed, never owned.', 'Maintenance is the truest form of love.', 'To build is to argue with entropy.'],
    passages: [{ text: 'Everything you love is a fire you have agreed to keep feeding.', ref: 'Draft' }],
    related: ['author-discipline', 'author-becoming'] }),
  W({ id: 'author-identity', title: 'Identity Architecture', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-identity.png', file: null, thesis: 'Designing the self the way one designs a system.', influence: 52,
    overview: 'Field notes on treating identity as architecture — load-bearing values, replaceable façades, deliberate structure.',
    whyItMatters: 'A working theory of how to author a self on purpose rather than by accident.',
    themes: ['Identity', 'Design', 'Self', 'Structure'],
    keyIdeas: ['Values are load-bearing; tastes are cladding.', 'You renovate the self in place — never demolish.', 'Coherence is a design constraint.'],
    passages: [{ text: 'You are the only building you will ever live in and never finish.', ref: 'Draft' }],
    related: ['author-becoming', 'author-malcolm-project'] }),
  W({ id: 'author-malcolm-project', title: 'Malcolm Project', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-malcolm-project.png', file: null, thesis: 'Research into reinvention, discipline, and becoming.', influence: 55,
    overview: 'An ongoing study of self-reinvention modelled on the most thorough life-rebuild on record.',
    whyItMatters: 'A personal curriculum for total transformation, drawn from the archive’s greatest example of it.',
    themes: ['Research', 'Discipline', 'Becoming', 'Reinvention'],
    keyIdeas: ['Reinvention is a method, not an accident.', 'Read your way out of every cage.', 'The self is a project with no deadline.'],
    passages: [{ text: 'Discipline is just memory of who you said you would become.', ref: 'Draft' }],
    related: ['malcolm-x', 'author-discipline', 'author-identity'] }),
  W({ id: 'author-letters', title: 'Letters to My Future Self', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-letters.png', file: null, thesis: 'Correspondence across time.', influence: 48,
    overview: 'A sequence of letters written forward in time — what I want to remember I once knew.',
    whyItMatters: 'A practice of accountability to a person who does not exist yet.',
    themes: ['Memory', 'Time', 'Reflection', 'Hope'],
    keyIdeas: ['Write to who you’re becoming, not who you are.', 'The future reads everything you postpone.', 'Memory is a letter you forgot to mail.'],
    passages: [{ text: 'If you are reading this, you survived the part I am afraid of.', ref: 'Letter I' }],
    related: ['author-reality', 'author-becoming'] }),
  W({ id: 'author-reality', title: 'Thoughts on Reality', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-reality.png', file: null, thesis: 'Fragments on perception, system, and meaning.', influence: 47,
    overview: 'Loose fragments and drafts on how perception builds the world we then mistake for given.',
    whyItMatters: 'A notebook for the questions that do not fit anywhere else.',
    themes: ['Perception', 'Meaning', 'Fragments', 'Mind'],
    keyIdeas: ['Reality is the model we forget is a model.', 'Attention is the editor of the real.', 'Meaning is assigned, never found.'],
    passages: [{ text: 'You do not see the world; you see your map of it, lit from inside.', ref: 'Fragment' }],
    related: ['author-letters', 'hawkins'] }),
  W({ id: 'author-becoming', title: 'Notes on Becoming', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-becoming.png', file: null, thesis: 'The self as a verb.', influence: 51,
    overview: 'Short notes on growth as the only stable state — becoming rather than being.',
    whyItMatters: 'A reminder that identity is motion, written to a self that wants to stop.',
    themes: ['Growth', 'Change', 'Self', 'Discipline'],
    keyIdeas: ['Being is a snapshot of becoming.', 'Comfort is the enemy of the next self.', 'You arrive only by leaving.'],
    passages: [{ text: 'The person you are is the toll for the person you are becoming.', ref: 'Note' }],
    related: ['author-identity', 'nietzsche', 'author-discipline'] }),
  W({ id: 'author-field-notes', title: 'Field Notes', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-field-notes.png', file: null, thesis: 'Observations from the living archive.', influence: 46,
    overview: 'Raw observations gathered while building OWAH.WORLD — what the work teaches about the maker.',
    whyItMatters: 'The record of a system learning to describe itself.',
    themes: ['Observation', 'Process', 'System', 'Craft'],
    keyIdeas: ['The work tells you who you are by what you keep.', 'Document before you understand.', 'A system is autobiography in disguise.'],
    passages: [{ text: 'Every archive is a self-portrait the archivist denies making.', ref: 'Field note' }],
    related: ['author-reality', 'author-drafts'] }),
  W({ id: 'author-discipline', title: 'The Discipline', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-discipline.png', file: null, thesis: 'On the daily practice of becoming.', influence: 53,
    overview: 'A study of discipline not as restriction but as the architecture of freedom.',
    whyItMatters: 'The operating manual behind every other project here.',
    themes: ['Discipline', 'Freedom', 'Habit', 'Will'],
    keyIdeas: ['Discipline is freedom scheduled in advance.', 'Motivation is weather; discipline is climate.', 'You do not rise to your goals; you fall to your systems.'],
    passages: [{ text: 'Freedom is the most expensive thing discipline ever buys you.', ref: 'Draft' }],
    related: ['author-entropy', 'marcus-aurelius', 'author-becoming'] }),
  W({ id: 'author-drafts', title: 'Drafts & Fragments', author: 'OWAH', year: 'in progress', face: 'author', image: '/words/art/author-drafts.png', file: null, thesis: 'The unfinished, kept on purpose.', influence: 45,
    overview: 'A holding space for the unfinished — the offcuts that are not ready but worth keeping.',
    whyItMatters: 'Proof that the archive is alive: still being written.',
    themes: ['Process', 'Incompleteness', 'Craft', 'Time'],
    keyIdeas: ['The unfinished is where the truth still moves.', 'Keep the offcuts; they become the next thing.', 'Nothing here is final, on purpose.'],
    passages: [{ text: 'A finished thing stops teaching you. Keep one corner wet.', ref: 'Fragment' }],
    related: ['author-field-notes', 'author-reality'] }),
]

export const WORK_BY_ID: Record<string, ArchiveWork> = ARCHIVE_WORKS.reduce(
  (acc, w) => ({ ...acc, [w.id]: w }),
  {} as Record<string, ArchiveWork>,
)

export function worksForFace(face: FaceId): ArchiveWork[] {
  return ARCHIVE_WORKS.filter((w) => w.face === face).slice(0, 9)
}

// ---------------- Cube geometry ----------------

export const CUBE_SIZE = 2.4
const HALF = CUBE_SIZE / 2

/** 3x3 grid slot in a face's local plane (origin centre, +Z outward). */
export const GRID = 3
export const TILE_STEP = CUBE_SIZE / GRID
export const TILE_SIZE = TILE_STEP * 0.965

export function gridSlot(index: number): [number, number] {
  const col = index % GRID
  const row = Math.floor(index / GRID)
  const x = (col - 1) * TILE_STEP
  const y = (1 - row) * TILE_STEP
  return [x, y]
}

/** Transform that places a face group onto its cube side, +Z facing outward. */
export function faceTransform(side: CubeSide): { position: [number, number, number]; rotation: [number, number, number] } {
  switch (side) {
    case 'front':
      return { position: [0, 0, HALF], rotation: [0, 0, 0] }
    case 'back':
      return { position: [0, 0, -HALF], rotation: [0, Math.PI, 0] }
    case 'right':
      return { position: [HALF, 0, 0], rotation: [0, Math.PI / 2, 0] }
    case 'left':
      return { position: [-HALF, 0, 0], rotation: [0, -Math.PI / 2, 0] }
    case 'top':
      return { position: [0, HALF, 0], rotation: [-Math.PI / 2, 0, 0] }
    case 'bottom':
      return { position: [0, -HALF, 0], rotation: [Math.PI / 2, 0, 0] }
  }
}

/** Cube orientation (Euler x,y) that brings a side to face the camera (+Z). */
export function faceOrientation(side: CubeSide): { x: number; y: number } {
  switch (side) {
    case 'front':
      return { x: 0, y: 0 }
    case 'back':
      return { x: 0, y: Math.PI }
    case 'left':
      return { x: 0, y: Math.PI / 2 }
    case 'right':
      return { x: 0, y: -Math.PI / 2 }
    case 'top':
      return { x: Math.PI / 2, y: 0 }
    case 'bottom':
      return { x: -Math.PI / 2, y: 0 }
  }
}

const OVERVIEW_CAMERA: CameraState = { position: [3.4, 2.4, 5.2], fov: 44, target: [0, 0, 0] }
const FACE_CAMERA: CameraState = { position: [0.6, 0.4, 5.4], fov: 42, target: [-1.2, 0.1, 0] }
const WORK_CAMERA: CameraState = { position: [0.4, 0.2, 5.2], fov: 40, target: [-1.5, 0.1, 0] }

/** Cube is shifted left in face/work modes so the reading panel owns the right. */
export const CUBE_SHIFT_X: Record<ArchiveModeLite, number> = { overview: 0, face: -1.2, work: -1.5 }

export function cameraForMode(mode: ArchiveModeLite): CameraState {
  if (mode === 'work') return WORK_CAMERA
  if (mode === 'face') return FACE_CAMERA
  return OVERVIEW_CAMERA
}
type ArchiveModeLite = 'overview' | 'face' | 'work'

export function nextFace(current: FaceId, direction: 1 | -1): FaceId {
  const i = FACE_ORDER.indexOf(current)
  return FACE_ORDER[(i + direction + FACE_ORDER.length) % FACE_ORDER.length]
}
