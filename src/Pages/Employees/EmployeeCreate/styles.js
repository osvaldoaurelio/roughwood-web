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
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => (theme.colors.text)};
`;

export const Title = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const GoBack = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: flex-end;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    opacity: 0.6;
  }

  svg {
    margin-right: 0.125rem;
  }
`;

export const Name = styled.div`
  font-size: 1.6rem;
`;

export const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Cancel = styled.p`
  margin-right: 1rem;
  padding: 0.95rem;
  border-radius: 4px;
  border: 1px solid #3333;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.3s all;

  &:hover {
    opacity: 1;
    border: 1px solid #666;
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => (theme.colors.primary)};
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 12px;
  height: 50px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  transition: 0.3s all;
  cursor: pointer;

  &:hover {
    opacity: ${({ theme }) => (theme.title === 'light' ? 0.8 : 0.4)};
  }
`;

export const Main = styled.main`
  display: flex;
  flex: 1;
`;
