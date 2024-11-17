import React, { forwardRef, useImperativeHandle, useRef } from "react";
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

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        suffix,
        prefix,
        placeholder = "",
        allowClear = false,
        size = "middle",
        onChange,
        type,
        value,
        ...restProps
    } = props;
    const localRef = useRef<HTMLInputElement>(null);
    const renderClearButton = value && allowClear && !restProps.disabled;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => localRef.current!, []);

    const onValueChange = (e: any) => {
        onChange && onChange(e);
    };

    return (
        <StyledWrapper
            size={size}
            disabled={restProps.disabled}
            style={restProps.style}
            className={`${PREFIX_CLS} ${restProps.className || ""}`}
        >
            {prefix != "" && prefix != null && <span className="input_suffix_prefix">{prefix}</span>}
            <div className="input_close_icon_wrapper">
                <input
                    ref={localRef}
                    onChange={onValueChange}
                    value={value}
                    type={type ? type : "text"}
                    placeholder={placeholder}
                    {...restProps}
                    className="input_main"
                />
                {renderClearButton && (
                    <span
                        onClick={() => {
                            onValueChange({ target: { value: "" } });
                            localRef.current?.focus();
                        }}
                        className="input_close_icon"
                    >
                        x
                    </span>
                )}
            </div>
            {suffix != "" && suffix != null && <span className="input_suffix_prefix input_suffix">{suffix}</span>}
            {restProps.children}
        </StyledWrapper>
    );
});

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
    const { size = "middle", ...restProps } = props;
    return (
        <TextAreaWrapper size={size}>
            <textarea {...restProps} ref={ref} className={`${PREFIX_CLS}-text-area input_textarea_main`}>
                {restProps.children}
            </textarea>
        </TextAreaWrapper>
    );
});

TextArea.displayName = "TextArea";
Input.displayName = "Input";

const CompoundInput = Object.assign(Input, { TextArea });

export default CompoundInput;
