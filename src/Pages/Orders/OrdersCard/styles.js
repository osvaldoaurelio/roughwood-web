import styled from 'styled-components';

export const Main = styled.section`
  margin: 1rem 0;
  padding: 1rem 0;
  display: grid;
  column-gap: 2%;
  row-gap: 6%;
  grid-template-columns: repeat(4, minmax(190px, 24%));
`;

export const Card = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 8px solid ${({ color }) => color};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color};
  }
`;

export const Body = styled.div`
  width: 100%;
`;

export const OrderId = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  width: 100%;
`;

export const OrderRelated = styled.div`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  width: 100%;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const OrderDescription = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.125rem;
  width: 100%;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const OrderDates = styled.div`
  font-size: 0.7rem;
  color: #666;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #666;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    margin-top: 0.25rem;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const OrderPrice = styled.div`
  margin: 0.7rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  justify-content: flex-end;
  width: 100%;

  p {
    text-align: right;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const OrderFooter = styled.div`
  margin: 0 -1rem -1rem -1rem;
  padding: 0.7rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};

  p {
    text-align: center;
  }
`;

