import styled from "styled-components";

export const TooltipContentWrapper = styled("span")`
    .TooltipContent {
        --tooltip-color: ${({ color }) => color};
        color: white;
        background-color: var(--tooltip-color);
        padding: 4px 8px;
        width: max-content;
        max-width: 250px;
        border-radius: 2px;
        text-align: left;
        font-size: 11px;
        font-family: Roboto;
        font-weight: 200;
    }
`;
