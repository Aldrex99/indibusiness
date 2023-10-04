import { IDesktopVerticalNavProps } from "../types/Layout.type.ts";
import Logo from "../assets/Logo.tsx";
import NavDropdownCollapsed from "./NavDropdownCollapsed.tsx";
import NavLinkCollapsed from "./NavLinkCollapsed.tsx";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function DesktopVerticalCollapsedNav({
                                                      navigation,
                                                      theme,
                                                      color,
                                                      setCollapsedHover
                                                    }: IDesktopVerticalNavProps) {
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className={`${theme + " " + color} hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-20 lg:flex-col`}
           onMouseEnter={() => setCollapsedHover ? setCollapsedHover(true) : null}
           onMouseLeave={() => setCollapsedHover ? setCollapsedHover(false) : null}
      >
        <div className="flex grow flex-col overflow-y-auto">
          <div
            className="flex h-16 shrink-0 mx-2 items-center text-primary">
            <Logo/>
          </div>
          <nav className="flex flex-col pr-2">
            {navigation.map((navigationItem) => (
              navigationItem.category && navigationItem.items ? (
                <NavDropdownCollapsed key={navigationItem.category.name} category={navigationItem.category}
                                      items={navigationItem.items}/>
              ) : (
                <NavLinkCollapsed key={navigationItem.item?.name} item={navigationItem.item!}/>
              )
            ))}
          </nav>
          <div className="flex flex-1"/>
          <div className="flex flex-col pr-2 pb-1 items-center justify-center">
            <NavLinkCollapsed item={{
              name: "Paramètres",
              to: "/settings",
              icon: Cog6ToothIcon,
              current: (window.location.pathname === "/settings")
            }}/>
          </div>
        </div>
      </div>
    </>
  )
}