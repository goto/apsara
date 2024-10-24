import React from "react";
import { Header, Title } from "../sidebar.styles";
import { SideBarHeaderProps } from "../sidebar.types";

const SidebarHeader = (props: SideBarHeaderProps) => {
    const { logo, name } = props;

    return (
        <Header>
            {logo && logo}
            <Title className="apsara-nav-title">{name}</Title>
        </Header>
    );
};

export default SidebarHeader;
