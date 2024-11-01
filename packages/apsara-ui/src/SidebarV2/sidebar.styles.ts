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

export const SidebarMenuItemWrapper = styled("li")<{ selected: boolean }>`
    cursor: pointer;
    padding: 0;
    display: block;
    overflow: visible;
    position: relative;

    .apsara-tooltip-trigger {
        display: flex;
    }

    .apsara-collapse-header {
        width: 100%;
        height: 36px;
        padding: 0 6px 0 0 !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        ${({ selected }) =>
            selected
                ? ""
                : `&:hover, &:focus-visible {
                    background-color: rgb(233, 233, 233);
                }
        `}

        .apsara-collapse-content {
            width: 100%;
            height: 100%;
            padding-right: 0px !important;
            display: flex;
            align-items: center;
        }
    }

    .apsara-collapse-content-box {
        padding: 0 !important;
    }

    &:active {
        background: transparent;
    }

    & .${PREFIX_CLS}-nav-text {
        ${({ theme }) => textStyles(theme?.fontSizes[0], theme?.sidebar?.nav, "0.3px")}
        font-weight: bold;
        transition: opacity 0.4s;
        margin-left: 4px;
        ${ellipsis}
    }

    & .apsara_icon {
        color: ${({ theme }) => theme?.sidebar?.nav};
        transition: margin 0.4s;
    }

    .${PREFIX_CLS}-nav-item {
        display: flex;
        align-items: center;
        height: 24px;
        gap: 6px;
        height: 36px;
        padding: 0 8px;
        user-select: none;
        border-radius: 4px;
        ${({ selected }) =>
            selected
                ? ""
                : `&:hover, &:focus-visible {
                    background-color: rgb(233, 233, 233);
                }
        `}
    }

    .${PREFIX_CLS}-highlight {
        margin-left: auto;
        border-radius: 4px;
        font-size: 8px;
        padding: 0 6px;
        background: ${({ selected }) => (selected ? "white" : "#ef4444")};
        color: ${({ selected }) => (selected ? "#1e7ae8" : "white")};
    }

    ${({ selected }) =>
        selected
            ? `
      .${PREFIX_CLS}-nav-item {
        background: #1e7ae8 !important;
      }
      & .apsara_icon,
      & .${PREFIX_CLS}-nav-text {
        color: white !important;
      }
    `
            : ""}
`;

export const CollapseWrapper = styled("div")<{ selected?: boolean }>`
    ${({ selected }) =>
        selected
            ? `
        .apsara-collapse-header {
            background: #1e7ae8 !important;
      }
      & .apsara_icon,
      & .${PREFIX_CLS}-nav-text {
        color: white !important;
      }
    `
            : ""}
`;

export const SidebarMenuSubItem = styled("div")`
    width: 100%;
    height: 100%;
    user-select: none;
    padding: 0 8px;
    display: flex;
    align-items: center;
    height: 24px;
    gap: 6px;
    cursor: pointer;
`;

export const SidebarMenu = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 12px;
`;
