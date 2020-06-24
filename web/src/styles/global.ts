import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box; 
}

body {
  background-color: #eee;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  font-family: Montserrat, sans-serif;
}

button {
  cursor: pointer;
  font-weight: 700 !important;
}
`;
