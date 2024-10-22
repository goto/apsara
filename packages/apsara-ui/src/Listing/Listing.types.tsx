import { SorterResult } from "../Table/TableProps";
import { IVirtualTable } from "../Table/VirtualisedTable";
import { Column } from "../TableV2/VirtualisedTable";

export type ColumnRenderFunc<T> = (path: string, sortedInfo: SorterResult<T>) => Column<T>[];

export type CustomFilter<T> = (item: T, selectedFilter: string[]) => boolean;

export interface ListingProps<T> {
    list?: T[];
    loading?: boolean;
    resourceName?: string;
    resourcePath?: string;
    rowKey?: string;
    className?: string;
    tableProps?: {
        getColumnList?: ColumnRenderFunc<T>;
        selectedRowId?: number;
        scroll?: any;
    } & Omit<IVirtualTable, "columns" | "items">;
    filterProps?: { filterFieldList?: IGroupOptions<T>[] };
    searchProps?: {
        searchPlaceholder?: string;
        searchFields?: string[];
        disabled?: boolean;
    };
    calculateRowHeight?: (index: number, defaultRowHeight: number) => number;
    calculateColumnWidth?: (index: number, defaultColumnWidth: number) => number;
    renderExtraFilters?: React.ReactNode;
    renderExtraItems?: React.ReactNode;
    renderHeader?: React.ReactNode;
    renderBody?: React.ReactNode;
    rowClick?: (props: any) => any;
    sortable?: boolean;
    defaultSearchTerm?: string;
    onChangeCallback?: (props: any) => void;
}

export interface IGroupOptions<T> {
    name: string;
    slug: string;
    multi?: boolean;
    data: { label: string; value: string }[];
    searchEnabled?: boolean;
    /**
     * Determines if a given data item passes the selected filters.
     *
     * This function applies custom logic to filter items based on the current selection of filters.
     * It returns a boolean indicating whether the item satisfies the criteria defined by the selected filters.
     *
     * @param {Object} item - A data item from the list being iterated over.
     * @param {string[]} selectedFilter - An array of strings representing the currently selected filters.
     *
     * @returns {boolean} Returns `true` if the item matches the selected filters, `false` otherwise.
     */
    customFilter?: CustomFilter<T>;
}

export interface ILoadMoreProps {
    nextPage: number;
    search: string;
    filters: unknown;
}
