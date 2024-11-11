import React, { memo, ReactElement } from "react";
import { useFormContext, useFormState, Controller, UseControllerProps } from "react-hook-form";
import { ErrorMessage, FieldWrapper } from "./field.styles";
import { PREFIX_CLS } from "../../constants";
import withDefaultErrorMessage from "../../utils/default-error-message";

type ErrorAnimation = "shake";

interface FieldProps extends UseControllerProps {
    label?: string;
    errorAnimation?: ErrorAnimation;
    children: ReactElement;
}

const Field = (props: FieldProps) => {
    const { label, children, errorAnimation = "shake", rules, ...controllerProps } = props;
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
            <label className={`${PREFIX_CLS}-label`} htmlFor={controllerProps.name}>
                {label}
            </label>
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
