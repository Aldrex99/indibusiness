import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type TItem = {
  name: string;
  to: string;
  current: boolean;
  icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>>;
}

export interface INavigation {
  category?: {
    name: string;
    icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>>;
  }
  items?: TItem[];
  item?: TItem;
  setSidebarOpen?: (value: boolean) => void;
}

export interface IMobileNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  navigation: INavigation[];
  theme: string;
  color: string;
}

export interface IDesktopVerticalNavProps {
  navigation: INavigation[];
  theme: string;
  color: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  collapsedHover?: boolean;
  setCollapsedHover?: (value: boolean) => void;
}