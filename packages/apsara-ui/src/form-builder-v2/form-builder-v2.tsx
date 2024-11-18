import React, { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import Field from "./components/field";
import { PREFIX_CLS } from "./constants";

interface FormBuilderProps<T extends FieldValues> {
    children: ReactNode;
    onSubmit: SubmitHandler<T>;
    form: UseFormReturn<T>;
}

const FormBuilderV2 = <T extends FieldValues>({ children, onSubmit, form }: FormBuilderProps<T>) => {
    return (
        <FormProvider {...form}>
            <form className={`${PREFIX_CLS}`} onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

FormBuilderV2.Field = Field;

export default FormBuilderV2;
