import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from './Input';

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'General/Input',
    component: Input,
    argTypes: {
        placeholder: {
            control: { type: "text" },
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "" },
            },
        },
        value: {
            control: { type: "text" },
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "" },
            },
        },
        disabled: {
            control: { type: "boolean" },
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: false },
            },
        },
        allowClear: {
            control: { type: "boolean" },
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: false },
            },
        },
        size: {
            control: { type: "select" },
            options: ["small", "middle", "large"],
            table: {
                defaultValue: {
                    summary: "middle",
                },
                type: {
                    summary: "size of input",
                },
            },
        },
        suffix: {
            control: { type: "object" },
            table: {
                defaultValue: {
                    summary: "",
                },
                type: {
                    summary: "ReactNode",
                },
            },
        },
        prefix: {
            control: { type: "object" },
            table: {
                defaultValue: {
                    summary: "",
                },
                type: {
                    summary: "ReactNode",
                },
            },
        },
    }
} as ComponentMeta<typeof Input>;

export const Placeholder: ComponentStory<typeof Input> = (args) =>
    <Input
        {...args}
        placeholder="Sample Placeholder"
    />

export const Disabled: ComponentStory<typeof Input> = (args) =>
    <Input
        {...args}
        placeholder="Sample Placeholder"
        disabled={true}
    />

export const Playground: ComponentStory<typeof Input> = (args) => {
    const [value, setValue] = useState('')
    
    return <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
}
