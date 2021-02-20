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
  padding: 2rem 0 1rem 0;
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

export const OrderStatus = styled.div`
  font-size: 1.6rem;
`;

export const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 19.5rem;
    cursor: pointer;

    &:first-child {
      left: 1.75rem;
      cursor: initial;
    }
  }
`;

export const BtnInvoice = styled.p`
  margin-right: ${({ primaryColor }) => primaryColor ? '0' : '1rem'};
  padding: 0.75rem ${({ primaryColor }) => primaryColor ? '12px' : '2rem'};
  border-radius: 4px;
  font-size: 1.25rem;
  border: 2px solid #ccc;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: 0.3s all;
  background-color: ${({ primaryColor, theme }) => primaryColor
    ? theme.colors.primary
    : theme.colors.secondary};
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
`;

export const Input = styled.input`
  margin: 0 1rem;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 40px 10px 40px;
  height: 50px;
  color: ${({ theme }) => (theme.title === 'dark' ? '#fff' : '#333')};
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#333')};
`;

export const Menu = styled.div`
  position: relative;
  min-width: 148px;
  margin-right: 0.5rem;
  padding: 0.5rem;
  font-size: 1.25rem;
`;

export const MenuTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    position: initial;
  }
`;

export const SubMenu = styled.div`
  position: absolute;
  left: 0;
  top: 44px;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#ddd' : '#222')};
  min-width: 156px;
  margin-right: 0.5rem;
  border: 1px solid #666;
  display: ${({ active }) => (active ? 'block' : 'none')};
`;

export const MenuItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.3s all;
  display: flex;
  justify-content: space-between;

  svg {
    position: initial;
  }

  &:hover {
    background-color: ${({ theme }) => (theme.title === 'light' ? '#eee' : '#111')};
  }
`;

export const Main = styled.main`
  padding: 1rem 0;
  margin: 1rem 0;
  display: flex;
  align-self: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 4px;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 16px solid ${({ color }) => color};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color};
  }
`;

export const OrderId = styled.div`
  font-size: 1rem;
  margin-bottom: 2rem;
`;

export const OrderDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  width: 100%;
`;

export const OrderRelated = styled.div`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  width: 100%;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 0.5rem;
  }
`;

export const OrderDates = styled.div`
  font-size: 1.2rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #666;
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const OrderUsedMaterials = styled.div`
  max-height: 45vh;
  overflow-y: auto;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #666;

  table {
    width: 100%;
    border-collapse: collapse;


    tr {
      transition: 0.3s all;

      td {
        padding: 0.5rem;
        font-size: 1.125rem;

        &:nth-child(1) {
          max-width: 470px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        &:nth-child(3) {
          text-align: center;
        }
        &:nth-child(2),
        &:nth-child(4) {
          text-align: right;
          max-width: 200px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      &:nth-child(2n) {
        background-color: ${({ theme }) => theme.title === 'light' ? '#0002' : '#fff2'};
      }

      &:hover {
        background-color: ${({ theme }) => theme.title === 'light' ? '#0004' : '#fff4'};
      }
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


