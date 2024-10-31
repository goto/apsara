import React, { createContext, PropsWithChildren, useContext, useState } from "react";

import { noop } from "../../utils";

interface SidebarContextParams {
    collapsed: boolean;
    toggleCollapse: () => void;
}

interface SidebarProviderProps {
    keyLocalStorage?: string;
}

export const SidebarContext = createContext<SidebarContextParams>({
    collapsed: false,
    toggleCollapse: noop,
});

const KEY_LOCAL_STORAGE = "NAV_SIDEBAR_STATE";
export const SidebarProvider = (props: PropsWithChildren<SidebarProviderProps>) => {
    const { children, keyLocalStorage = KEY_LOCAL_STORAGE } = props;

    const [collapsed, setCollapsed] = useState(localStorage.getItem(keyLocalStorage) === "true");

    const toggleCollapse = () => {
        setCollapsed((prev) => !prev);
        localStorage.setItem(keyLocalStorage, String(!collapsed));
    };

    return <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);

    if (context === undefined) {
        throw new Error("useSidebarContext must be used within a SidebarProvider");
    }

    return context;
};
