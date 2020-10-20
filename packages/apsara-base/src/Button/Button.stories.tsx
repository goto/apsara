import React from "react";

import Button from "./Button";

export default {
    title: "General/Button",
    component: Button,
};

export const listOfButton = () => (
    <>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
    </>
);