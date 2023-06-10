import { ChangeEvent, FC, useState } from 'react'

import { AnimeInputModelType, AnimeListsType, ListType, ViewType } from '../../types'

import { Tab } from './Tab/Tab.tsx'
import { Table } from './Table/Table.tsx'
import cls from './Tabs.module.css'

type PropsType = {
  lists: ListType[]
  animeLists: AnimeListsType
  addAnime: (listId: string, inputs: AnimeInputModelType) => void
}
export const Tabs: FC<PropsType> = ({ lists, animeLists, addAnime }) => {
  const [activeTab, setActiveTab] = useState<ViewType>('Смотрю')
  const [newAnimeValues, setNewAnimeValues] = useState<AnimeInputModelType>({
    title: '',
    image: '',
    type: 'TV',
    episodes: 0,
    rating: 0,
  })

  const onChangeActiveTab = (tab: ViewType) => {
    setActiveTab(tab)
  }

  const list = lists.find(list => list.title === activeTab) as ListType
  const animeList = list ? animeLists[list.id] : []

  const tabsMap = lists.map(list => {
    const onClick = () => onChangeActiveTab(list.title)

    return (
      <Tab key={list.id} title={list.title} active={activeTab === list.title} onClick={onClick} />
    )
  })

  const onNewAnimeValuesChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget

    setNewAnimeValues(prevAnime => ({
      ...prevAnime,
      [name]: value,
    }))
  }

  const addAnimeCallback = () => {
    addAnime(list.id, newAnimeValues)

    setNewAnimeValues({
      title: '',
      image: '',
      type: 'TV',
      episodes: 0,
      rating: 0,
    })
  }

  return (
    <div className={cls.container}>
      <div className={cls.tabs}>{tabsMap}</div>
      <Table animeList={animeList} />
      {!animeList.length && <span>Список пуст</span>}
      <div className={cls.addItem}>
        <h2>Добавить новое аниме</h2>
        <input
          type="text"
          name={'title'}
          value={newAnimeValues.title}
          onChange={onNewAnimeValuesChange}
        />

        <input
          type="text"
          name={'image'}
          value={newAnimeValues.image}
          onChange={onNewAnimeValuesChange}
        />

        <select onChange={onNewAnimeValuesChange} name="type" value={newAnimeValues.type}>
          <option value="TV">TV</option>
          <option value="OVA">OVA</option>
          <option value="film">Film</option>
        </select>

        <input
          type="number"
          name={'episodes'}
          value={newAnimeValues.episodes}
          onChange={onNewAnimeValuesChange}
        />

        <input
          type="number"
          name="rating"
          value={newAnimeValues.rating}
          onChange={onNewAnimeValuesChange}
        />

        <button onClick={addAnimeCallback}>Добавить</button>
      </div>
    </div>
  )
}
