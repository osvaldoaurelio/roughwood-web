import styled from 'styled-components';

export const Main = styled.section`
  margin-top: 1rem;
`;

export const Card = styled.div`
  display: flex;
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 12px solid ${({ color }) => color};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color};
  }
`;

export const Header = styled.div``;

export const Avatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  border: 2px solid ${({ color }) => color};
  box-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  text-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
`;

export const Body = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;

`;

export const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;
