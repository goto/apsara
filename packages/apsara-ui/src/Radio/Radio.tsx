import React, { forwardRef, ReactNode } from "react";
import { RadioGroup, StyledRadioItem, StyledIndicator, Label, Flex, StyledRadioButton } from "./Radio.styles";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { generateRandomId } from "../helper";
import { PREFIX_CLS } from "./constants";

interface WrapperProps {
    children: ReactNode;
}

export type RadioItem = {
    label?: ReactNode;
    value: string;
    disabled?: boolean;
    required?: boolean;
    wrapper?: ({ children }: WrapperProps) => ReactNode;
};

type RadioButtonType = {
    label?: string;
    value: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
};

type styleProps = {
    className?: string;
    style?: React.CSSProperties;
};

export type RadioProps = {
    defaultValue?: string;
    value?: string;
    items?: RadioItem[];
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    orientation?: "horizontal" | "vertical";
    dir?: "ltr" | "rtl";
    className?: string;
    style?: React.CSSProperties;
    itemStyle?: styleProps;
    children?: React.ReactNode;
    id?: string;
};

const defaultWrapper = ({ children }: WrapperProps) => {
    return <>{children}</>;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ defaultValue, value, items, onChange, required, orientation, dir, id = generateRandomId(), ...props }, ref) => {
        return (
            <RadioGroup
                defaultValue={defaultValue}
                value={value}
                onValueChange={onChange}
                required={required}
                orientation={orientation}
                dir={dir}
                className={props.className}
                style={props.style}
                aria-label="View density"
                ref={ref}
            >
                {items &&
                    items.map((item, i) => {
                        const { wrapper = defaultWrapper } = item;

                        return (
                            <React.Fragment key={item.value}>
                                {wrapper({
                                    children: (
                                        <Flex dir={dir}>
                                            <StyledRadioItem
                                                value={item.value}
                                                disabled={item.disabled}
                                                required={item.required}
                                                {...props.itemStyle}
                                                id={`${id}${item.value}${i}`}
                                                className={`${PREFIX_CLS} ${props.className ? props.className : ""}`}
                                            >
                                                <StyledIndicator />
                                            </StyledRadioItem>
                                            <Label dir={dir} htmlFor={`${id}${item.value}${i}`}>
                                                {item.label}
                                            </Label>
                                        </Flex>
                                    ),
                                })}
                            </React.Fragment>
                        );
                    })}
                {!items && props.children}
            </RadioGroup>
        );
    },
);

const RadioButton = ({ label, value, children, ...props }: RadioButtonType) => {
    return (
        <RadioGroupPrimitive.Item value={value} asChild={true}>
            <StyledRadioButton {...props}>
                {children}
                {label}
            </StyledRadioButton>
        </RadioGroupPrimitive.Item>
    );
};

Radio.displayName = "Radio";

const CompoundRadio = Object.assign(Radio, {
    Root: RadioGroup,
    Item: StyledRadioItem,
    Indicator: StyledIndicator,
    Button: RadioButton,
});

export default CompoundRadio;
