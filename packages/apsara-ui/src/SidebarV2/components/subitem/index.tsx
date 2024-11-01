import React, { useEffect, useRef } from "react";
import Collapse, { CollapseRef } from "../../../Collapse";
import SidebarMenuItem from "../item";
import { useSidebarContext } from "../../context";
import SidebarContent from "../content";
import { SiderMenuProps } from "../../sidebar.types";
import { PREFIX_CLS } from "../../constants";
import { CollapseWrapper, SidebarMenuSubItem, SidebarMenu } from "../../sidebar.styles";

const SubItem = (props: SiderMenuProps) => {
    const { activeState, content, state, child, className, defaultOpen, highlight, icon, linkRender } = props;
    const { collapsed, toggleCollapse } = useSidebarContext();
    const collapseRef = useRef<CollapseRef>(null);

    const handleToggleCollapse = () => {
        if (collapsed && !collapseRef.current?.collapse) {
            toggleCollapse();
        }
    };

    useEffect(() => {
        if (collapsed && collapseRef.current?.collapse) {
            collapseRef.current?.setCollapse(false);
        }
        if (!collapsed && activeState?.includes(state)) {
            collapseRef.current?.setCollapse(true);
        }
    }, [collapsed]);

    return (
        <CollapseWrapper selected={activeState?.includes(state) && collapsed}>
            <Collapse
                ref={collapseRef}
                onClick={handleToggleCollapse}
                defaultOpen={defaultOpen || activeState?.includes(state)}
                header={
                    <SidebarMenuSubItem className={`${PREFIX_CLS}-nav-collapsible-item`}>
                        <SidebarContent highlight={highlight} icon={icon} content={content} />
                    </SidebarMenuSubItem>
                }
            >
                <SidebarMenu style={{ paddingLeft: "30px", marginTop: "12px" }}>
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
            </Collapse>
        </CollapseWrapper>
    );
};

export default SubItem;
