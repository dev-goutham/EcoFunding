import styled from "styled-components"
import bgImg from '../../../assets/FUNDO_GLOBO.webp'

export const Container = styled.div`
  width: 100vw; 
  height: 100vh;
  background-image: url(${bgImg});
  background-size: cover;
  background-color: #FF7979;
  display: flex;
  padding: 20px;

  /* Tablet */
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
  }
`
export const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
 
  /* TABLET */
  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }

  /* MOBILE */
  @media only screen and (max-width: 460px) {
    padding: 10px;
  }
`


export const ContentWrapper = styled.div`
  width: 625px;
  color: #fff;

  h1 {
    font-weight: bold;
    font-size: 50px;
    letter-spacing: -0.52px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    line-height: 26px;
    font-weight: 500;
  }

  /* TABLET */
  @media only screen and (max-width: 768px) {
    h1 {
    letter-spacing: -0.29px;
    text-align: center;
    padding: 0 12px;
    margin-bottom: 20px;
    }

    p {
      text-align: center;
    }
  }


  /* MOBILE */
  @media only screen and (max-width: 460px) {
    h1 {
    font-size: 28px;
    letter-spacing: -0.29px;
    text-align: center;
    padding: 0 12px;
    margin-bottom: 20px;
    }

    p {
      text-align: center;
    }
  }
`

export const LearnCode = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  /* Tablet */
  @media only screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
`

