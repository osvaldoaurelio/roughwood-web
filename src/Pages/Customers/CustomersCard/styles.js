import styled from 'styled-components';

export const Main = styled.section`
  margin: 1rem 0;
  padding: 1rem 0;
  display: grid;
  column-gap: 2%;
  row-gap: 6%;
  grid-template-columns: repeat(3,minmax(auto, 32%));
`;

export const Card = styled.div`
  display: flex;
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 8px solid ${({ color }) => color};
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
  margin-right: 1.5rem;
  border: 2px solid ${({ color }) => color};
  box-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  text-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
`;

export const Body = styled.div`
  display: grid
`;

export const Name = styled.div`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  font-weight: 700;

  p {
    max-width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const CPF = styled.div`
  font-size: 0.75rem;
  margin-bottom: 1rem;

  p {
    max-width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const Address = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  p {
    max-width: 166px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  svg {
    margin-right: 0.25rem;
    min-width: 14px;
  }
`;

export const Phone = styled.div`
  display: flex;
  align-items: center;

  p {
    max-width: 166px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  svg {
    margin-right: 0.25rem;
    min-width: 14px;
  }
`;
