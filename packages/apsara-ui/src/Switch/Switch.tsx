import React, { forwardRef } from "react";
import { StyledSwitch, StyledThumb } from "./Switch.styles";
import transformCheckedValue from "../helper/transform-checked-value";

type StyleProps = {
    className?: string;
    style?: React.CSSProperties;
};

export type SwitchProps = {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
    id?: string;
    thumbProps?: StyleProps;
};

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
    const {
        defaultChecked = false,
        checked,
        onChange,
        disabled = false,
        required,
        name,
        value,
        color,
        id,
        ...restProps
    } = props;

    return (
        <StyledSwitch
            id={id}
            defaultChecked={defaultChecked}
            checked={checked || transformCheckedValue(value)}
            onCheckedChange={onChange}
            disabled={disabled}
            required={required}
            name={name}
            value={value}
            style={props.style}
            className={props.className}
            color={color}
            ref={ref}
        >
            <StyledThumb {...restProps.thumbProps} />
        </StyledSwitch>
    );
});

Switch.displayName = "Switch";

export default Switch;
