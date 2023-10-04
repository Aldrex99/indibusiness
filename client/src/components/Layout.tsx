import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  ChevronDownIcon,
  DocumentIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
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

// const teams = [
//   {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
//   {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
//   {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
// ]
const userNavigation = [
  {name: 'Your profile', href: '#'},
  {name: 'Sign out', href: '#'},
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
          <div className="p-1">
            <div
              className="sticky top-1 rounded z-40 flex h-12 shrink-0 items-center gap-x-4 bg-themed-insert px-4 sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" className="-m-2.5 p-2.5 text-themed-text lg:hidden"
                      onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
              </button>

              {/* Separator */}
              <div className="h-6 w-px bg-themed-text lg:hidden" aria-hidden="true"/>

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-themed-text"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="bg-transparent block h-full w-full border-0 py-0 pl-8 pr-0 text-themed-text placeholder:text-themed-text/50 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button type="button"
                          className="-m-2.5 p-2 text-themed-text rounded-full hover:bg-nav-element-hover">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                  </button>

                  {/* Separator */}
                  <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-themed-text" aria-hidden="true"/>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="h-8 w-8 rounded-full text-themed-text" aria-hidden="true"/>
                      <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-themed-text" aria-hidden="true">
                        Tom Cook
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({active}) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
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