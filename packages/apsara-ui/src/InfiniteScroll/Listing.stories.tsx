import React, { FormEvent, useState } from "react";
import { UserCard } from "./InfiniteScroll.styles";
import InfiniteScroll from "./InfiniteScroll";
import Search from "../Search";

export default {
    title: "Data Display/InfiniteScroll",
    component: InfiniteScroll,
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

export const infiniteListWithCustomComponent = () => {
    const pageSize = 10;
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<string>("");
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
                <div className="title">{user.name}</div>
                <div className="body">
                    <div className="body-left">
                        <div className="description">Address</div>
                        <div>{user.address}</div>
                    </div>
                    <div className="body-right">
                        <div className="description">Age</div>
                        <div>{user.age}</div>
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                margin: "0",
            }}
        >
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
            <div
                style={{
                    width: "100%",
                    height: "70%",
                    marginTop: "10%",
                    backgroundColor: "white",
                    boxShadow: "rgb(179 179 179 / 31%) 0px 1px 5px",
                }}
                className="results-list"
            >
                <InfiniteScroll
                    page={page}
                    fetchMoreData={fetchMore}
                    filters={filter}
                    pageSize={pageSize}
                    renderItem={(user: User) => <Card user={user} />}
                    loadingComponent={<div>Loading...</div>}
                    noMoreDataComponent={<div>No more data to fetch!</div>}
                ></InfiniteScroll>
            </div>
        </div>
    );
};
