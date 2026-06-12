export type LifeFeedAssetCategory = 'fits' | 'lifestyle' | 'archive'

export type LifeFeedAsset = {
  id: string
  src: string
  category: LifeFeedAssetCategory
  date?: string
  label?: string
}

export const lifeFeedAssets: LifeFeedAsset[] = [
  {
    id: 'fit-beach-blue-01',
    src: '/world/lifefeed/fits/fit-beach-blue-01.jpg',
    category: 'fits',
    date: '2025-03-24',
    label: 'Beach blue fit',
  },
  {
    id: 'fit-flag-wall-02',
    src: '/world/lifefeed/fits/fit-flag-wall-02.jpg',
    category: 'fits',
    date: '2025-03-24',
    label: 'Flag wall fit',
  },
  {
    id: 'fit-black-jacket-03',
    src: '/world/lifefeed/fits/fit-black-jacket-03.jpg',
    category: 'fits',
    date: '2025-03-24',
    label: 'Black jacket archive',
  },
  {
    id: 'fit-red-lounge-04',
    src: '/world/lifefeed/fits/fit-red-lounge-04.jpg',
    category: 'fits',
    date: '2025-08-22',
    label: 'Red lounge fit',
  },
  {
    id: 'fit-red-jacket-walk-05',
    src: '/world/lifefeed/fits/fit-red-jacket-walk-05.jpg',
    category: 'fits',
    date: '2026-03-20',
    label: 'Red jacket walk',
  },
  {
    id: 'fit-red-leather-mural-06',
    src: '/world/lifefeed/fits/fit-red-leather-mural-06.jpg',
    category: 'fits',
    date: '2026-03-20',
    label: 'Red leather mural',
  },
  {
    id: 'fit-evening-navy-07',
    src: '/world/lifefeed/fits/fit-evening-navy-07.jpg',
    category: 'fits',
    date: '2026-03-21',
    label: 'Evening navy',
  },
  {
    id: 'fit-shadow-black-08',
    src: '/world/lifefeed/fits/fit-shadow-black-08.jpg',
    category: 'fits',
    date: '2026-03-21',
    label: 'Shadow black fit',
  },
  {
    id: 'fit-city-navy-09',
    src: '/world/lifefeed/fits/fit-city-navy-09.jpg',
    category: 'fits',
    date: '2026-03-21',
    label: 'City navy fit',
  },
  {
    id: 'fit-night-plaid-10',
    src: '/world/lifefeed/fits/fit-night-plaid-10.jpg',
    category: 'fits',
    date: '2026-06-02',
    label: 'Night plaid',
  },
  {
    id: 'fit-night-leather-11',
    src: '/world/lifefeed/fits/fit-night-leather-11.jpg',
    category: 'fits',
    date: '2026-06-02',
    label: 'Night leather',
  },
  {
    id: 'fit-night-plaid-shadow-12',
    src: '/world/lifefeed/fits/fit-night-plaid-shadow-12.jpg',
    category: 'fits',
    date: '2026-06-02',
    label: 'Plaid shadow',
  },
  {
    id: 'lifestyle-beach-chair-01',
    src: '/world/lifefeed/lifestyle/lifestyle-beach-chair-01.jpg',
    category: 'lifestyle',
    date: '2023-04-01',
    label: 'Beach fragment',
  },
  {
    id: 'lifestyle-clear-water-02',
    src: '/world/lifefeed/lifestyle/lifestyle-clear-water-02.jpg',
    category: 'lifestyle',
    date: '2023-04-01',
    label: 'Clear water',
  },
  {
    id: 'lifestyle-sunset-water-03',
    src: '/world/lifefeed/lifestyle/lifestyle-sunset-water-03.jpg',
    category: 'lifestyle',
    date: '2025-08-22',
    label: 'Sunset water',
  },
  {
    id: 'lifestyle-field-signal-04',
    src: '/world/lifefeed/lifestyle/lifestyle-field-signal-04.jpg',
    category: 'lifestyle',
    date: '2025-08-22',
    label: 'Field signal',
  },
  {
    id: 'archive-art-lounge-01',
    src: '/world/lifefeed/archive/archive-art-lounge-01.jpg',
    category: 'archive',
    date: '2026-03-20',
    label: 'Art lounge',
  },
  {
    id: 'archive-mural-wall-02',
    src: '/world/lifefeed/archive/archive-mural-wall-02.jpg',
    category: 'archive',
    date: '2026-03-20',
    label: 'Mural wall',
  },
]
