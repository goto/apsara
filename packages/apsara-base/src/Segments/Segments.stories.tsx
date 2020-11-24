import React from "react";

import Segments from "./Segments";

export default {
    title: "General/Segments",
    component: Segments,
};

export const segment = () => {
    const rowData = [
        { label: "foo", value: "bar" },
        { label: "foo", value: "bar" },
        { label: "foo", value: "bar" },
    ];
    return (
        <Segments>
            <Segments.Segment title="General" rowData={rowData} />
            <Segments.Segment title="General 2" rowData={rowData} />
            <Segments.Segment title="General 3" rowData={rowData} />
            <Segments.AdvancedConfigsSegment rowData={rowData} />
        </Segments>
    );
};
