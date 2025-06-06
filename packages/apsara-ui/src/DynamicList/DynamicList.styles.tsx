import styled, { css } from "styled-components";

const baseButtonStyles = css`
    display: inline-flex;
    align-items: center;
    margin: 8px 0;
    font-weight: bold;
    cursor: pointer;
`;

export const DynamicListContainer = styled.div`
    .form-dynamic-list__item {
        display: flex;
        .custom-form-item {
            margin-right: 24px;
        }
    }

    .form-dynamic-list__btn-add {
        background: none;
        border: none;
        padding: 0;
        display: inline-flex;
        ${baseButtonStyles}
        :disabled {
            opacity: 0.6;
        }
    }

    .form-dynamic-list__btn-remove {
        color: red;
        margin-left: 20px;
        ${baseButtonStyles}
    }
`;
