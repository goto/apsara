import React from "react";

import { SiderMenuProps } from "../../sidebar.types";
import SidebarContent from "../content";
import { PREFIX_CLS } from "../../constants";
import { noop } from "../../../utils";
import SubItem from "../subitem";
import { SidebarMenuItemWrapper } from "../../sidebar.styles";

const SidebarMenuItem = (props: SiderMenuProps) => {
    const { activeState, highlight, icon, state, linkProps, content, className, linkRender = noop, children } = props;

    return (
        <SidebarMenuItemWrapper className={className} selected={activeState === state}>
            {children ? (
                <SubItem {...props} />
            ) : (
                <>
                    {linkRender({
                        children: <SidebarContent highlight={highlight} icon={icon} content={content} />,
                        props: {
                            className: `${PREFIX_CLS}-nav-item`,
                            to: linkProps?.to || "",
                            ...linkProps,
                        },
                    })}
                </>
            )}
        </SidebarMenuItemWrapper>
    );
};

export default SidebarMenuItem;
