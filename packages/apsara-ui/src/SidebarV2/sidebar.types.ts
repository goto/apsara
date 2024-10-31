import { ReactNode } from "react";

interface LinkLocation {
    pathname: string;
    search?: string;
    state?: Record<string, unknown>;
    hash?: string;
    key?: string;
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string | LinkLocation;
}

export interface NavigationSidebarList {
    state: string;
    defaultOpen?: boolean;
    linkProps?: LinkProps;
    content: ReactNode;
    icon?: ReactNode;
    className?: string;
    highlight?: ReactNode;
    child?: NavigationSidebarList[];
}

export interface LinkRenderProps {
    children: ReactNode;
    props: LinkProps;
}

export interface SiderMenuProps extends NavigationSidebarList {
    activeState: string;
    linkRender?: ({ children, props }: LinkRenderProps) => ReactNode;
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
    name?: string;
    logo?: ReactNode;
}
