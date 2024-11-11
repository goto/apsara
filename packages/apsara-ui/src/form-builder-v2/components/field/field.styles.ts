import styled from "styled-components";

const errorColor = "#ef4444";

const shakeAnimation = `
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-4px);
    }
    40%,
    80% {
      transform: translateX(4px);
    }
  }
`;

export const FieldWrapper = styled("div")<{ error?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
    ${({ error }) =>
        error
            ? `
                .apsara-input, .apsara-input:focus, .apsara-input:hover, .input_textarea_main, .input_textarea_main:focus, .input_textarea_main:hover, .rc-select-selector, .apsara-picker, .apsara-input-number, .apsara-select-trigger  {
                    border: 1px solid ${errorColor};
                }
            `
            : ""}
`;

export const ErrorMessage = styled("div")`
    color: ${errorColor};
    &::first-letter {
        text-transform: capitalize;
    }
    &.shake {
        animation: shake 0.4s ease-in-out;
    }
    ${shakeAnimation}
`;
