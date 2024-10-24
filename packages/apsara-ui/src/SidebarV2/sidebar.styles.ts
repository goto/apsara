import styled, { css } from "styled-components";

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

export const StyledSider = styled("nav")<{
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
            & .apsara-nav-title {
                opacity: 0;
            }
            & .apsara-nav-text {
                opacity: 0;
            }
            & .apsara_icon {
                margin-right: 0;
            }

            & .apsara-sider-title {
                width: 0;
            }
        `}
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

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 12px 42px;

    .apsara-nav-title {
        margin-left: 16px;
        ${ellipsis}
    }
`;

export const Title = styled.span`
    ${({ theme }) => textStyles("19px", theme?.sidebar?.title, "0.6px")}
    font-weight: bold;
    transition: opacity 0.4s;
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    cursor: pointer;
`;

export const FooterWrapper = styled.div`
    padding: 0 16px;
    align-items: center;
    display: inline-flex;
    width: 100%;
    height: 100%;
    min-height: 48px;

    .apsara_icon {
        margin-right: 16px;
        padding: 4px;
        transform: rotate(0);
        transition: transform 0.5s;
        color: ${({ theme }) => theme?.sidebar?.trigger};
    }

    & .rotate {
        transform: rotate(180deg);
    }

    .apsara-nav-text {
        ${({ theme }) => textStyles(theme?.fontSizes[0], theme?.sidebar?.trigger, "0.3px")}
        ${ellipsis}
        font-weight: bold;
    }
`;

export const SidebarMenuSubItem = styled("div")`
    height: 24px;
    user-select: none;
    padding: 0 8px;
    display: flex;
    align-items: center;
    height: 24px;
    gap: 6px;
`;

export const SidebarMenuItemWrapper = styled("li")<{ selected: boolean }>`
    cursor: pointer;
    padding: 0;
    display: block;
    overflow: visible;
    position: relative;

    .apsara-collapse-header {
        width: 100%;
        padding: 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;

        & > span {
            padding-right: 10px;
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

    & .apsara-nav-text {
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

    .apsara-nav-item {
        display: flex;
        align-items: center;
        height: 24px;
        gap: 6px;
        height: 32px;
        padding: 0 8px;
    }

    ${({ selected }) =>
        selected
            ? `
      .apsara-nav-item {
        background: #1e7ae8;
        border-radius: 4px;
      }
      background-color: transparent;
      & .apsara_icon,
      & .apsara-nav-text {
        color: white;
      }
    `
            : ""}
`;
