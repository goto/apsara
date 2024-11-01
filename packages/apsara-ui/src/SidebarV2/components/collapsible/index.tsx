import React, { PropsWithChildren } from "react";
import Icon from "../../../Icon";

import { collapsedProps } from "../../sidebar.types";
import { useSidebarContext } from "../../context";
import { PREFIX_CLS } from "../../constants";
import { StyledSidebarCollapse } from "./collapsible.styles";

const SidebarCollapse = (props: PropsWithChildren<collapsedProps>) => {
    const { onClick, icon, children = "Collapse" } = props;
    const { toggleCollapse, collapsed } = useSidebarContext();

    const handleClickCollapse = () => {
        toggleCollapse();
        if (onClick) {
            onClick(!collapsed);
        }
    };

    return (
        <StyledSidebarCollapse className={`${PREFIX_CLS}-collapsible`} onClick={handleClickCollapse}>
            <div className={`${PREFIX_CLS}-collapsible-icon-wrapper ${collapsed ? "" : "rotate"}`}>
                {icon ? icon : <Icon name="chevronright" />}
            </div>
            <span className={`${PREFIX_CLS}-collapsible-nav-text`}>{children}</span>
        </StyledSidebarCollapse>
    );
};

export default SidebarCollapse;
