import { IVirtualTable } from "../Table/VirtualisedTable";

type Column<T> = {
    title: string;
    sorter?: (a: T, b: T) => number;
    sortOrder?: any;
    ellipsis?: boolean;
    width?: number;
    render?: React.ReactNode | null;
  };

  export interface ListingProps<T> {
    list?: T[];
    loading?: boolean;
    resourceName?: string;
    resourcePath?: string;
    rowKey?: string;
    className?: string;
    tableProps?: {
      getColumnList?: (path: string, sortedInfo: any) => Column<T>[];
      handleRowClick?: (event: any, rowIndexData: any) => void;
      selectedRowId?: number;
      scroll?: any;
    } & Omit<IVirtualTable, "columns" | "items">;
    filterProps?: { filterFieldList?: IGroupOptions[] };
    searchProps?: {
      searchPlaceholder?: string;
      searchFields?: string[];
      disabled?: boolean;
    };
    renderExtraFilters?: React.ReactNode | null;
    renderHeader?: React.ReactNode | null;
    renderBody?: React.ReactNode | null;
    calculateRowHeight?: (data: T) => number;
    calculateColumnWidth?: (data: T) => number;
    rowClick?: (props: any) => any;
    sortable?: boolean;
    defaultSearchTerm?: string;
    onChangeCallback?: (props: any) => void;
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
