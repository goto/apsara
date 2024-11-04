import React, { ReactNode } from "react";
import Tooltip from "../../../Tooltip";
import { PREFIX_CLS } from "../../constants";
import { useSidebarContext } from "../../context";
import { SidebarHighlight } from "../../sidebar.types";

interface SidebarContentProps {
    content: ReactNode;
    icon?: ReactNode;
    highlight?: SidebarHighlight;
}

const SidebarContent = (props: SidebarContentProps) => {
    const { highlight, icon, content } = props;
    const { collapsed } = useSidebarContext();

    return (
        <>
            {collapsed ? (
                // @ts-expect-error Bad typing from Tooltip component, need update typing Tooltip component later
                <Tooltip title={content} placement="right" sideOffset={14}>
                    {icon}
                </Tooltip>
            ) : (
                <>{icon}</>
            )}
            <div className={`${PREFIX_CLS}-nav-text`}>{content}</div>
            {highlight?.children && (
                <div {...highlight.props} className={`${PREFIX_CLS}-highlight ${highlight.props?.className}`}>
                    {highlight.children}
                </div>
            )}
        </>
    );
};

export default SidebarContent;
