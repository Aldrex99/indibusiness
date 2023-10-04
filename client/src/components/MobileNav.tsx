import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoText from "../assets/LogoText.tsx";
import NavDropdown from "./NavDropdown.tsx";
import { IMobileNavProps } from "../types/Layout.type.ts";
import NavLink from "./NavLink.tsx";

export default function MobileNav({sidebarOpen, setSidebarOpen, navigation, theme, color}: IMobileNavProps) {
  // Mobile Navigation
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      {/*Mobile blur background*/}
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-[2px]"/>
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                  <button type="button" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className={`${theme + " " + color} h-6 w-6 text-themed-text`} aria-hidden="true"/>
                  </button>
                </div>
              </Transition.Child>
              <div className={`${theme + " " + color} flex grow flex-col gap-y-5 overflow-y-auto bg-themed-insert`}>
                <div className="flex h-16 shrink-0 mr-16 ml-2 items-center text-primary">
                  <LogoText/>
                </div>
                <nav className="flex flex-1 flex-col pr-2">
                  {navigation.map((navigationItem) => (
                    navigationItem.category && navigationItem.items ? (
                      <NavDropdown key={navigationItem.category.name} category={navigationItem.category}
                                   items={navigationItem.items}/>
                    ) : (
                      <NavLink key={navigationItem.item?.name} item={navigationItem.item!}/>
                    )
                  ))}
                  <div className="flex flex-1"/>
                  <div className="flex flex-col pb-1 items-center justify-center">
                    <NavLink item={{
                      name: "Paramètres",
                      to: "/settings",
                      icon: Cog6ToothIcon,
                      current: (window.location.pathname === "/settings")
                    }}/>
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}