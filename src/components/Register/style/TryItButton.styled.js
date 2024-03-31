import styled from "styled-components"

export const TryIt = styled.button`
    width: 540px;
    height: 60px;
    background-color: #5E54A4;
    color: #fff;
    font-size: 15px;
    letter-spacing: 0.27px;
    line-height: 26px;
    border-radius: 10px;
    border: none;
    margin-bottom: 20px;
    box-shadow: 0px 4px 0px rgba(0,0,0,0.3);
    cursor: pointer;

    span {
        font-weight: bold;
    }

    /* SMALL LAPTOPS */
    @media only screen and (max-width: 1115px) {
        width: 100%; 
    }
    /* MOBILE */
    @media only screen and (max-width: 460px) {
        height: 88px;
    }
`