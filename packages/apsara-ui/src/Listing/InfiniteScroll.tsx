import { debounce } from "lodash";
import React, { useState, useEffect } from "react";

interface InfiniteScrollProps<T> {
    fetchMoreData: (page: number, pageSize: number, filters: any) => Promise<T[]>;
    contentRef: React.RefObject<HTMLDivElement>;
    page: number;
    pageSize?: number;
    filters?: any;
    threshold?: number;
    renderItem: (item: T) => React.ReactNode;
    loadingComponent?: React.ReactNode;
    noMoreDataComponent?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps<any>> = ({
    fetchMoreData,
    contentRef,
    page,
    pageSize = 10,
    threshold = 0,
    filters,
    renderItem,
    loadingComponent,
    noMoreDataComponent,
}) => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        setData([]);
        setHasMoreData(true);
    }, [filters]);

    const fetchMore = debounce(async () => {
        if (!isLoading && hasMoreData && isBottom(contentRef)) {
            setIsLoading(true);
            try {
                const newData = await fetchMoreData(page, pageSize, filters);
                setData((prevData) => prevData.concat(newData));
                setHasMoreData(newData.length < pageSize ? false : true);
            } finally {
                setIsLoading(false);
            }
        }
    }, 200);

    useEffect(() => {
        if (page == 1 && !data.length) {
            fetchMore();
        }

        const onScroll = () => {
            if (page != 1) {
                fetchMore();
            }
        };

        const currentContentRef = contentRef.current;
        if (currentContentRef) {
            currentContentRef.addEventListener("scroll", onScroll);
        }

        return () => {
            if (currentContentRef) {
                currentContentRef.removeEventListener("scroll", onScroll);
            }
        };
    }, [contentRef, fetchMore, page, filters]);

    const isBottom = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) {
            return false;
        }

        const { scrollTop, scrollHeight, clientHeight } = ref.current;

        return scrollTop + clientHeight >= scrollHeight - threshold;
    };

    return (
        <div className="infinite-list">
            {data.map(renderItem)}
            {isLoading ? loadingComponent : null}
            {!hasMoreData && noMoreDataComponent}
        </div>
    );
};

export default InfiniteScroll;
