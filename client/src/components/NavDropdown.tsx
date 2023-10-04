import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { INavigation } from "../types/Layout.type.ts";
import { classNames } from "../utils/classeNames.ts";
import NavLink from "./NavLink.tsx";

export default function NavDropdown({category, items}: INavigation) {
  return (
    category && items ? (
      <Menu as="ul" className="relative inline-block text-left">
        {({open}) => (
          <>
            <div>
              <Menu.Button
                className={
                  classNames(
                    open ? 'bg-nav-element-deployed' : 'hover:bg-nav-element-hover',
                    "flex justify-between w-10/12 rounded-r-full px-2 py-2 font-medium text-themed-text focus:outline-none"
                  )}
              >
                <div>
                <span className="flex items-center">
                <category.icon className="w-5 h-5 mr-2"/>
                  {category.name}
                </span>
                </div>
                {open ? (
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
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {open && (
                <Menu.Items static
                            className="w-10/12 rounded-r-full focus:outline-none">
                  {items.map((item) => (
                    <Menu.Item key={item.name}>
                      <NavLink
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