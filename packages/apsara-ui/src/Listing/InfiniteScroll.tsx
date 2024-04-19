import { debounce } from "lodash";
import React, { useState, useEffect } from "react";

interface InfiniteScrollProps<T> {
    fetchMoreData: (page: number, pageSize: number, filters: any) => Promise<T[]>;
    contentRef: React.RefObject<HTMLDivElement>;
    pageSize?: number;
    filters?: any;
    renderItem: (item: T) => React.ReactNode;
    loadingComponent?: React.ReactNode;
    noMoreDataComponent?: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps<any>> = ({
    fetchMoreData,
    contentRef,
    pageSize = 10,
    filters,
    renderItem,
    loadingComponent,
    noMoreDataComponent,
}) => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [isFirstFetch, setIsFirstFetch] = useState(true);

    const onBottomHit = debounce(async () => {
        if (!isLoading && hasMoreData && isBottom(contentRef)) {
            setIsLoading(true);
            try {
                const newData = await fetchMoreData(page, pageSize, filters);
                setData((prevData) => prevData.concat(newData));
                setPage((prevPage) => prevPage + 1);
                setHasMoreData(newData.length > 0);
            } finally {
                setIsLoading(false);
            }
        }
    }, 200);

    useEffect(() => {
        setPage(1);
        setHasMoreData(true);
        setData([]);
    }, [filters]);

    useEffect(() => {
        if (isFirstFetch) {
            onBottomHit();
        }
        setIsFirstFetch(false);

        const onScroll = () => {
            onBottomHit();
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
    }, [
        contentRef,
        isLoading,
        hasMoreData,
        page,
        filters,
        fetchMoreData,
        setData,
        setPage,
        setHasMoreData,
        isFirstFetch,
        onBottomHit,
    ]);

    const isBottom = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) {
            return false;
        }

        const { scrollTop, scrollHeight, clientHeight } = ref.current;

        return scrollTop + clientHeight >= scrollHeight;
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
