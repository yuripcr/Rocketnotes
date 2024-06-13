import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};
    color: ${({theme}) => theme.COLORS.GRAY_300};


    margin-bottom: 0.8rem;
    border-radius: 10px;


    > input {
        width: 100%;
        height: 3.5rem;
        padding: 0.75rem;
        background: transparent;
        border: none;
        color: ${({theme}) => theme.COLORS.WHITE};

        &::placeholder {
            color: ${({theme}) => theme.COLORS.GRAY_300}
        }
    }

    > svg {
        margin-left: 1rem;
    }

`