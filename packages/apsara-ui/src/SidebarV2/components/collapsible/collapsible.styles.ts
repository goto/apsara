import styled from "styled-components";
import { PREFIX_CLS } from "../../constants";
import { ellipsis, textStyles } from "../../sidebar.styles";

export const StyledSidebarCollapse = styled.button`
    background: none;
    border: none;
    outline: none;
    padding: 0 16px;
    align-items: center;
    display: inline-flex;
    width: 100%;
    height: 100%;
    min-height: 48px;
    cursor: pointer;
    &:focus-visible {
        background-color: rgb(233, 233, 233);
    }

    .apsara_icon {
        margin-right: 16px;
        padding: 4px;
        transform: rotate(0);
        transition: transform 0.5s;
        color: ${({ theme }) => theme?.sidebar?.trigger};
    }

    .${PREFIX_CLS}-collapsible-icon-wrapper {
        &.rotate {
            .apsara_icon {
                transform: rotate(180deg);
            }
        }
    }
    .${PREFIX_CLS}-collapsible-nav-text {
        ${({ theme }) => textStyles(theme?.fontSizes[0], theme?.sidebar?.trigger, "0.3px")}
        ${ellipsis}
        font-weight: bold;
    }
`;
