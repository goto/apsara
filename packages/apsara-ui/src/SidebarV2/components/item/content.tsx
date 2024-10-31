import React, { ReactNode } from "react";
import Tooltip from "../../../Tooltip";
import { PREFIX_CLS } from "../../constants";

interface SidebarContentProps {
    content: ReactNode;
    icon?: ReactNode;
    collapsed?: boolean;
    highlight?: ReactNode;
}

const SidebarContent = (props: SidebarContentProps) => {
    const { collapsed, highlight, icon, content } = props;

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
            {highlight && <div className={`${PREFIX_CLS}-highlight`}>{highlight}</div>}
        </>
    );
};

export default SidebarContent;
