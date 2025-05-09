import { CheckIcon } from "@radix-ui/react-icons";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { CheckboxWrapper, CheckboxGroupWrapper, StyledCheckbox, StyledIndicator } from "./Checkbox.styles";
import { generateRandomId } from "../helper";
import transformCheckedValue from "../helper/transform-checked-value";

type CheckboxProps = {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean | "indeterminate") => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    label?: string;
    value?: string;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    ref?: Ref<HTMLButtonElement>;
};

type CheckboxGroupProps = {
    defaultValue?: string[];
    value?: string[];
    onChange?: (values: string[]) => void;
    disabled?: boolean;
    required?: boolean;
    orientation?: "horizontal" | "vertical";
    name?: string;
    options?: CheckboxProps[];
    id?: string;
};

const prefixCls = "apsara-checkbox";
const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
    (
        {
            defaultChecked = false,
            checked,
            onChange,
            disabled,
            required,
            name,
            value,
            label,
            style,
            id = generateRandomId(),
        },
        ref,
    ) => {
        const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(checked || defaultChecked || false);

        useEffect(() => {
            setIsChecked(checked || false);
        }, [checked]);

        return (
            <CheckboxWrapper className={`${prefixCls}-wrapper`}>
                <StyledCheckbox
                    ref={ref}
                    defaultChecked={defaultChecked}
                    id={id}
                    checked={isChecked || transformCheckedValue(value)}
                    onCheckedChange={
                        onChange ||
                        function (checked) {
                            setIsChecked(checked);
                        }
                    }
                    disabled={disabled}
                    required={required}
                    name={name}
                    value={value}
                    style={style}
                    className={prefixCls}
                >
                    <StyledIndicator>
                        <CheckIcon style={{ width: "13px", height: "13px" }} />
                    </StyledIndicator>
                </StyledCheckbox>
                {label && <label htmlFor={id}>{label}</label>}
            </CheckboxWrapper>
        );
    },
);

const CheckboxGroup = ({
    defaultValue,
    value,
    options,
    onChange,
    orientation = "horizontal",
    id = generateRandomId(),
    ...props
}: CheckboxGroupProps) => {
    const [selectedValues, setSelectedValues] = useState(defaultValue || value || []);

    useEffect(() => {
        setSelectedValues(defaultValue || value || []);
    }, [value, defaultValue]);

    const onValuesChange = (value: string, checked: boolean | "indeterminate") => {
        if (checked) return [...selectedValues, value];
        else return selectedValues.filter((selectedValue) => selectedValue !== value);
    };

    return (
        <CheckboxGroupWrapper orientation={orientation} className={`${prefixCls}-group`}>
            {options &&
                options.map((option, index) => (
                    <div className="checkbox_label_wrapper" key={option.value}>
                        <Checkbox
                            onChange={(checked) => {
                                const newSelectedValues = onValuesChange(option.value || "", checked);
                                setSelectedValues(newSelectedValues);
                                onChange && onChange(newSelectedValues);
                            }}
                            id={`${id}${option.value}${index}`}
                            checked={selectedValues.includes(option.value || "")}
                            value={option.value}
                            ref={option.ref}
                            {...props}
                        />
                        <label className="checkbox_label" htmlFor={`${id}${option.value}${index}`}>
                            {option.label}
                        </label>
                    </div>
                ))}
        </CheckboxGroupWrapper>
    );
};

Checkbox.displayName = "Checkbox";

const CompoundCheckbox = Object.assign(Checkbox, { Group: CheckboxGroup });

export default CompoundCheckbox;
