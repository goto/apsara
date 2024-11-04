import React from "react";
import Sidebar from "./sidebar";
import Icon from "../Icon";
import Colors from "../Colors";
import { NavigationSidebarList } from "./sidebar.types";

export default {
    title: "Layout/SidebarV2",
    component: Sidebar,
};

export const iconComponent = () => {
    const navList: NavigationSidebarList[] = [
        {
            state: "explore",
            linkProps: {
                to: "/",
            },
            content: "Explore",
            icon: <Icon name="discovery" />,
        },
        {
            state: "dashboard",
            linkProps: {
                to: "/dashboard",
            },
            content: "Dashboard",
            icon: <Icon name="iam" />,
        },
        {
            state: "access",
            linkProps: {
                to: "/access",
            },
            content: "Access",
            icon: <Icon name="access" />,
        },
        {
            state: "firehoses",
            linkProps: {
                to: "/firehoses",
            },
            content: "Firehose",
            icon: <Icon name="firehose" />,
        },
        {
            state: "daggers",
            linkProps: {
                to: "/daggers",
            },
            content: "Daggers",
            icon: <Icon name="dagger" />,
        },
        {
            state: "optimus",
            linkProps: {
                to: "/optimus",
            },
            content: "Optimus",
            icon: <Icon name="optimus" />,
            highlight: {
                children: "New",
            },
        },
        {
            state: "google",
            linkProps: {
                to: "/google",
            },
            content: "Google",
            icon: <Icon name="areaChart" />,
        },
        {
            state: "experimentation",
            linkProps: {
                to: "/metrics",
            },
            content: "Experimentation",
            icon: <Icon name="catalog" />,
            children: [
                {
                    state: "experimentation.facts",
                    linkProps: {
                        to: "/experimentation/metrics/facts",
                    },
                    content: "Facts",
                    icon: <Icon name="catalog" />,
                },
                {
                    state: "experimentation.metrics",
                    linkProps: {
                        to: "/experimentation/metrics",
                    },
                    content: "Metrics",
                    icon: <Icon name="catalog" />,
                },
                {
                    state: "experimentation.clickstream",
                    linkProps: {
                        to: "/experimentation/metrics/clickstream-events",
                    },
                    content: "Clickstreams",
                    icon: <Icon name="catalog" />,
                },
            ],
        },
        {
            state: "Opera",
            linkProps: {
                to: "/opera",
            },
            content: "opera",
            icon: <Icon name="catalog" />,
        },
    ];

    return (
        <Sidebar.Provider>
            <Sidebar.Root width={220}>
                <Sidebar.Header
                    logo={<Icon name="doc" size={32} styleOverride={{ color: Colors.light.primary[3] }} />}
                    name="Console"
                />
                <Sidebar.Menu>
                    {navList.map((item, idx) => (
                        <Sidebar.Item
                            activeState="dashboard"
                            linkRender={({ children, props }) => (
                                <a {...props} href={props.to as string}>
                                    {children}
                                </a>
                            )}
                            key={idx}
                            {...item}
                        />
                    ))}
                </Sidebar.Menu>
                <Sidebar.Footer>
                    <Sidebar.Collapsible />
                </Sidebar.Footer>
            </Sidebar.Root>
        </Sidebar.Provider>
    );
};
