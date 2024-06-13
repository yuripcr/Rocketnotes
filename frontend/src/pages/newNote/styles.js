import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    
    display: grid;
    grid-template-rows: 6.5rem auto;
    grid-template-areas: 
    "header"
    "content";

    > main {
        grid-area: content;
        overflow-y: auto;
    }

    .tags {
        display: grid;
        grid-template-columns: 49% 50%;
        gap: 0.5rem;
    
    }
    
`

export const Form = styled.form`
    max-width: 550px;
    margin: 2.375rem auto;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.25rem;
    }

    BtnText {
        font-size: 1.25rem;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
    }
`