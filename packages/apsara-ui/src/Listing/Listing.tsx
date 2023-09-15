/* eslint-disable no-param-reassign */
import React from "react";
import Filters from "./Filters";
import VirtualisedTable from "../TableV2/VirtualisedTable";
import useSearchFilter from "./hooks/useSearchFilter";
import { ListingProps } from "./Listing.types";
import { ListingSearch, ListingWrapper } from "./Listing.styles";

function Listing<T> ({
    className = "",
    list = [],
    filterProps = {},
    searchProps = {},
    tableProps = {},
    renderHeader = null,
    renderBody = null,
    renderExtraFilters = null,
    resourcePath = "/",
    rowClick,
    sortable = false,
    defaultSearchTerm = "",
    onChangeCallback,
    loading = false,
}: ListingProps<T>) {
    const { getColumnList = () => [], selectedRowId } = tableProps;
    const { searchFields = [], disabled = false, searchPlaceholder } = searchProps;
    const { filterFieldList } = filterProps;
    const {
        searchTerm,
        sortedInfo,
        setSearchTerm,
        onGroupFilter,
        onClearGroupFilter,
        filteredList,
        filteredFieldData,
    } = useSearchFilter({ list, searchFields, defaultSearchTerm });
    const columns = getColumnList(resourcePath, sortedInfo);
    if (!renderHeader) {
        renderHeader = (
            <ListingSearch
                onChange={({ target: { value } }: any) => {
                    onChangeCallback && onChangeCallback(value);
                    return setSearchTerm(value);
                }}
                value={searchTerm}
                placeholder={searchPlaceholder}
                disabled={disabled}
            >
                {filterFieldList && (
                    <Filters
                        disabled={disabled}
                        filterFieldList={filterFieldList || []}
                        filteredFieldData={filteredFieldData}
                        onGroupFilter={onGroupFilter}
                        onClearGroupFilter={onClearGroupFilter}
                    />
                )}
                {renderExtraFilters}
            </ListingSearch>
        );
    }

    if (!renderBody) {
        renderBody = (
            <VirtualisedTable
                items={filteredList}
                columnsData={columns}
                selectedRowId={selectedRowId}
                rowClick={rowClick}
                sortable={sortable}
                loading={loading}
            />
        );
    }
    return (
        <ListingWrapper className={className}>
            {renderHeader}
            {renderBody}
        </ListingWrapper>
    );
};

export default Listing;
