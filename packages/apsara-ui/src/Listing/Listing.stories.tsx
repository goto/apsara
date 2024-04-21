import React, { FormEvent, useRef, useState } from "react";
import Listing from "./Listing";
import InfiniteListing from "./InfiniteListing";
import { ScrollableList, UserCard } from "./Listing.styles";
import InfiniteScroll from "./InfiniteScroll";
import Search from "../Search";

export default {
    title: "Data Display/Listing",
    component: Listing,
};

interface User {
    key: number;
    name: string;
    status: "active" | "inactive";
    age: number;
    address: string;
}

function getData(page = 1): User[] {
    return new Array(page * 100).fill(0).map((_, index) => {
        return {
            key: index,
            name: `name ${index}`,
            status: index % 2 ? "active" : "inactive",
            age: index,
            address: `A${index} Downing Street`,
        };
    });
}

export const listing = () => (
    <div style={{ height: "720px" }}>
        <h4>Listing</h4>
        <Listing<User>
            loading={false}
            sortable
            defaultSearchTerm="name 1"
            list={getData(2)}
            tableProps={{
                getColumnList: () => {
                    return [
                        {
                            title: "Name",
                            key: "name",
                            render: ({ row: { original } }) => original.name,
                        },
                        {
                            title: "Status",
                            key: "status",
                            render: ({ row: { original } }) => original.status,
                        },
                        {
                            title: "Age",
                            key: "age",
                            render: ({ row: { original } }) => original.age,
                        },
                        {
                            title: "Address",
                            key: "address",
                            render: ({ row: { original } }) => original.address,
                        },
                    ];
                },
            }}
            filterProps={{
                filterFieldList: [
                    {
                        name: "Status",
                        data: [
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
                        ],
                        slug: "status",
                        multi: true,
                    },
                ],
            }}
            searchProps={{
                searchFields: ["name", "address"],
            }}
        />
    </div>
);

export const infiniteListing = () => {
    const [page, setPage] = useState(1);
    async function loadMore(data: any) {
        console.log(data);
        setPage(data.nextPage);
    }

    function onSearchFilter(data: any) {
        console.log(data);
    }

    return (
        <InfiniteListing
            loading={false}
            list={getData(page)}
            tableProps={{
                getColumnList: () => {
                    return [
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Age",
                            dataIndex: "age",
                            key: "age",
                        },
                        {
                            title: "Address",
                            dataIndex: "address",
                            key: "address",
                        },
                    ];
                },
                scroll: { y: 500, x: "100vw" },
            }}
            filterProps={{
                filterFieldList: [
                    {
                        name: "Age",
                        data: ["10", "20"].map((d) => {
                            return { label: d, value: d.toLowerCase() };
                        }),
                        slug: "age",
                    },
                ],
            }}
            resourcePath="/beast"
            page={page}
            loadMore={loadMore}
            onSearch={onSearchFilter}
            onFilter={onSearchFilter}
        />
    );
};

export const infiniteListingWithApply = () => {
    const [page, _setPage] = useState(1); // eslint-disable-line

    function handleApply(data: any) {
        console.log(data);
    }

    return (
        <InfiniteListing
            loading={false}
            list={getData(page)}
            tableProps={{
                getColumnList: () => {
                    return [
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Age",
                            dataIndex: "age",
                            key: "age",
                        },
                        {
                            title: "Address",
                            dataIndex: "address",
                            key: "address",
                        },
                    ];
                },
                scroll: { y: 500, x: "100vw" },
            }}
            filterProps={{
                filterFieldList: [
                    {
                        name: "Age",
                        data: ["10", "20"].map((d) => {
                            return { label: d, value: d.toLowerCase() };
                        }),
                        slug: "age",
                    },
                ],
            }}
            resourcePath="/beast"
            page={page}
            onApply={handleApply}
        />
    );
};

export const infiniteListWithCustomComponent = () => {
    const pageSize = 10;
    const contentRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<string>();
    const [page, setPage] = useState<number>(1);

    const fetchMore = async (page: number, pageSize: number, filter: string) => {
        if (page === 4) return [];

        let records = getData(page);
        if (filter) {
            records = records.filter((record) => record.name.toLowerCase().includes(filter.toLowerCase()));
        }

        setPage((prevPage) => prevPage + 1);
        records = records.slice(0, pageSize);
        return records;
    };

    const Card = ({ user }: { user: User }) => {
        return (
            <UserCard>
                <div className="body">
                    <div className="body-left">
                        <div className="description">{user.name}</div>
                    </div>
                    <div className="body-right">
                        <div>Age {user.age}</div>
                    </div>
                </div>
            </UserCard>
        );
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setPage(1);
        setFilter(searchTerm);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={onSubmit}>
                <Search
                    style={{ width: "90vw", height: "100%" }}
                    value={searchTerm}
                    onChange={(e) => {
                        return setSearchTerm(e.target.value);
                    }}
                    placeholder="Type your search query here.."
                    // @ts-ignore
                    secondary={true}
                />
            </form>
            <ScrollableList className="results-list" ref={contentRef}>
                <InfiniteScroll
                    page={page}
                    fetchMoreData={fetchMore}
                    filters={filter}
                    pageSize={pageSize}
                    contentRef={contentRef}
                    renderItem={(user: User) => <Card user={user} />}
                    loadingComponent={<div>Loading...</div>}
                    noMoreDataComponent={<div>No more data to fetch!</div>}
                ></InfiniteScroll>
            </ScrollableList>
        </div>
    );
};
