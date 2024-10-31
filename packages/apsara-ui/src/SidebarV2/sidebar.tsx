import React, { useContext } from "react";
import { SidebarNav, SidebarFooter } from "./sidebar.styles";
import { SidebarProps } from "./sidebar.types";
import { SidebarContext } from "./context";
import SidebarItem from "./components/item";
import SidebarHeader from "./components/header";
import SidebarCollapsible from "./components/collapsible";
import { SidebarMenu } from "./components/item/item.styles";
import { PREFIX_CLS } from "./constants";

const Sidebar = (props: SidebarProps) => {
    const { children, width = 200, collapsedWidth = 65 } = props;
    const { collapsed } = useContext(SidebarContext);

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

Sidebar.Menu = SidebarMenu;
Sidebar.Item = SidebarItem;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Collapsible = SidebarCollapsible;

export default Sidebar;
