import React from "react";
import { SidebarNav, SidebarFooter, SidebarMenu } from "./sidebar.styles";
import { SidebarProps } from "./sidebar.types";
import { SidebarProvider, useSidebarContext } from "./context";
import SidebarItem from "./components/item";
import SidebarHeader from "./components/header";
import SidebarCollapsible from "./components/collapsible";
import { PREFIX_CLS } from "./constants";

const Sidebar = (props: SidebarProps) => {
    const { children, width = 200, collapsedWidth = 65 } = props;
    const { collapsed } = useSidebarContext();

    return (
        <SidebarNav
            className={PREFIX_CLS}
            width={width}
            collapsedWidth={collapsedWidth}
            collapsed={collapsed}
            data-collapsed={collapsed}
        >
            {children}
        </SidebarNav>
    );
};

Sidebar.Provider = SidebarProvider;
Sidebar.Root = Sidebar;
Sidebar.Menu = SidebarMenu;
Sidebar.Item = SidebarItem;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Collapsible = SidebarCollapsible;

export default Sidebar;
