import { useState, useCallback } from "react";
import { getFilterList } from "../helpers";
import * as R from "ramda";
import { IGroupOptions } from "../Listing.types";

export const useSearchFilterState = (prefilledSearchTerm: string) => {
    const [filteredFieldData, setFilteredFieldData] = useState({});
    const [searchTerm, setSearchTerm] = useState(prefilledSearchTerm);
    const [sortedInfo, setSortedInfo] = useState({});

    const onGroupFilter = (group: IGroupOptions, filteredArr: any) => {
        const { slug, multi = true } = group;
        setFilteredFieldData({
            ...filteredFieldData,
            ...{ [slug]: multi ? filteredArr : R.takeLast(1, filteredArr) },
        });
    };

    const onClearGroupFilter = () => setFilteredFieldData({});

    return {
        sortedInfo,
        searchTerm,
        filteredFieldData,
        setSearchTerm,
        setSortedInfo,
        onGroupFilter,
        onClearGroupFilter,
    };
};

export default function useSearchFilter({ list, searchFields = [], prefilledSearchTerm }: any) {
    const {
        sortedInfo,
        searchTerm,
        filteredFieldData,
        setSearchTerm,
        setSortedInfo,
        onGroupFilter,
        onClearGroupFilter,
    } = useSearchFilterState(prefilledSearchTerm);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filteredList = useCallback(getFilterList(list, filteredFieldData, searchTerm, searchFields), [
        list,
        searchTerm,
        filteredFieldData,
        searchFields,
    ]);

    return {
        sortedInfo,
        searchTerm,
        setSearchTerm,
        setSortedInfo,
        onGroupFilter,
        onClearGroupFilter,
        filteredList,
        filteredFieldData,
    };
}
