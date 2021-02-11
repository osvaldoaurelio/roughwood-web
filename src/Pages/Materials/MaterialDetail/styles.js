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
  opacity: ${({ color }) => color ? 1 : 0.6};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px ${({ color }) => color};
  }
`;

export const Name = styled.div`
  font-size: 1.75rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: baseline;
  font-weight: 700;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Description = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: baseline;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Price = styled.div`
  font-size: 1.75rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: baseline;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Since = styled.div`
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: baseline;

  svg {
    margin-right: 0.5rem;
    min-width: 14px;
  }
`;

export const Footer = styled.div`
  margin: 0 -2rem -2rem -2rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ color }) => color};
  background-color: ${({ color }) => color};

  p {
    text-align: center;
    color: #333;
  }
`;
