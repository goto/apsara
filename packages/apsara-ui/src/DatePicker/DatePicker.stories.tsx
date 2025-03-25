import React from "react";
import RangePicker from "./RangePicker";
import DatePicker from "./DatePicker";

export default {
    title: "General/DatePicker",
    component: DatePicker,
};

export const datePicker = () => <DatePicker showTime showToday width="10%" />;
export const rangePicker = () => <RangePicker width="20%" />;
