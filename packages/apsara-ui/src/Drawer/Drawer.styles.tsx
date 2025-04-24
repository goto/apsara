import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
`;

export const Overlay = styled.div`
    animation: opacity 200ms ease-out;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
`;

export const Body = styled.div<{ position: "left" | "right" }>`
    background: ${({ theme }) => theme?.drawer?.bg};
    color: ${({ theme }) => theme?.drawer?.text};
    border-radius: ${({ position }) => (position === "left" ? "0 5px 5px 0" : "5px 0 0 5px")};
    position: absolute;
    top: 0;
    left: ${({ position }) => (position === "left" ? "0" : "50%")};
    right: ${({ position }) => (position === "left" ? "50%" : "0")};
    bottom: 0;

    .skeleton-icon.cross {
        position: absolute;
        top: 20px;
        right: 32px;
    }
    @media (max-width: 1280px) {
        left: ${({ position }) => (position === "left" ? "0" : "40%")};
        right: ${({ position }) => (position === "left" ? "40%" : "0")};
    }
    @media (max-width: 1024px) {
        left: ${({ position }) => (position === "left" ? "0" : "30%")};
        right: ${({ position }) => (position === "left" ? "30%" : "0")};
    }
    @media (max-width: 768px) {
        left: ${({ position }) => (position === "left" ? "0" : "20%")};
        right: ${({ position }) => (position === "left" ? "20%" : "0")};
    }
    @media (max-width: 640px) {
        left: ${({ position }) => (position === "left" ? "0" : "0")};
        right: ${({ position }) => (position === "left" ? "0" : "0")};
    }
`;
