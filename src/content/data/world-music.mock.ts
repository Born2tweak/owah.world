export type MusicTrack = {
  id: string
  title: string
  artist: string
  albumArt: string
  duration: string
}

export type MusicPlaylist = {
  id: string
  title: string
  tracks: number
  cover: string
}

export type MusicArtist = {
  id: string
  name: string
  avatar: string
}

export const MUSIC_RECENT: MusicTrack[] = [
  { id: '1', title: 'Take My Breath', artist: 'The Weeknd', albumArt: 'linear-gradient(135deg,#1a1a2e,#16213e)', duration: '3:42' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'linear-gradient(135deg,#2d1b69,#11998e)', duration: '3:20' },
  { id: '3', title: 'Starboy', artist: 'The Weeknd', albumArt: 'linear-gradient(135deg,#0f0c29,#302b63)', duration: '3:50' },
  { id: '4', title: 'After Hours', artist: 'The Weeknd', albumArt: 'linear-gradient(135deg,#200122,#6f0000)', duration: '4:01' },
]

export const MUSIC_PLAYLISTS: MusicPlaylist[] = [
  { id: 'gym', title: 'Gym', tracks: 51, cover: 'linear-gradient(145deg,#0f2027,#203a43,#2c5364)' },
  { id: 'night', title: 'Night Drive', tracks: 34, cover: 'linear-gradient(145deg,#141e30,#243b55)' },
  { id: 'focus', title: 'Deep Focus', tracks: 28, cover: 'linear-gradient(145deg,#1f4037,#99f2c8)' },
  { id: 'chill', title: 'Chill Wave', tracks: 42, cover: 'linear-gradient(145deg,#373b44,#4286f4)' },
]

export const MUSIC_ARTISTS: MusicArtist[] = [
  { id: 'a1', name: 'The Weeknd', avatar: 'linear-gradient(135deg,#434343,#000000)' },
  { id: 'a2', name: 'Daft Punk', avatar: 'linear-gradient(135deg,#c31432,#240b36)' },
  { id: 'a3', name: 'Tyler', avatar: 'linear-gradient(135deg,#ff512f,#dd2476)' },
  { id: 'a4', name: 'Radiohead', avatar: 'linear-gradient(135deg,#232526,#414345)' },
  { id: 'a5', name: 'Kendrick', avatar: 'linear-gradient(135deg,#000428,#004e92)' },
]

export const MUSIC_TABS = ['Overview', 'Recent', 'Playlists', 'Top Artists', 'Saved'] as const

export const MUSIC_NOW_PLAYING: MusicTrack = MUSIC_RECENT[0]
