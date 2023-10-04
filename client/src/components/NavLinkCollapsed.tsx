import { Link } from "react-router-dom";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { classNames } from "../utils/classeNames.ts";
import { TItem } from "../types/Layout.type.ts";

export default function NavLinkCollapsed({item, dropdown = false}: {
  item: TItem,
  dropdown?: boolean
}) {
  return (
    item &&
    <Link
      to={item.to}
      className={
        classNames(
          item.current ? 'bg-primary-gradient text-primary-text' : 'hover:bg-nav-element-hover',
          dropdown ? 'pl-5' : 'px-2',
          'group flex rounded-r-full w-full items-center py-2 text-themed-text my-0.5'
        )}>
      {item.icon ? <item.icon className={`${dropdown ? "w-5 h-5" : "w-6 h-6"} mr-2`}/> :
        <HashtagIcon className={`${dropdown ? "w-5 h-5" : "w-6 h-6"} mr-2`}/>}
    </Link>
  )
}