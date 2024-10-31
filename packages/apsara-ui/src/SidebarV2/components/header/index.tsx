import React from "react";
import { SideBarHeaderProps } from "../../sidebar.types";
import { PREFIX_CLS } from "../../constants";
import { Header, Title } from "./header.styles";

const SidebarHeader = (props: SideBarHeaderProps) => {
    const { logo, name } = props;

    return (
        <Header className={`${PREFIX_CLS}-header`}>
            {logo && logo}
            {name && <Title className={`${PREFIX_CLS}-header-nav-title`}>{name}</Title>}
        </Header>
    );
};

export default SidebarHeader;
