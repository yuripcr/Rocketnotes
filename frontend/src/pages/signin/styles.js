import styled from "styled-components";
import bgImg from "../../assets/Bg.png"

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Form = styled.form`
    padding: 0 8.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    > h1 {
        font-size: 3rem;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }

    > p {
        font-size: 0.875rem;
        margin-bottom: 3rem;
        color: ${({theme}) => theme.COLORS.GRAY_100};
    }

    > h2 {
        font-size: 1.5rem;
        margin-bottom: 3rem;
        color: ${({theme}) => theme.COLORS.WHITE};
    }

    > a {
        margin-top: 5rem;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }
`;

export const Background = styled.div` 
    flex: 1;    
    background: url(${bgImg}) no-repeat center center;
    background-size: cover;
    
`;