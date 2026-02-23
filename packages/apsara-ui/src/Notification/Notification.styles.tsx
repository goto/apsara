// import * as React from "react";
import styled from "styled-components";
import { slate } from "@radix-ui/colors";
import * as ToastPrimitive from "@radix-ui/react-toast";

const VIEWPORT_PADDING = 25;

const StyledViewport = styled(ToastPrimitive.Viewport)`
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: VIEWPORT_PADDING;
    gap: 10px;
    width: max-content;
    max-width: 450px;
    margin: 0;
    list-style: none;
    z-index: 2147483647;
    outline: none;
`;

const StyledToast = styled(ToastPrimitive.Root)`
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    padding: 15px;
    display: grid;
    gap: 5px;
    grid-template-areas: "title action" "description action";
    grid-template-columns: auto max-content;
    align-items: center;

    @media (prefers-reduced-motion: no-preference) {
        &[data-state="open"] {
            animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        &[data-state="closed"] {
            animation: hide 100ms ease-in;
        }
        &[data-swipe="move"] {
            transform: translateX(var(--radix-toast-swipe-move-x));
        }
        &[data-swipe="cancel"] {
            transform: translateX(0);
            transition: transform 200ms ease-out;
        }
        &[data-swipe="end"] {
            animation: swipeOut 100ms ease-out;
        }

        @keyframes hide {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes slideIn {
            from {
                transform: translateX(calc(100% + ${VIEWPORT_PADDING}px));
            }
            to {
                transform: translateX(0);
            }
        }

        @keyframes swipeOut {
            from {
                transform: translateX(var(--radix-toast-swipe-end-x));
            }
            to {
                transform: translateX(calc(100% + ${VIEWPORT_PADDING}px));
            }
        }
    }
`;

const StyledTitle = styled(ToastPrimitive.Title)`
    grid-area: title;
    margin-bottom: 5px;
    font-weight: 600;
    color: ${slate.slate12};
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledDescription = styled(ToastPrimitive.Description)`
    grid-area: description;
    margin: 0;
    color: ${slate.slate11};
    font-size: 13px;
    line-height: 1.3em;
`;

const StyledAction = styled(ToastPrimitive.Action)`
    grid-area: action;
    align-self: start;
`;

export const DescriptionWrapper = styled("div")`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-left: 15px;
    gap: 10px;
    margin-bottom: 5px;
    user-select: text;
    word-break: break-word;
    a {
        text-decoration: underline;
    }
`;

export const IconTitleWrapper = styled("div")`
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const CopyButton = styled.button`
    border: 1px solid #e1e1e1;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    cursor: pointer;
    padding: 0.5px 4px;
    padding-right: 6px;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 500;
    color: ${slate.slate11};
    transition: color 0.15s ease, background-color 0.15s ease;
    white-space: nowrap;
    line-height: 1;
    flex-shrink: 0;

    &:hover {
        background-color: ${slate.slate3};
        color: ${slate.slate12};
    }

    &:active {
        background-color: ${slate.slate4};
    }
`;
// Exports
export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = StyledViewport;
export const Toast = StyledToast;
export const ToastTitle = StyledTitle;
export const ToastDescription = StyledDescription;
export const ToastAction = StyledAction;
export const ToastClose = ToastPrimitive.Close;
