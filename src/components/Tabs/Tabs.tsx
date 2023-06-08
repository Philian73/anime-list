import { FC, useState } from 'react'

import { AnimeListsType, ListType, ViewType } from '../../App.tsx'

import cls from './Tabs.module.css'

type PropsType = {
  lists: ListType[]
  animeLists: AnimeListsType
}
export const Tabs: FC<PropsType> = ({ lists, animeLists }) => {
  const [activeTab, setActiveTab] = useState<ViewType>('Смотрю')

  const onChangeTab = (tab: ViewType) => {
    setActiveTab(tab)
  }

  const list = lists.find(list => list.title === activeTab)

  return (
    <div>
      <div className={cls.buttonsContainer}>
        {lists.map(list => {
          const onClick = () => onChangeTab(list.title)

          return (
            <button
              key={list.id}
              onClick={onClick}
              className={cls.button + (activeTab === list.title ? ' ' + cls.active : '')}
            >
              {list.title}
            </button>
          )
        })}
      </div>
      <ul className={cls.list}>
        {list &&
          animeLists[list.id].map(anime => {
            return (
              <li key={anime.id} className={cls.item}>
                <img src={anime.image} alt={`Постер из аниме ${anime.title}`} />
                <span>{anime.title}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
