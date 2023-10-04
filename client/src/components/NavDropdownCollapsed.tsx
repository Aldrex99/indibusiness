import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { INavigation } from "../types/Layout.type.ts";
import { classNames } from "../utils/classeNames.ts";
import NavLinkCollapsed from "./NavLinkCollapsed.tsx";
import { useEffect, useState } from "react";

export default function NavDropdownCollapsed({category, items}: INavigation) {
  const [oneOfItemsIsCurrent, setOneOfItemsIsCurrent] = useState(false)

  useEffect(() => {
    const oneOfItemsIsCurrentTemp: boolean = items?.some(item => item.current) || false

    setOneOfItemsIsCurrent(oneOfItemsIsCurrentTemp)
  }, [items])

  return (
    category && items ? (
      <Menu as="ul" className="relative inline-block text-left">
        {({open}) => (
          <>
            <div>
              <Menu.Button
                className={
                  classNames(
                    open || oneOfItemsIsCurrent ? 'bg-nav-element-deployed' : 'hover:bg-nav-element-hover',
                    "flex justify-between w-full rounded-r-full px-2 py-2 font-medium text-themed-text focus:outline-none"
                  )}
              >
                <div>
                <span className="flex items-center">
                <category.icon className="w-6 h-6 mr-2"/>
                </span>
                </div>
                {open || oneOfItemsIsCurrent ? (
                  <ChevronDownIcon
                    className="w-6 h-6"
                    aria-hidden="true"/>
                ) : (
                  <ChevronRightIcon
                    className="w-6 h-6"
                    aria-hidden="true"/>
                )}
              </Menu.Button>
            </div>
            <Transition
              show={open || oneOfItemsIsCurrent}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {open || oneOfItemsIsCurrent && (
                <Menu.Items static
                            className="w-full rounded-r-full focus:outline-none">
                  {items.map((item) => (
                    <Menu.Item key={item.name}>
                      <NavLinkCollapsed
                        item={item}
                        dropdown={true}
                      />
                    </Menu.Item>
                  ))}
                </Menu.Items>
              )}
            </Transition></>
        )}
      </Menu>
    ) : null
  )
}