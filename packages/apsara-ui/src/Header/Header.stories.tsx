import React from "react";
import Header from "./Header";

export default {
    title: "Layout/Header",
    component: Header,
};

export const header = () => (
    <Header
        title="General"
        username="admin"
        style={{ padding: 0 }}
        learnProps={{ isLearnVisible: false, style: { top: 100 } }}
        menuList={[
            {
                name: "Logout",
                icon: "logout",
            },
            {
                name: "a tag",
                icon: "placeholder",
                href: "https://google.com",
            },
        ]}
    />
);
