import React from "react";
import FormBuilderV2 from "./form-builder-v2";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import Radio from "../Radio";
import Select from "../Select";
import InputNumber from "../InputNumber";
import DatePicker from "../DatePicker";
import Combobox from "../Combobox";
import Switch from "../Switch";

export default {
    title: "Data Display/FormV2",
    component: FormBuilderV2,
};

export interface MyFormValues {
    name: string;
    address: number;
    agreement: boolean;
}

export const MyForm = () => {
    const form = useForm<MyFormValues>();

    const onSubmit = (data: MyFormValues) => {
        console.log("Form Submitted:", data);
    };

    return (
        <FormBuilderV2 form={form} onSubmit={onSubmit}>
            <FormBuilderV2.Field label="Name" name="name" rules={{ required: true }}>
                <Input placeholder="Your name" />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field
                label="Age"
                name="age"
                rules={{
                    required: true,
                    min: 8,
                }}
            >
                <InputNumber placeholder="Your age" />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field
                label="Date birth"
                name="date-birth"
                rules={{ required: { value: true, message: "Date birth is required" } }}
            >
                <DatePicker showToday width="20%" />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field
                label="address"
                name="address"
                rules={{ required: { value: true, message: "address is required" } }}
            >
                <Input.TextArea placeholder="Your address" />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field
                label="Choose your favorite fruit"
                name="fruit"
                rules={{ required: { value: true, message: "Fruit is required" } }}
            >
                <Radio
                    items={[
                        {
                            label: "Apple",
                            value: "Apple",
                        },
                        {
                            label: "Pear",
                            value: "Pear",
                        },
                        {
                            disabled: true,
                            label: "Orange",
                            value: "Orange",
                        },
                    ]}
                    orientation="horizontal"
                />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field
                name="company"
                label="Company"
                rules={{ required: { value: true, message: "Company is required" } }}
            >
                <Select
                    groups={[
                        {
                            items: [
                                {
                                    displayText: "Gojek",
                                    value: "gojek",
                                },
                                {
                                    displayText: "Gofood",
                                    value: "gofood",
                                },
                                {
                                    displayText: "Gosend",
                                    value: "gosend",
                                },
                            ],
                            label: "Fruit",
                        },
                    ]}
                />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field
                label="Car"
                name="car"
                rules={{ required: { value: true, message: "Car is required" } }}
            >
                <Combobox
                    allowClear
                    mode="multiple"
                    optionFilterProp="label"
                    options={[
                        {
                            label: "Ford Raptor",
                            value: "3",
                        },
                        {
                            label: "Ferrari Testarossa",
                            value: "4",
                        },
                        {
                            label: "Porsche 911 Carrera",
                            value: "5",
                        },
                    ]}
                    placeholder="Please Select"
                    showArrow
                    showSearch
                />
            </FormBuilderV2.Field>
            <FormBuilderV2.Field label="Dark mode" name="dark-mode" defaultValue={true}>
                <Switch color="red" />
            </FormBuilderV2.Field>
            <Button style={{ marginTop: 12 }} htmlType="submit">
                Submit
            </Button>
        </FormBuilderV2>
    );
};
