import styled from 'styled-components';

export default styled.div`
  p {
    margin: 1em 0;
  }

  blockquote {
    font-style: italic;
    background-color: ${({ theme }) => theme.em};
    border-left: 0.2em solid #333;
    padding: 0.5em;
  }

  a {
    /* text-decoration: none; */
    color: #000;
  }

  em {
    background-color: #e8e8e8;
    font-style: normal;
  }

  .caption {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 1em;
    font-size: 0.6em;
    color: rgba(0, 0, 0, 0.5);
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    font-size: 0.8em;
  }
`;
