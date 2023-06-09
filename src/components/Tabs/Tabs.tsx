import { FC, useState } from 'react'

import { AnimeListsType, ListType, ViewType } from '../../App.tsx'

import { Tab } from './Tab/Tab.tsx'
import { Table } from './Table/Table.tsx'
import cls from './Tabs.module.css'

type PropsType = {
  lists: ListType[]
  animeLists: AnimeListsType
}
export const Tabs: FC<PropsType> = ({ lists, animeLists }) => {
  const [activeTab, setActiveTab] = useState<ViewType>('Смотрю')

  const onChangeActiveTab = (tab: ViewType) => {
    setActiveTab(tab)
  }

  const list = lists.find(list => list.title === activeTab)
  const animeList = list ? animeLists[list.id] : []

  const tabsMap = lists.map(list => {
    const onClick = () => onChangeActiveTab(list.title)

    return (
      <Tab key={list.id} title={list.title} active={activeTab === list.title} onClick={onClick} />
    )
  })

  return (
    <div className={cls.container}>
      <div className={cls.tabs}>{tabsMap}</div>
      <Table animeList={animeList} />
      {list && !animeLists[list.id].length && <span>Список пуст</span>}
    </div>
  )
}
