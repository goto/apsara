import React, { memo, ReactElement, ReactNode } from "react";
import { useFormContext, useFormState, Controller, UseControllerProps } from "react-hook-form";
import { ErrorMessage, FieldWrapper } from "./field.styles";
import { PREFIX_CLS } from "../../constants";
import withDefaultErrorMessage from "../../utils/default-error-message";

type ErrorAnimation = "shake";

interface FieldProps extends UseControllerProps {
    label?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    errorAnimation?: ErrorAnimation;
    children: ReactElement;
}

const Field = (props: FieldProps) => {
    const { label, prefix, suffix, children, errorAnimation = "shake", rules, ...controllerProps } = props;
    const {
        formState: { errors },
        control,
    } = useFormContext();
    const { isSubmitting } = useFormState();

    const enhancedRules = withDefaultErrorMessage(controllerProps.name, rules);
    const error = errors[controllerProps.name];
    const firstError = Object.keys(errors)[0];
    const isFirstError = firstError === controllerProps.name;

    return (
        <FieldWrapper error={Boolean(error?.message)} className={`${PREFIX_CLS}-field`}>
            <div className={`${PREFIX_CLS}-label-wrapper`}>
                {prefix}
                <label className={`${PREFIX_CLS}-label`} htmlFor={controllerProps.name}>
                    {label}
                </label>
                {suffix}
            </div>
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
            {error && !isSubmitting && (
                <ErrorMessage className={`${PREFIX_CLS}-error-message ${isFirstError ? errorAnimation : ""}`}>
                    {error.message}
                </ErrorMessage>
            )}
        </FieldWrapper>
    );
};

export default memo(Field);
