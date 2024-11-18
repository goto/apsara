import React, { forwardRef, useEffect, useState } from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectIcon,
    SelectContent,
    SelectViewport,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectItemIndicator,
    SelectLabel,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from "./Select.styles";
import { PREFIX_CLS } from "./constants";

type Item = {
    value: string;
    displayText: string;
    disabled?: boolean;
};

export type Group = {
    label?: string;
    items: Item[];
};

type StyleProps = {
    className?: string;
    style?: React.CSSProperties;
};

export type SelectProps = {
    defaultValue?: string;
    value?: string;
    name?: string;
    onChange?: (value: string) => void;
    groups: Group[];
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerProps?: StyleProps;
    contentProps?: StyleProps;
    scrollButtonProps?: StyleProps;
    separatorProps?: StyleProps;
    itemProps?: StyleProps;
};

const Select = forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
    const {
        defaultValue = "",
        value,
        name,
        onChange,
        groups,
        defaultOpen = false,
        open,
        onOpenChange,
        ...restProps
    } = props;
    const lastInd = groups.length - 1;
    const [showDefaultItem, setShowDefaultItem] = useState(true);

    useEffect(() => {
        const val = value ? value : defaultValue;
        let bool = true;
        groups.forEach((group) => {
            group.items.forEach((item) => {
                bool = item.value != val ? (bool ? true : false) : false;
            });
        });
        setShowDefaultItem(bool);
    }, []);

    return (
        <SelectRoot
            defaultValue={defaultValue}
            value={value}
            name={name}
            onValueChange={(value) => {
                if (value != "") setShowDefaultItem(false);
                onChange && onChange(value);
            }}
            defaultOpen={defaultOpen}
            open={open}
            onOpenChange={onOpenChange}
        >
            <SelectTrigger
                {...restProps.triggerProps}
                className={`${PREFIX_CLS}-trigger ${
                    restProps.triggerProps?.className ? restProps.triggerProps?.className : ""
                }`}
                ref={ref}
            >
                <SelectValue />
                <SelectIcon>
                    <ChevronDownIcon />
                </SelectIcon>
            </SelectTrigger>
            <SelectContent {...restProps.contentProps}>
                <SelectScrollUpButton {...restProps.scrollButtonProps}>
                    <ChevronUpIcon />
                </SelectScrollUpButton>
                <SelectViewport>
                    {showDefaultItem && (
                        <SelectItem value={value || defaultValue}>
                            <SelectItemText>{value || defaultValue}</SelectItemText>
                            <SelectItemIndicator>
                                <CheckIcon />
                            </SelectItemIndicator>
                        </SelectItem>
                    )}
                    {groups.map((group: Group, i) => (
                        <div key={i}>
                            <SelectGroup>
                                {group.label && <SelectLabel>{group.label}</SelectLabel>}

                                {group.items.map((item: Item) => (
                                    <SelectItem
                                        key={item.value}
                                        value={item.value}
                                        disabled={item.disabled}
                                        {...restProps.itemProps}
                                    >
                                        <SelectItemText>{item.displayText}</SelectItemText>
                                        <SelectItemIndicator>
                                            <CheckIcon />
                                        </SelectItemIndicator>
                                    </SelectItem>
                                ))}
                            </SelectGroup>

                            {i != lastInd && <SelectSeparator {...restProps.separatorProps} />}
                        </div>
                    ))}
                </SelectViewport>
                <SelectScrollDownButton {...restProps.scrollButtonProps}>
                    <ChevronDownIcon />
                </SelectScrollDownButton>
            </SelectContent>
        </SelectRoot>
    );
});

Select.displayName = "Select";

export default Select;
