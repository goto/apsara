import React, { useContext } from "react";
import SidebarFooter from "./footer";
import { SidebarMenu, StyledSider } from "./sidebar.styles";
import { SidebarProps } from "./sidebar.types";
import SidebarHeader from "./header";
import SidebarItem from "./item";
import { SidebarContext } from "./context";

const Sidebar = (props: SidebarProps) => {
    const { children, width = 200, collapsedWidth = 65 } = props;
    const { collapsed } = useContext(SidebarContext);

    return (
        <StyledSider width={width} collapsedWidth={collapsedWidth} collapsed={collapsed} data-collapsed={collapsed}>
            {children}
        </StyledSider>
    );
};

Sidebar.Menu = SidebarMenu;
Sidebar.Item = SidebarItem;
Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;

export default Sidebar;
