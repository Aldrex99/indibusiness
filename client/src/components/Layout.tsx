import { useState } from 'react'
import {
  HomeIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav.tsx";
import { INavigation } from "../types/Layout.type.ts";


const navigations: INavigation[] = [
  {
    category: {
      name: 'Dashboard',
      icon: HomeIcon
    },
    items: [
      {name: '1.Home', to: '/', current: false},
      {name: '1.Item 1', to: '/1item1', current: false},
      {name: '1.Item 2', to: '/1item2', current: false},
      {name: '1.Item 3', to: '/1item3', current: false},
      {name: '1.Item 4', to: '/1item4', current: false},
      {name: '1.Item 5', to: '/1item5', current: false},
    ],
  },
  {
    item: {
      name: 'Item 6',
      to: '/item6',
      current: false
    }
  },
  {
    category: {
      name: 'Documents',
      icon: DocumentIcon
    },
    items: [
      {name: '2.Home', to: '/', current: false},
      {name: '2.Item 1', to: '/2item1', current: false},
      {name: '2.Item 2', to: '/2item2', current: false},
      {name: '2.Item 3', to: '/2item3', current: false},
      {name: '2.Item 4', to: '/2item4', current: false},
      {name: '2.Item 5', to: '/2item5', current: false},
    ],
  },
]

export default function Layout() {
  const [theme, setTheme] = useState('dark')
  const [color, setColor] = useState('turquoise')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const actualPath = useLocation().pathname;


  navigations.map((navigation) => {
    if (navigation.items) {
      navigation.items.map((item) => {
        item.current = item.to === actualPath;
      })
    } else {
      if (navigation.item) {
        navigation.item.current = navigation.item.to === actualPath;
      }
    }
  })

  return (
    <>
      <div className={`${theme} ${color}`}>
        <MobileNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigations}
          theme={theme}
          color={color}
        />
      </div>
    </>
  )
}