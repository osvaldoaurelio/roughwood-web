import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  .active-link {
    background-color: ${({ theme }) => theme.colors.secondary};
    font-weight: 900;

    &:hover {
      box-shadow: 0 0 32px #999 inset;
    }
  }

  .swal-modal {
    background-color: ${({ theme }) => {
      return theme.title === 'light' ? '#fff' : theme.colors.primary;
    }};

    .swal-title, .swal-text {
      color: ${({ theme }) => theme.colors.text};
    }

    .swal-button.swal-button--confirm {
      background-color: #666;

      &:hover {
        background-color: #999;
      }
    }
  }
`;
