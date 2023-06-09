import { FC, useState } from 'react'

import { AnimeType } from '../../../App.tsx'
import cls from '../Tabs.module.css'

type SortByType = null | 'title' | 'rating' | 'episodes' | 'type'
type SortDirectionType = 'asc' | 'desc'

type PropsType = {
  animeList: AnimeType[]
}
export const Table: FC<PropsType> = ({ animeList }) => {
  const [sortBy, setSortBy] = useState<SortByType>(null)
  const [sortDirection, setSortDirection] = useState<SortDirectionType>('asc')

  const onChangeSortBy = (field: SortByType) => {
    if (field === sortBy) {
      // Если выбран тот же самый заголовок, меняем направление сортировки
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Если выбран другой заголовок, сбрасываем направление сортировки
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  const getAnimeList = (
    animeList: AnimeType[],
    sortBy: SortByType,
    sortDirection: SortDirectionType
  ) => {
    switch (sortBy) {
      case 'rating':
        return [...animeList].sort((a, b) =>
          sortDirection === 'asc' ? b.rating - a.rating : a.rating - b.rating
        )
      case 'title':
        return [...animeList].sort((a, b) =>
          sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        )
      case 'episodes':
        return [...animeList].sort((a, b) =>
          sortDirection === 'asc' ? b.episodes - a.episodes : a.episodes - b.episodes
        )
      case 'type':
        return [...animeList].sort((a, b) =>
          sortDirection === 'asc' ? b.type.localeCompare(a.type) : a.type.localeCompare(b.type)
        )
      default:
        return animeList
    }
  }

  const animeListMap = getAnimeList(animeList, sortBy, sortDirection).map((anime, index) => {
    return (
      <tr key={anime.id}>
        <th>{index + 1}</th>
        <td>
          <img src={anime.image} alt={`Постер аниме ${anime.title}`} />
        </td>
        <td>{anime.title}</td>
        <td>{anime.rating}</td>
        <td>{anime.episodes}</td>
        <td>{anime.type}</td>
      </tr>
    )
  })

  return (
    <table className={cls.table}>
      <thead>
        <tr>
          <th onClick={() => onChangeSortBy(null)}>#</th>
          <th></th>
          <th onClick={() => onChangeSortBy('title')}>Название</th>
          <th onClick={() => onChangeSortBy('rating')}>Рейтинг</th>
          <th onClick={() => onChangeSortBy('episodes')}>Эпизоды</th>
          <th onClick={() => onChangeSortBy('type')}>Тип</th>
        </tr>
      </thead>
      {!!animeList.length && <tbody>{animeListMap}</tbody>}
    </table>
  )
}
