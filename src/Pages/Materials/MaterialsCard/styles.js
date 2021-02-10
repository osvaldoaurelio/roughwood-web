import styled from 'styled-components';

export const Main = styled.section`
  margin: 1rem 0;
  padding: 1rem 0;
  display: grid;
  column-gap: 2%;
  row-gap: 5%;
  grid-template-columns: repeat(5,minmax(15%, 19%));
`;

export const Card = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 8px solid ${({ color }) => color ? '#66BB6A' : '#999'};
  opacity: ${({ color }) => color ? 1 : 0.6};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color ? '#66BB6A' : '#999'};
  }
`;

export const Body = styled.div`
  width: 100%;
`;

export const MaterialName = styled.div`
  font-size: 1rem;
  margin-bottom: 2rem;
  font-weight: 700;

p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
`;

export const MaterialDescription = styled.div`
  margin-bottom: 1rem;
  font-size: 0.8rem;
  width: 100%;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const MaterialPrice = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1rem;

  p {
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const MaterialFooter = styled.div`
  margin: 0 -1rem -1rem -1rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ color }) => color};
  background-color: ${({ color }) => color ? '#66BB6A' : '#999'};

  p {
    text-align: center;
    color: #333;
  }
`;
