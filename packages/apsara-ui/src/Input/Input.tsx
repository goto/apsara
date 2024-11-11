import React, { useState } from "react";
import StyledWrapper, { TextAreaWrapper } from "./Input.styles";
import { PREFIX_CLS } from "./constants";

export type InputProps = {
    size?: "small" | "middle" | "large";
    allowClear?: boolean;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
} & Omit<React.HTMLProps<HTMLInputElement>, "size" | "prefix">;

type TextAreaProps = {
    size?: "small" | "middle" | "large";
} & Omit<React.HTMLProps<HTMLTextAreaElement>, "size">;

const Input = ({
    suffix,
    prefix,
    placeholder = "",
    allowClear = false,
    size = "middle",
    onChange,
    type,
    value,
    ...props
}: InputProps) => {
    const [ref, setRef] = useState<HTMLInputElement | null>(null);
    const renderClearButton = value && allowClear && !props.disabled;

    const onValueChange = (e: any) => {
        onChange && onChange(e);
    };

    return (
        <StyledWrapper
            size={size}
            disabled={props.disabled}
            style={props.style}
            className={`${PREFIX_CLS} ${props.className || ""}`}
        >
            {prefix != "" && prefix != null && <span className="input_suffix_prefix">{prefix}</span>}
            <div className="input_close_icon_wrapper">
                <input
                    ref={(input) => {
                        setRef(input);
                    }}
                    onChange={onValueChange}
                    value={value}
                    type={type ? type : "text"}
                    placeholder={placeholder}
                    {...props}
                    className="input_main"
                />
                {renderClearButton && (
                    <span
                        onClick={() => {
                            onValueChange({ target: { value: "" } });
                            ref?.focus();
                        }}
                        className="input_close_icon"
                    >
                        x
                    </span>
                )}
            </div>
            {suffix != "" && suffix != null && <span className="input_suffix_prefix input_suffix">{suffix}</span>}
            {props.children}
        </StyledWrapper>
    );
};

const TextArea = ({ size = "middle", ...props }: TextAreaProps) => {
    return (
        <TextAreaWrapper size={size}>
            <textarea {...props} className={`${PREFIX_CLS}-text-area input_textarea_main`}>
                {props.children}
            </textarea>
        </TextAreaWrapper>
    );
};

Input.TextArea = TextArea;

export default Input;
