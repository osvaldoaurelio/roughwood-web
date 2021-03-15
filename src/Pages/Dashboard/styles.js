import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 1rem  0;
  border-bottom: 1px solid ${({ theme }) => (theme.colors.text)};
`;

export const Body = styled.main`
  height: 85vh;
  overflow-y: auto;
`;

export const Title = styled.div`
  font-size: 2.5rem;
  flex: 1;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 23.5%);
    gap: 2%;
`;
