import './styles/App.css'
import { useState } from 'react'

import { v1 } from 'uuid'

import { Tabs } from './components/Tabs/Tabs.tsx'

export type ViewType = 'Смотрю' | 'В планах' | 'Просмотрено' | 'Брошено' | 'Любимое'

export type ListType = {
  id: string
  title: ViewType
}

export type AnimeType = {
  id: string
  title: string
  image: string
  rating: number
  votesCount: number
  releaseDate: Date
}

export type AnimeListsType = {
  [key: string]: AnimeType[]
}

const App = () => {
  const animeListId_1 = v1()
  const animeListId_2 = v1()
  const animeListId_3 = v1()
  const animeListId_4 = v1()
  const animeListId_5 = v1()

  const [lists, setLists] = useState<ListType[]>([
    { id: animeListId_1, title: 'Смотрю' },
    { id: animeListId_2, title: 'В планах' },
    { id: animeListId_3, title: 'Просмотрено' },
    { id: animeListId_4, title: 'Брошено' },
    { id: animeListId_5, title: 'Любимое' },
  ])

  const [animeLists, setAnimeLists] = useState<AnimeListsType>({
    [animeListId_1]: [],
    [animeListId_2]: [],
    [animeListId_3]: [],
    [animeListId_4]: [],
    [animeListId_5]: [],
  })

  return (
    <>
      <Tabs lists={lists} animeLists={animeLists} />
    </>
  )
}

export default App
