export type ViewType = 'Смотрю' | 'В планах' | 'Просмотрено' | 'Брошено' | 'Любимое'

export type ListType = {
  id: string
  title: ViewType
}

export type AnimeType = {
  id: string
  title: string
  image: string
  type: 'TV' | 'OVA' | 'film'
  episodes: number
  rating: number
  created_at: Date
}

export type AnimeInputModelType = Omit<AnimeType, 'id' | 'created_at'>

export type AnimeListsType = {
  [key: string]: AnimeType[]
}
