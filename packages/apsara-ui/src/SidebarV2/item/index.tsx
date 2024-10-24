import React, { useContext } from "react";

import { SidebarMenuSubItem, SidebarMenuItemWrapper, SidebarMenu } from "../sidebar.styles";
import { SiderMenuProps } from "../sidebar.types";
import { SidebarContext } from "../context";
import Collapse from "../../Collapse";
import Tooltip from "../../Tooltip";
import { noop } from "../../utils";

const SidebarMenuItem = (props: SiderMenuProps) => {
    const { activeState, icon, state, linkProps, onItemClick = noop, linkRender, child } = props;

    const { collapsed } = useContext(SidebarContext);

    const SidebarContent = () => {
        return (
            <>
                {collapsed ? (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    <Tooltip title={linkProps.children} placement="right">
                        {icon}
                    </Tooltip>
                ) : (
                    <>{icon}</>
                )}
                <span className="apsara-nav-text">{linkProps?.children}</span>
            </>
        );
    };

    return (
        <SidebarMenuItemWrapper selected={activeState === state}>
            {child ? (
                <>
                    <Collapse
                        headerStyle={{ padding: 0 }}
                        defaultOpen={activeState?.includes(state)}
                        header={
                            <SidebarMenuSubItem onClick={() => onItemClick(state)}>
                                <SidebarContent />
                            </SidebarMenuSubItem>
                        }
                    >
                        {!collapsed && (
                            <div style={{ paddingLeft: "30px", marginTop: "12px" }}>
                                <SidebarMenu style={{ padding: 0 }}>
                                    {child?.map((item, idx) => (
                                        <SidebarMenuItem
                                            key={idx}
                                            activeState={activeState}
                                            linkProps={item.linkProps}
                                            icon={item.icon}
                                            onItemClick={onItemClick}
                                            linkRender={linkRender}
                                            state={item.state}
                                            child={item.child}
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
                        children: <SidebarContent />,
                        props: {
                            className: "apsara-nav-item",
                            onClick: () => onItemClick(state),
                            ...linkProps,
                        },
                    })}
                </>
            )}
        </SidebarMenuItemWrapper>
    );
};

export default SidebarMenuItem;
