import styled from "styled-components";
import { Link } from "react-router-dom"

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 15.5rem auto;
    grid-template-rows: 6.5rem 8rem auto 4rem;
    grid-template-areas: 
    "brand header"
    "menu search"
    "menu content"
    "newnote content";

    background-color: ${({theme}) => theme.COLORS.BACKGROUND_800};
`;

export const Brand = styled.div`
    grid-area: brand;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${({theme}) => theme.COLORS.BACKGROUND_700};
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};

    > h1 {
        font-size: 1.5rem;
        color: ${({theme}) => theme.COLORS.ORANGE};
    }
`;
    
export const Menu = styled.ul`
    grid-area: menu;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_900};
    padding-top: 4rem;
    text-align: center;

    > li {
        margin-bottom: 1.5rem;
    }
`;

export const Search = styled.div`
    grid-area: search;
    padding: 4rem 4.5rem 0;
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 4.5rem 0;
    overflow-y: auto;
`;

export const NewNote= styled(Link)`
    grid-area: newnote;
    background: ${({theme}) => theme.COLORS.ORANGE};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.COLORS.BACKGROUND_900};

    > svg {
        margin-right: 0.5rem;
    }
`;
