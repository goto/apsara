import React from "react";
import Sidebar from "./sidebar";
import Icon from "../Icon";
import Colors from "../Colors";
import { SidebarProvider } from "./context";
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
                children: "Explore",
            },
            icon: <Icon name="discovery" />,
        },
        {
            state: "dashboard",
            linkProps: {
                to: "/dashboard",
                children: "Dashboard",
            },
            icon: <Icon name="iam" />,
        },
        {
            state: "access",
            linkProps: {
                to: "/access",
                children: "Access",
            },
            icon: <Icon name="access" />,
        },
        {
            state: "firehoses",
            linkProps: {
                to: "/firehoses",
                children: "Firehose",
            },
            icon: <Icon name="firehose" />,
        },
        {
            state: "daggers",
            linkProps: {
                to: "/daggers",
                children: "Daggers",
            },
            icon: <Icon name="dagger" />,
        },
        {
            state: "optimus",
            linkProps: {
                to: "/optimus",
                children: "Optimus",
            },
            icon: <Icon name="optimus" />,
        },
        {
            state: "metrics",
            linkProps: {
                to: "/metrics",
                children: "Metric",
            },
            icon: <Icon name="catalog" />,
        },
        {
            state: "experimentation",
            linkProps: {
                children: "Experimentation",
            },
            icon: <Icon name="catalog" />,
            child: [
                {
                    state: "experimentation.facts",
                    linkProps: {
                        to: "/experimentation/metrics/facts",
                        children: "Facts",
                    },
                    icon: <Icon name="catalog" />,
                },
                {
                    state: "experimentation.metrics",
                    linkProps: {
                        to: "/experimentation/metrics",
                        children: "Metrics",
                    },
                    icon: <Icon name="catalog" />,
                },
                {
                    state: "experimentation.clickstream",
                    linkProps: {
                        to: "/experimentation/metrics/clickstream-events",
                        children: "Clickstreams",
                    },
                    icon: <Icon name="catalog" />,
                },
            ],
        },
    ];

    return (
        <SidebarProvider>
            <Sidebar>
                <Sidebar.Header
                    logo={<Icon name="doc" size={32} styleOverride={{ color: Colors.light.primary[3] }} />}
                    name="Console"
                />
                <Sidebar.Menu>
                    {navList.map((item, idx) => (
                        <Sidebar.Item
                            activeState="explore"
                            linkRender={({ children, props }) => <a {...props}>{children}</a>}
                            linkProps={item.linkProps}
                            state={item.state}
                            key={idx}
                            child={item.child}
                        />
                    ))}
                </Sidebar.Menu>
            </Sidebar>
        </SidebarProvider>
    );
};
