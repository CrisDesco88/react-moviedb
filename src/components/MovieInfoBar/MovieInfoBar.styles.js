import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    background: var(--darkGrey);
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-around;
    max-width: var(--maxWidth);
    width: 100%;
    

    .column {
        display: flex;
        background: var(--medGrey);
        border-radius: 20px;
        padding: 10px 20px;

        @media screen and (max-width:768px){
            margin-top: 20px;
            width: 50%;
            min-width: 179px;
            justify-content: center;
        }

        p {
            margin: 0;
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        padding-bottom: 1.15em;
        
    }

`;



