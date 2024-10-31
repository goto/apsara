import styled from "styled-components";
import { PREFIX_CLS } from "../../constants";
import { textStyles, ellipsis } from "../../sidebar.styles";

export const SidebarMenuItemWrapper = styled("li")<{ selected: boolean }>`
    cursor: pointer;
    padding: 0;
    display: block;
    overflow: visible;
    position: relative;

    .apsara-collapse-header {
        width: 100%;
        padding: 0 2px 0 0 !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;

        .apsara-collapse-content {
            width: 100%;
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
        height: 32px;
        padding: 0 8px;
        user-select: none;
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
        background: #1e7ae8;
        border-radius: 4px;
      }
      background-color: transparent;
      & .apsara_icon,
      & .${PREFIX_CLS}-nav-text {
        color: white !important;
      }
    `
            : ""}
`;

export const SidebarMenuSubItem = styled("button")`
    width: 100%;
    background: none;
    border: none;
    backgorund
    height: 24px;
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
    gap: 16px;
    padding: 0 12px;
`;
