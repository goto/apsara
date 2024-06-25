import styled from "styled-components";
import { textStyles } from "../mixin";
import { TagSize } from "./Tag";

const fontSizeMap: Record<TagSize, string> = {
    small: "9px",
    medium: "11px",
    large: "14px",
};

export const StyledTag = styled("div") <{
    type: "round" | "rect";
    color: string;
    closable: boolean;
    icon: boolean;
    size: TagSize;
}>`
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    ${({ theme, size }) => textStyles(fontSizeMap[size], theme?.tag?.text, "0.11px", "normal")}
    border-radius: ${({ type }) => (type === "round" ? "10.5px" : "2px")};
    border-color: ${({ color }) => color};
    border-width: 1px;
    border-style: solid;
    background-color: ${({ color }) => color};
    padding: 2px ${({ closable }) => (closable ? "0px" : "10px")} 2px ${({ icon }) => (icon ? "0px" : "10px")};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .tag_content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tag_icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
`;

export const TagWrapper = styled("div")`
    display: inline-grid;
    align-items: center;
`;
