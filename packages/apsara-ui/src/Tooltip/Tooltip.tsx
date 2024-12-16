import React, { HTMLAttributes } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

import { TooltipContent } from "./Tooltip.styles";

export type TooltipPlacement = "left" | "right" | "top" | "bottom";

export type TooltipProps = {
    title?: React.ReactNode;
    placement?: TooltipPlacement;
    style?: React.CSSProperties;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: ((open: boolean) => void) | undefined;
    delayDuration?: number;
    avoidCollisions?: boolean;
} & HTMLAttributes<HTMLDivElement> &
    RadixTooltip.TooltipContentProps;

export const PREFIX_CLS = "apsara-tooltip";
const Tooltip = ({
    title = "",
    placement = "right",
    delayDuration = 100,
    style,
    children,
    defaultOpen,
    open,
    onOpenChange,
    avoidCollisions,
    ...props
}: TooltipProps) => {
    return (
        <RadixTooltip.Provider delayDuration={delayDuration}>
            <RadixTooltip.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
                <RadixTooltip.Trigger asChild>
                    <span className={`${PREFIX_CLS}-trigger`}>{children}</span>
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <TooltipContent
                        className="TooltipContent"
                        sideOffset={5}
                        side={placement}
                        style={style}
                        avoidCollisions={avoidCollisions}
                        {...props}
                    >
                        {title}
                        <RadixTooltip.Arrow className="TooltipArrow" />
                    </TooltipContent>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};

export default Tooltip;
