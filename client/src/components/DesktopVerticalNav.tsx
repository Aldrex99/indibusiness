import LogoText from "../assets/LogoText.tsx";
import NavDropdown from "./NavDropdown.tsx";
import NavLink from "./NavLink.tsx";
import { IDesktopVerticalNavProps } from "../types/Layout.type.ts";

export default function DesktopVerticalNav({
                                             navigation,
                                             theme,
                                             color,
                                             collapsed,
                                             setCollapsed,
                                             setCollapsedHover
                                           }: IDesktopVerticalNavProps) {
  return (
    <>
      {/* Static sidebar for desktop */}
      <div className={`${theme + " " + color} hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col`}
           onMouseEnter={() => !collapsed && setCollapsedHover ? setCollapsedHover(true) : null}
           onMouseLeave={() => collapsed && setCollapsedHover ? setCollapsedHover(false) : null}
      >
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col overflow-y-auto">
          <div
            className="flex h-16 shrink-0 mr-16 ml-2 items-center text-primary">
            <LogoText/>
            <div className="absolute right-0 top-0 flex h-16 w-16 justify-center items-center">
              <div
                className={`${theme} ${color} flex justify-center items-center w-5 rounded-full h-5 border-2 border-primary cursor-pointer`}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed &&
                  <div
                    className={`bg-primary h-3 w-3 rounded-full`}/>
                }
              </div>
            </div>
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
          </nav>
        </div>
      </div>
    </>
  )
}