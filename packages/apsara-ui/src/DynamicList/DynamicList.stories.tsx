import React, { FC } from "react";
import DynamicList from "./index";
import FormBuilder from "../FormBuilder";
import Button from "../Button";

export default {
    title: "Data Display/Dynamic List",
    component: DynamicList,
};

export const Form: FC = () => {
    const [form] = FormBuilder.useForm();
    const accountTypeOptions = [
        {
            label: "User",
            value: "user",
        },
        {
            label: "Service",
            value: "service",
        },
    ];

    const meta = {
        name: ["policies"],
        disabled: (index: number) => {
            return index === 0 || index === 2;
        },
        fields: [
            {
                key: "account_type",
                label: "Requesting For",
                name: ["account_type"],
                widget: "radio",
                fieldProps: {
                    items: accountTypeOptions,
                },
                required: true,
                initialValue: "user",
                dynamicProps: ({ index }) => {
                    return {
                        disabled: form.getFieldValue(["policies", index, "account_id"]) === "sample1",
                    };
                },
            },
            {
                key: "sample_id",
                label: "Sample field",
                name: ["sample_id"],
                required: true,
                disabled: false,
            },
            {
                key: "account_id",
                label: "Service Account",
                name: ["account_id"],
                required: true,
            },
            {
                key: "duration",
                label: "Duration",
                name: ["resources", 0, "options", "duration"],
                widget: "combobox",
                options: [
                    { label: "1 Day", value: "24h" },
                    { label: "3 Days", value: "72h" },
                ],
                required: false,
                disabled: false,
                loading: true,
            },
        ],
    };

    const DynamicListContent = ({ form, meta }: any) => {
        return (
            <div>
                <DynamicList form={form} meta={meta} addBtnText="Add another role" />
            </div>
        );
    };

    const formConfig = {
        fields: [
            {
                name: "policies",
                widget: "node",
                component: DynamicListContent,
                fieldProps: {
                    name: "policies",
                    meta: meta,
                    form,
                },
            },
        ],
    };

    const handleSubmit = (values: any) => {
        values.policies.map((value: any) => {
            console.log(value);
        });
    };

    const forceUpdate = FormBuilder.useForceUpdate();

    return (
        <div>
            <FormBuilder onValuesChange={forceUpdate} name="form" form={form} onFinish={handleSubmit} layout="vertical">
                <FormBuilder.Items form={form} meta={formConfig as any} />
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </FormBuilder>
        </div>
    );
};
