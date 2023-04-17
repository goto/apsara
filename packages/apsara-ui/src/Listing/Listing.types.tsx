import { IVirtualTable } from "../Table/VirtualisedTable";
export interface ListingProps {
    list?: any[];
    loading?: boolean;
    resourceName?: string;
    resourcePath?: string;
    rowKey?: string;
    className?: string;
    tableProps?: {
        getColumnList?: any;
        handleRowClick?: (event: any, rowIndexData: any) => void;
        selectedRowId?: number;
        scroll?: any;
    } & Omit<IVirtualTable, "columns" | "items">;
    filterProps?: { filterFieldList?: IGroupOptions[] };
    searchProps?: {
        searchPlaceholder?: string;
        searchFields?: any[];
        disabled?: boolean;
    };
    renderExtraFilters?: any;
    renderHeader?: any;
    renderBody?: any;
    calculateRowHeight?: any;
    calculateColumnWidth?: any;
    rowClick?: (props: any) => any;
    sortable?: boolean;
    defaultSearchTerm?: string;
    setUrlState?: any;
}

export interface IGroupOptions {
    name: string;
    slug: string;
    multi?: boolean;
    data: { label: string; value: string }[];
    searchEnabled?: boolean;
}

export interface ILoadMoreProps {
    nextPage: number;
    search: string;
    filters: unknown;
}
