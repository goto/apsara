import React, { forwardRef, useRef } from "react";
import Picker from "rc-picker";
import enUS from "rc-picker/lib/locale/en_US";
import { CalendarOutlined, ClockCircleOutlined, CloseCircleFilled } from "@ant-design/icons/";
import { GenerateConfig } from "rc-picker/lib/generate/index";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import { DatePickerWrapper, PickerDropdownWrapper } from "./DatePicker.styles";
import { Moment } from "moment";

type DatePickerProps = {
    className?: string;
    placeholder?: string;
    picker?: any;
    generateConfig?: GenerateConfig<Moment>;
    showToday?: boolean;
    showNow?: boolean;
    showTime?: any;
    disabledDate?: any;
    width?: any;
    disabled?: boolean;
    onChange?: any;
};

const prefixCls = "apsara-picker";
const DatePicker = forwardRef<null, DatePickerProps>((props, ref) => {
    const {
        className,
        picker = "date",
        placeholder = picker == "date" ? "Select date" : "Select time",
        generateConfig = momentGenerateConfig,
        width = "100%",
        ...restProps
    } = props;
    const datePickerDropdownWrapperRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <DatePickerWrapper $props={{ width: width }}>
                <Picker<Moment>
                    placeholder={placeholder}
                    suffixIcon={picker === "time" ? <ClockCircleOutlined /> : <CalendarOutlined />}
                    clearIcon={<CloseCircleFilled />}
                    allowClear
                    {...restProps}
                    className={className}
                    prefixCls={prefixCls}
                    locale={enUS}
                    picker={picker}
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    getPopupContainer={() => datePickerDropdownWrapperRef!.current!}
                    generateConfig={generateConfig}
                    prevIcon={<span className={`${prefixCls}-prev-icon`} />}
                    nextIcon={<span className={`${prefixCls}-next-icon`} />}
                    superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
                    superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
                    ref={ref}
                />
            </DatePickerWrapper>
            <PickerDropdownWrapper ref={datePickerDropdownWrapperRef} />
        </>
    );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
