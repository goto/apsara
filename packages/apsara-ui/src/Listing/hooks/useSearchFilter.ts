import { useState, useCallback, useEffect } from "react";
import { getFilterList } from "../helpers";
import * as R from "ramda";

export const useSearchFilterState = (defaultSearchTerm: string) => {
    const [filteredFieldData, setFilteredFieldData] = useState({});
    const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);
    const [sortedInfo, setSortedInfo] = useState({});

    useEffect(() => {
        setSearchTerm(defaultSearchTerm);
    }, [defaultSearchTerm]);

    const onGroupFilter = (group: any, filteredArr: any) => {
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

export default function useSearchFilter({ list, searchFields = [], defaultSearchTerm, filterFieldList }: any) {
    const {
        sortedInfo,
        searchTerm,
        filteredFieldData,
        setSearchTerm,
        setSortedInfo,
        onGroupFilter,
        onClearGroupFilter,
    } = useSearchFilterState(defaultSearchTerm);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filteredList = useCallback(
        getFilterList(list, filteredFieldData, searchTerm, searchFields, filterFieldList),
        [list, searchTerm, filteredFieldData, filterFieldList, searchFields],
    );

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
