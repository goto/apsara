import React, { useEffect, useRef, useState } from "react";
import StyledWrapper, { TextAreaWrapper } from "./Input.styles";

type InputProps = {
    size?: "small" | "middle" | "large";
    allowClear?: boolean;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
} & Omit<JSX.IntrinsicElements["input"], "size" | "prefix">;

type TextAreaProps = {
    size?: "small" | "middle" | "large";
} & Omit<JSX.IntrinsicElements["textarea"], "size">;

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
    const [val, setVal] = useState(value);

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setVal(value);
    }, [value]);

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange ? onChange(e) : setVal(e.target.value);
    };

    const clearValue = () => {
        setVal("");
        onValueChange({ target: { value: '' }} as React.ChangeEvent<HTMLInputElement>)
        inputRef.current?.focus();
    }

    return (
        <StyledWrapper size={size} disabled={props.disabled} style={props.style} className={props.className}>
            {prefix != "" && prefix != null && <span className="input_suffix_prefix">{prefix}</span>}
            <div className="input_close_icon_wrapper">
                <input
                    ref={inputRef}
                    onChange={onValueChange}
                    value={val}
                    type={type ? type : "text"}
                    placeholder={placeholder}
                    {...props}
                    className="input_main"
                />
                {val && allowClear && !props.disabled && (
                    <span
                        onClick={clearValue}
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
            <textarea {...props} className="input_textarea_main">
                {props.children}
            </textarea>
        </TextAreaWrapper>
    );
};

Input.TextArea = TextArea;

export default Input;
