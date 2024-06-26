import { css } from "styled-components";

export const textStyles = (size = "12px", color = "#4b4b4b", ls = "0px", weight = "300") => css`
    font-size: ${size};
    font-weight: ${weight};
    color: ${color};
    letter-spacing: ${ls};
`;

export const capitalize = css`
    text-transform: lowercase;

    &::first-line {
        text-transform: capitalize;
    }
`;

export const ellipsis = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
