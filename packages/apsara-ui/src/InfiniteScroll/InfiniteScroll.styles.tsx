import styled from "styled-components";

export const UserCard = styled.div`
    margin-bottom: 16px;
    border-radius: 2px;
    box-shadow: rgb(179 179 179 / 31%) 0px 1px 5px;

    .title {
        margin: 10px;
        color: #4d85f4;
        font-size: 16px;
    }

    .description {
        margin-top: 20px;
        word-break: break-all;
    }

    .body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px 20px 12px 20px;

        > .body-left {
            margin-top: 16px;
            flex: 1;
        }

        > .body-right {
            width: 240px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;

            > div {
                display: flex;
                align-items: flex-end;
                flex-direction: column;
            }

            .tag_content {
                text-transform: uppercase;
            }
        }
    }
`;
