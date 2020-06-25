import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.div`
  height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  height: auto;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;
`;

export const Header = styled.header`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 150px;
  }

  a {
    color: #333;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;

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

export const Form = styled.form`
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 36px;
  }

  fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;

    legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      span {
        font-size: 14px;
      }
    }
  }

  .leaflet-container {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
  }
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;
`;

export const Field = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  label {
    font-size: 14px;
    margin-bottom: 8px;
  }

  input {
    background: #eee;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    flex: 1;
    background: #eee;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
  }

  & + div {
    margin-left: 24px;
  }
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  list-style: none;

  li {
    background: #eeee;
    height: 180px;
    border-radius: 8px;
    padding: 30px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;

    img {
      width: 64px;
    }

    span {
      color: #333;
      font-weight: 700;
    }
  }

  li.selected {
    background: #d6e8cf;
  }
`;

export const ButtonSubmit = styled.button`
  width: 250px;
  height: 56px;
  background: #72bc49;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background: ${darken(0.04, '#72bc49')};
  }
`;
