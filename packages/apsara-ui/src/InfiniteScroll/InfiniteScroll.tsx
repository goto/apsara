import React, { useEffect, useRef } from "react";

import { InfiniteScrollWrapper } from "./InfiniteScroll.styles";

interface InfiniteScrollProps<T> {
    renderItem: (item: T) => React.ReactNode;
    onBottomScroll: () => void;
    items: T[];
    style?: React.CSSProperties;
    isLoading?: boolean;
    noMoreData?: boolean;
    containerRef?: React.RefObject<HTMLElement>;
    threshold?: number;
    loadingComponent?: React.ReactNode;
    noMoreDataComponent?: React.ReactNode;
}

const InfiniteScroll = <T,>({
    renderItem,
    onBottomScroll,
    items,
    style,
    isLoading,
    noMoreData,
    containerRef,
    threshold = 0,
    loadingComponent,
    noMoreDataComponent,
    ...props
}: InfiniteScrollProps<T>) => {
    const defaultContainerRef = useRef<HTMLDivElement>(null);
    const containerElem = containerRef ? containerRef.current : defaultContainerRef.current;

    useEffect(() => {
        if (!containerElem) return;

        const onScroll = () => {
            if (isBottom(containerElem, threshold)) {
                onBottomScroll();
            }
        }

        containerElem.addEventListener("scroll", onScroll);

        return () => {
            containerElem.removeEventListener("scroll", onScroll);
        };
    }, [containerElem, onBottomScroll, threshold]);

    const loadingComp = loadingComponent ||  <DefaultLoading />;

    return (
        <InfiniteScrollWrapper
            className="apsara-infinite-scroll-wrapper"
            style={style}
            ref={defaultContainerRef}
            {...props}
        >
            {items?.map(renderItem)}
            {isLoading && loadingComp}
            {!noMoreData && noMoreDataComponent}
        </InfiniteScrollWrapper>
    );
};

const DefaultLoading = () => <div>Loading...</div>;

const isBottom = (elem: HTMLElement, threshold: number): boolean => {
    if (!elem) return false;

    const { scrollTop, scrollHeight, clientHeight } = elem;

    const a = scrollTop + clientHeight;
    const b = scrollHeight - threshold;

    console.log(a);
    console.log(b);
    return a >= b;
};

export default InfiniteScroll;
