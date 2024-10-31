import styled from "styled-components";
import { PREFIX_CLS } from "../../constants";
import { ellipsis, textStyles } from "../../sidebar.styles";

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 12px 42px;

    .${PREFIX_CLS}-header-nav-title {
        margin-left: 16px;
        ${ellipsis}
    }
`;

export const Title = styled.div`
    ${({ theme }) => textStyles("19px", theme?.sidebar?.title, "0.6px")}
    font-weight: bold;
    transition: opacity 0.4s;
`;
