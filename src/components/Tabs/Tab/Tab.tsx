import { FC } from 'react'

import { ViewType } from '../../../types'
import cls from '../Tabs.module.css'

type PropsType = {
  title: ViewType
  active: boolean
  onClick: () => void
}
export const Tab: FC<PropsType> = ({ title, active, onClick }) => {
  const buttonStyles = cls.tab + (active ? ' ' + cls.active : '')

  return (
    <button onClick={onClick} className={buttonStyles}>
      {title}
    </button>
  )
}
