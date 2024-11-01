import styled from "styled-components";

export const CollapseWrapper = styled.div`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000000d9;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum";
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-bottom: 0;
    border-radius: 2px;
    background-color: transparent;
    border: 0;

    .apsara-collapse-item {
        border-bottom: 0;

        .apsara-collapse-header {
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
            padding: 12px 0;
            color: #000000d9;
            line-height: 1.5715;
            cursor: pointer;
            transition: all 0.3s, visibility 0s;
            align-items: center;
        }

        .apsara-collapse-content {
            background-color: transparent;
            border-top: 0;
            overflow: hidden;

            &[data-state="open"] {
                animation: slideDown 300ms ease-out;
            }
            &[data-state="closed"] {
                animation: slideUp 300ms ease-out;
            }

            @keyframes slideDown {
                from {
                    height: 0;
                }
                to {
                    height: var(--radix-collapsible-content-height);
                }
            }

            @keyframes slideUp {
                from {
                    height: var(--radix-collapsible-content-height);
                }
                to {
                    height: 0;
                }
            }

            .apsara-collapse-content-box {
                padding-top: 12px;
                padding-bottom: 12px;
            }
        }
    }
`;

export const CollapsibleHeader = styled.button`
    border: none;
    background: none;
    outline: none;
    letter-spacing: 0.3px;
    display: flex;
    align-items: center;
    .apsara-collapse-icon {
        flex-shrink: 0;
    }

    &[data-state="open"] {
        .apsara-collapse-icon {
            transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
            transform: rotate(90deg);
        }
    }
    &[data-state="closed"] {
        .apsara-collapse-icon {
            transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
            transform: rotate(0deg);
        }
    }
`;
