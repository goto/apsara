import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { CollapseWrapper, CollapsibleHeader } from "./Collapse.styles";
import classNames from "classnames";
import { noop } from "../utils";

export interface CollapseProps {
    header: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    contentForceMount?: true | undefined;
    headerStyle?: React.CSSProperties;
    onClick?: (status?: boolean) => void;
}

export interface CollapseRef {
    setCollapse: (open: boolean) => void;
    collapse: boolean;
}

const Collapse = forwardRef<CollapseRef, CollapseProps>((props, ref) => {
    const { header, onClick = noop, children, defaultOpen = false, contentForceMount, headerStyle = {} } = props;
    const prefixCls = "apsara-collapse";
    const [open, setOpen] = useState(defaultOpen);

    const contentClassString = classNames(`${prefixCls}-content`, {
        [`${prefixCls}-content-hidden`]: !open,
    });

    useEffect(() => {
        setOpen(defaultOpen);
    }, [defaultOpen]);

    const handleToggleCollapse = () => {
        setOpen((prev) => !prev);
        onClick(!open);
    };

    useImperativeHandle(ref, () => ({
        setCollapse(open: boolean) {
            setOpen(open);
        },
        collapse: open,
    }));

    return (
        <CollapseWrapper className={prefixCls}>
            <Collapsible.Root open={open} className={`${prefixCls}-item`} defaultOpen={defaultOpen}>
                <CollapsibleHeader
                    className={`${prefixCls}-header`}
                    onClick={handleToggleCollapse}
                    data-state={open ? "open" : "closed"}
                    style={headerStyle}
                >
                    <span style={{ paddingRight: "10px" }} className={`${prefixCls}-content`}>
                        {header}
                    </span>
                    {<ChevronRightIcon className={`${prefixCls}-icon`} />}
                </CollapsibleHeader>
                <Collapsible.CollapsibleContent
                    className={contentClassString}
                    data-state={open ? "open" : "closed"}
                    forceMount={contentForceMount}
                >
                    <div className={`${prefixCls}-content-box`}>{children}</div>
                </Collapsible.CollapsibleContent>
            </Collapsible.Root>
        </CollapseWrapper>
    );
});

export default Collapse;
