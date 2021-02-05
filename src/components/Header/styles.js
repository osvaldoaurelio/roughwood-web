import styled from 'styled-components';

export const Container = styled.header`
  min-width: 200px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  padding: 1rem;

  * {
    color: #fff;
  }
`;
