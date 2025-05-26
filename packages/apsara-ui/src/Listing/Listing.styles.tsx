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
        margin-right: 1%;
    }
    .apsara-listing-extra-actions {
        display: flex;
        align-items: center;
    }

    @media (max-width: 768px) {
        &:has(.apsara-listing-extra-actions) {
            flex-wrap: wrap;
            .apsara-input {
                width: 80%;
            }
            .popover-trigger {
                width: 19%;
                button {
                    width: 100%;
                }
            }
            .apsara-listing-extra-actions {
                padding: 0;
                order: -1;
                margin-bottom: 8px;
                margin-left: auto;
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`;

export const FilterActions = styled.span`
    display: flex;
    align-items: center;
`;
