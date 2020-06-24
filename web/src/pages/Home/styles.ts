import styled from 'styled-components';
import { darken, lighten } from 'polished';

import background from '../../assets/background.svg';

export const Container = styled.div`
  height: 100vh;
  background: url(${background}) no-repeat 630px bottom;
`;

export const Content = styled.div`
  width: 100%;
  height: auto;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  margin: 48px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 150px;
  }

  a {
    text-decoration: none;
    color: #333;
    display: flex;
    transition: color 0.2s;

    &:hover {
      color: ${lighten(0.2, '#333')};
    }

    svg {
      font-size: 20px;
      color: #72bc49;
      margin-right: 12px;
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 54px;
  }

  p {
    font-size: 24px;
    margin-top: 24px;
    line-height: 38px;
  }
`;

export const Form = styled.form`
  display: flex;
  margin-top: 34px;

  input {
    flex: 1;
    background: #fff;
    border-radius: 8px 0 0 8px;
    border: 0;
    padding: 16px 24px;
    height: 72px;
    width: 330px;
    display: inline-block;
    position: absolute;
  }

  button {
    width: 72px;
    height: 72px;
    background: #72bc49;
    border: 0;
    border-radius: 0 8px 8px 0;
    position: relative;
    left: 330px;
    transition: background 0.2s;

    svg {
      color: #fff;
      font-size: 24px;
    }

    &:hover {
      background: ${darken(0.04, '#72bc49')};
    }
  }
`;
