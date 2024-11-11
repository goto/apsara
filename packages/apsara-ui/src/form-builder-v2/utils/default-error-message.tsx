import { FieldValues, RegisterOptions } from "react-hook-form";

const withDefaultErrorMessage = (
    name: string,
    rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">,
) => {
    return {
        ...rules,
        required: rules?.required
            ? typeof rules.required === "boolean"
                ? { value: true, message: `${name} is required!` }
                : rules.required
            : undefined,
        min: rules?.min
            ? typeof rules.min === "number"
                ? { value: rules.min, message: `${name} must be at least ${rules.min}` }
                : rules.min
            : undefined,
        max: rules?.max
            ? typeof rules.max === "number"
                ? { value: rules.max, message: `${name} must be at most ${rules.max}` }
                : rules.max
            : undefined,
        minLength: rules?.minLength
            ? typeof rules.minLength === "number"
                ? { value: rules.minLength, message: `${name} must be at least ${rules.minLength} characters` }
                : rules.minLength
            : undefined,
        maxLength: rules?.maxLength
            ? typeof rules.maxLength === "number"
                ? { value: rules.maxLength, message: `${name} must be at most ${rules.maxLength} characters` }
                : rules.maxLength
            : undefined,
        pattern: rules?.pattern
            ? rules.pattern instanceof RegExp
                ? { value: rules.pattern, message: `${name} does not match the required pattern` }
                : rules.pattern
            : undefined,
    };
};

export default withDefaultErrorMessage;
