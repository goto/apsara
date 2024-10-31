import styled, { css } from "styled-components";
import { PREFIX_CLS } from "./constants";

export const textStyles = (size = "12px", color = "#4b4b4b", ls = "0px", weight = "300") => css`
    font-size: ${size};
    font-weight: ${weight};
    color: ${color};
    letter-spacing: ${ls};
`;

export const ellipsis = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SidebarNav = styled("nav")<{
    width: number;
    collapsedWidth: number;
    collapsed: boolean;
}>`
    background: ${({ theme }) => theme?.sidebar?.bg};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 99;
    text-transform: capitalize;
    min-height: 100vh;
    width: ${({ width }) => `${width}px`};
    transition: width 0.4s;

    ${({ collapsed, collapsedWidth }) =>
        collapsed &&
        css`
            width: ${collapsedWidth}px;
            .${PREFIX_CLS}-nav-text, .${PREFIX_CLS}-highlight, .apsara-collapse-icon {
                opacity: 0;
            }
            .apsara-collapse-icon {
                display: none;
            }
        `}
`;

export const SidebarFooter = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    cursor: pointer;
`;
