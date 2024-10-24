import React, { PropsWithChildren, useContext } from "react";
import { Icon } from "@goto-company/apsara";

import { Footer, FooterWrapper } from "../sidebar.styles";
import { collapsedProps } from "../sidebar.types";
import { SidebarContext } from "../context";

const SidebarFooter = (props: PropsWithChildren<collapsedProps>) => {
    const { onClick, children = "Collapse" } = props;
    const { toggleCollapse, collapsed } = useContext(SidebarContext);

    const handleClickCollapse = () => {
        toggleCollapse();
        if (onClick) {
            onClick(!collapsed);
        }
    };

    return (
        <Footer onClick={handleClickCollapse} className="apsara-sidebar-footer">
            <FooterWrapper>
                <Icon className={collapsed ? "" : "rotate"} name="chevronright" />
                <span className="apsara-nav-text">{children}</span>
            </FooterWrapper>
        </Footer>
    );
};

export default SidebarFooter;
