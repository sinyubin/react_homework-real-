import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  
  ${reset}

  @font-face {
    font-family: 'ChosunGu';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  * {
    box-sizing: border-box;
  }
  body {
    min-height: 100vh - 60px;
    font-family: 'ChosunGu', 'Noto Sans SC', sans-serif;
  }
  a {
    text-decoration: none;
    color: black;
  }
  button {
    cursor: pointer;
  }
  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    font-family: 'ChosunGu', 'Noto Sans SC', sans-serif;
    outline: none;
  }
`;

export default GlobalStyles;
