import React, { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitErrorHandler, SubmitHandler, UseFormReturn } from "react-hook-form";
import Field from "./components/field";
import { PREFIX_CLS } from "./constants";
import { noop } from "../utils";

interface FormBuilderProps<T extends FieldValues> {
    children: ReactNode;
    onSubmit: SubmitHandler<T>;
    onInvalidSubmit?: SubmitErrorHandler<T>;
    form: UseFormReturn<T, any>;
}

const FormBuilderV2 = <T extends FieldValues>({
    children,
    onSubmit,
    onInvalidSubmit = noop,
    form,
}: FormBuilderProps<T>) => {
    return (
        <FormProvider {...form}>
            <form className={`${PREFIX_CLS}`} onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

FormBuilderV2.Field = Field;

export default FormBuilderV2;
