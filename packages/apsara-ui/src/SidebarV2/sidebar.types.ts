import { ReactNode } from "react";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?:
        | string
        | {
              pathname?: string;
              search?: string;
              state?: string;
              hash?: string;
              key?: string;
          };
    children?: React.ReactNode;
}

export interface NavigationSidebarList {
    state: string;
    linkProps: LinkProps;
    icon?: ReactNode;
    child?: NavigationSidebarList[];
}

export interface LinkRenderProps {
    children: ReactNode;
    props: LinkProps;
}

export interface SiderMenuProps extends NavigationSidebarList {
    activeState: string;
    onItemClick?: (state: string) => void;
    linkRender: ({ children, props }: LinkRenderProps) => ReactNode;
}

export interface collapsedProps {
    onClick?: (collapsed: boolean) => void;
}

export interface HeaderProps {
    name?: string;
    logo?: ReactNode;
}

export interface SidebarProps {
    children?: ReactNode;
    width?: number;
    collapsedWidth?: number;
    keyLocalStorage?: string;
}

export interface SideBarHeaderProps {
    name: string;
    logo: ReactNode;
}
