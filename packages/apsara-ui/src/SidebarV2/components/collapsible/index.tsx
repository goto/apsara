import React, { PropsWithChildren, useContext } from "react";
import { Icon } from "@goto-company/apsara";

import { collapsedProps } from "../../sidebar.types";
import { SidebarContext } from "../../context";
import { PREFIX_CLS } from "../../constants";
import { StyledSidebarCollapse } from "./collapsible.styles";

const SidebarCollapse = (props: PropsWithChildren<collapsedProps>) => {
    const { onClick, children = "Collapse" } = props;
    const { toggleCollapse, collapsed } = useContext(SidebarContext);

    const handleClickCollapse = () => {
        toggleCollapse();
        if (onClick) {
            onClick(!collapsed);
        }
    };

    return (
        <StyledSidebarCollapse className={`${PREFIX_CLS}-collapsible`} onClick={handleClickCollapse}>
            <Icon className={collapsed ? "" : "rotate"} name="chevronright" />
            <span className={`${PREFIX_CLS}-collapsible-nav-text`}>{children}</span>
        </StyledSidebarCollapse>
    );
};

export default SidebarCollapse;
