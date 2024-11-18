import styled from "styled-components";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export const StyledRadioItem = styled(RadioGroupPrimitive.Item)`
    all: unset;
    background-color: white;
    width: 17px;
    height: 17px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme?.radio?.border};
    transition: border-color 0.5s;
    &:hover {
        background-color: ${({ theme }) => theme?.radio?.hover};
        border-color: ${({ theme }) => theme?.radio?.focus};
        border-color: ${({ theme }) => theme?.radio?.focus};
    }

    &[data-disabled] {
        background-color: ${({ theme }) => theme?.radio?.disabled};
        cursor: not-allowed;
        border-color: ${({ theme }) => theme?.radio?.border};
    }
    &[data-state="checked"] {
        border-color: ${({ theme }) => theme?.radio?.focus};
    }
`;

export const StyledIndicator = styled(RadioGroupPrimitive.Indicator)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    &::after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme?.radio?.focus};
    }
`;

export const RadioGroup = styled(RadioGroupPrimitive.Root)`
    box-sizing: border-box;
    flex-wrap: wrap;
    display: flex;
    flex-direction: ${({ orientation }) => (orientation === "vertical" ? "column" : "row")};
`;

export const Label = styled("label")`
    color: ${({ theme }) => theme?.radio?.label};
    margin: ${({ dir }) => dir === "rtl" && "8px"};
    font-size: 15px;
    user-select: none;
    padding-left: 15px;
`;

export const Flex = styled("div")`
    display: flex;
    margin: 8px ${({ dir }) => (dir === "rtl" ? "0px" : "8px")};
    align-items: center;
`;

export const StyledRadioButton = styled("button")`
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid #cacaca;
    color: black;
    transition: color 0.5s;
    margin: 5px;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 5px;
    padding-top: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &[data-state="checked"] {
        border-color: #4291ee;
        color: #4291ee;
    }
    &:focus {
        border-color: #4291ee;
        color: #4291ee;
    }
`;
