import styled from "styled-components";
import Search, { SearchProps } from "../Search/Search";

export const ListingWrapper = styled.div`
    height: 100%;
    .virtual-table-row-hover {
        background: ${({ theme }) => theme?.listing?.tableHighlight} !important;
    }
`;

export const ListingSearch: React.FC<SearchProps> = styled(Search)`
    margin-bottom: 20px;
    .search_input {
        margin-right: 10px !important;
    }
`;

export const FilterActions = styled.span`
    display: flex;
    align-items: center;
`;

export const ListContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 70%;
    background-color: ${({ theme }) => theme.backgroundColor || "white"};
    overflow: hidden;
    box-shadow: rgb(179 179 179 / 31%) 0px 1px 5px;
`;

export const UserCard = styled.div`
    margin-bottom: 16px;
    border-radius: 2px;
    box-shadow: rgb(179 179 179 / 31%) 0px 1px 5px;

    .title {
        color: #4d85f4;
        font-size: 16px;
    }

    .description {
        margin-top: 20px;
        word-break: break-all;
    }

    .label-box {
        display: flex;
        flex-direction: row;
        position: relative;

        > :first-child {
            font-weight: bold;
            ::after {
                content: ":";
                margin-right: 3px;
            }
        }
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 12px 20px 0px 20px;
        .title {
            font-size: 16px;
            font-weight: 500;
            line-height: 1;
            letter-spacing: 0.4px;
            word-break: break-word;
        }
    }

    .body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px 20px 12px 20px;

        > .body-left {
            margin-top: 16px;
            flex: 1;
        }

        > .body-right {
            width: 240px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;

            > div {
                display: flex;
                align-items: flex-end;
                flex-direction: column;
            }

            .tag_content {
                text-transform: uppercase;
            }
        }
    }
`;
