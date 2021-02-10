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

export const ClientName = styled.div`
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

export const Input = styled.input`
  margin: 0 1rem;
  font-size: 20px;
  line-height: 24px;
  padding: 10px 40px 10px 40px;
  height: 50px;
  color: ${({ theme }) => (theme.title === 'dark' ? '#fff' : '#333')};
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#333')};
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
  min-width: 148px;
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
`;

export const Card = styled.div`
  display: flex;
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid #666;
  background-color: ${({ theme }) => (theme.title === 'light' ? '#fff' : '#222')};
  border-top: 16px solid ${({ color }) => color};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color};
  }
`;

export const Avatar = styled.div`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  font-size: 2rem;
  margin-right: 2rem;
  border: 2px solid ${({ color }) => color};
  box-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  text-shadow: 0 0 1px ${({ theme }) => (theme.title === 'light' ? '#333' : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
`;

export const Body = styled.div`
  display: grid;
  border-right: 1px solid #666;
  flex: 3;
  padding-right: 1rem;
  grid-gap: 0.5rem;
`;

export const Name = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  /* margin-bottom: 0.5rem; */
  font-weight: 700;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const CPF = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  /* margin-bottom: 0.5rem; */

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Address = styled.div`
  /* margin-bottom: 0.5rem; */
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Phone = styled.div`
  display: flex;
  align-items: center;
  /* margin-bottom: 0.5rem; */

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Since = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const OrdersCount = styled.aside`
  flex: 2;
  padding-left: 1rem;
`;

export const Pending = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 1.125rem;
`;

export const Progress = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 1.125rem;
`;

export const Done = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 1.125rem;
`;

export const Late = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  font-size: 1.125rem;
`;

export const Invoiced = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
`;

export const OrdersCountTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.7rem;
  padding-left: 1rem;
  margin-left: -1rem;
  font-size: 1.2rem;
  font-weight: 700;
  border-top: 1px solid #666;
`;
