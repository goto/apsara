import React, { useContext } from "react";

import { SiderMenuProps } from "../../sidebar.types";
import { SidebarContext } from "../../context";
import Collapse from "../../../Collapse";
import SidebarContent from "./content";
import { PREFIX_CLS } from "../../constants";
import { SidebarMenu, SidebarMenuItemWrapper, SidebarMenuSubItem } from "./item.styles";
import { noop } from "../../../utils";

const SidebarMenuItem = (props: SiderMenuProps) => {
    const { activeState, highlight, icon, state, linkProps, content, className, linkRender = noop, child } = props;

    const { collapsed } = useContext(SidebarContext);

    return (
        <SidebarMenuItemWrapper className={className} selected={activeState === state}>
            {child ? (
                <>
                    <Collapse
                        headerStyle={{ padding: 0 }}
                        defaultOpen={activeState?.includes(state)}
                        header={
                            <SidebarMenuSubItem className={`${PREFIX_CLS}-nav-collapsible-item`}>
                                <SidebarContent
                                    highlight={highlight}
                                    collapsed={collapsed}
                                    icon={icon}
                                    content={content}
                                />
                            </SidebarMenuSubItem>
                        }
                    >
                        {!collapsed && (
                            <div style={{ paddingLeft: "30px", marginTop: "12px" }}>
                                <SidebarMenu style={{ padding: 0 }}>
                                    {child?.map((item, idx) => (
                                        <SidebarMenuItem
                                            key={idx}
                                            className={className}
                                            activeState={activeState}
                                            linkRender={linkRender}
                                            {...item}
                                        />
                                    ))}
                                </SidebarMenu>
                            </div>
                        )}
                    </Collapse>
                </>
            ) : (
                <>
                    {linkRender({
                        children: (
                            <SidebarContent highlight={highlight} collapsed={collapsed} icon={icon} content={content} />
                        ),
                        props: {
                            className: `${PREFIX_CLS}-nav-item`,
                            ...linkProps,
                        },
                    })}
                </>
            )}
        </SidebarMenuItemWrapper>
    );
};

export default SidebarMenuItem;
