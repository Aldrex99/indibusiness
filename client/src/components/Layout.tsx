import { useState } from 'react'
import {
  Bars3Icon,
  HomeIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'
import { useLocation } from "react-router-dom";
import { INavigation } from "../types/Layout.type.ts";
import { classNames } from "../utils/classeNames.ts";
import MobileNav from "./MobileNav.tsx";
import DesktopVerticalNav from "./DesktopVerticalNav.tsx";
import DesktopVerticalCollapsedNav from "./DesktopVerticalCollapsedNav.tsx";

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
  const [collapsed, setCollapsed] = useState(false)
  const [collapsedHover, setCollapsedHover] = useState(false)

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
      <div className={`${theme + " " + color} bg-themed-bg h-full`}>
        <MobileNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigations}
          theme={theme}
          color={color}
        />

        {!collapsed || collapsedHover ? (
          <DesktopVerticalNav
            navigation={navigations}
            theme={theme}
            color={color}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setCollapsedHover={setCollapsedHover}
          />
        ) : (
          <DesktopVerticalCollapsedNav
            navigation={navigations}
            theme={theme}
            color={color}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            collapsedHover={collapsedHover}
            setCollapsedHover={setCollapsedHover}
          />
        )}

        <div className={classNames(!collapsed || collapsedHover ? "lg:pl-72" : "lg:pl-20")}>
          <div className="px-1">
            <div
              className="lg:hidden sticky top-1 rounded-b z-40 flex h-12 shrink-0 items-center gap-x-4 bg-themed-insert px-4 sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" className="-m-2.5 p-2.5 text-themed-text lg:hidden"
                      onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
              </button>
            </div>
          </div>
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{/* Your content */}</div>
          </main>
        </div>
      </div>
    </>
  )
}