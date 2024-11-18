import React, { memo, ReactElement, ReactNode } from "react";
import { useFormContext, useFormState, Controller, UseControllerProps } from "react-hook-form";
import { ErrorMessage, FieldWrapper } from "./field.styles";
import { PREFIX_CLS } from "../../constants";
import withDefaultErrorMessage from "../../utils/default-error-message";
import { ErrorMessage as ErrorMessageWrapper } from "@hookform/error-message";

export type ErrorAnimation = "shake" | "none";

export interface FieldProps extends UseControllerProps {
    label?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    errorAnimation?: ErrorAnimation;
    children: ReactElement;
    className?: string;
    style?: React.CSSProperties;
}

const Field = (props: FieldProps) => {
    const {
        label,
        prefix,
        suffix,
        children,
        errorAnimation = "shake",
        rules,
        className,
        style,
        ...controllerProps
    } = props;

    const {
        formState: { errors },
        control,
    } = useFormContext();
    const { isSubmitting } = useFormState();

    const enhancedRules = withDefaultErrorMessage(label || "", rules);
    const error = errors[controllerProps.name];
    const isFirstError = [...control._names.mount.values()].find((item) => errors[item]) === controllerProps.name;

    return (
        <FieldWrapper
            error={Boolean(error?.message)}
            className={`${PREFIX_CLS}-field ${className ? className : ""}`}
            style={style}
        >
            {label && (
                <div className={`${PREFIX_CLS}-label-wrapper`}>
                    {prefix}
                    <label className={`${PREFIX_CLS}-label`} htmlFor={controllerProps.name}>
                        {label}
                    </label>
                    {suffix}
                </div>
            )}
            <Controller
                control={control}
                rules={enhancedRules}
                {...controllerProps}
                render={({ field }) => (
                    <>
                        {React.cloneElement(children, {
                            ...field,
                            id: controllerProps.name,
                        })}
                    </>
                )}
            />
            <ErrorMessageWrapper
                errors={errors}
                name={controllerProps.name}
                render={({ message }) => {
                    return (
                        <>
                            {message && !isSubmitting && (
                                <ErrorMessage
                                    className={`${PREFIX_CLS}-error-message ${isFirstError ? errorAnimation : ""}`}
                                >
                                    {message}
                                </ErrorMessage>
                            )}
                        </>
                    );
                }}
            />
        </FieldWrapper>
    );
};

export default memo(Field);
